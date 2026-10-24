// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import handler from '../../api/contact'

interface SentEmail {
  from: string
  to: string[]
  replyTo: string
  subject: string
  html: string
}

interface SendResult {
  data: { id: string } | null
  error: { message: string } | null
}

const { sendEmail } = vi.hoisted(() => ({
  sendEmail: vi.fn<(email: SentEmail) => Promise<SendResult>>(),
}))

vi.mock('resend', () => ({
  Resend: vi.fn(function Resend() {
    return { emails: { send: sendEmail } }
  }),
}))

type HandlerRequest = Parameters<typeof handler>[0]
type HandlerResponse = Parameters<typeof handler>[1]

interface FakeRequestInit {
  method?: string
  headers?: Record<string, string>
  body?: unknown
  bodyThrows?: boolean
}

interface CapturedResponse {
  statusCode: number
  body: unknown
  headers: Record<string, string>
}

const TEST_ENV = {
  RESEND_API_KEY: 're_test_key',
  CONTACT_TO_EMAIL: 'destino@ejemplo.test',
  CONTACT_FROM_EMAIL: 'Formulario <remitente@ejemplo.test>',
}

const validPayload = {
  name: 'Ana Pérez',
  email: 'ana@ejemplo.test',
  subject: 'Consultoría Técnica',
  message: 'Hola, me gustaría conversar sobre un proyecto.',
}

function createRequest({
  method = 'POST',
  headers = { 'content-type': 'application/json' },
  body = validPayload,
  bodyThrows = false,
}: FakeRequestInit = {}): HandlerRequest {
  const request = { method, headers }
  Object.defineProperty(request, 'body', {
    get() {
      if (bodyThrows) {
        throw new Error('Invalid JSON')
      }
      return body
    },
  })
  return request as unknown as HandlerRequest
}

function createResponse(): { res: HandlerResponse; captured: CapturedResponse } {
  const captured: CapturedResponse = { statusCode: 0, body: undefined, headers: {} }
  const res = {
    setHeader(name: string, value: string) {
      captured.headers[name] = value
      return res
    },
    status(code: number) {
      captured.statusCode = code
      return res
    },
    json(payload: unknown) {
      captured.body = payload
      return res
    },
  }
  return { res: res as unknown as HandlerResponse, captured }
}

async function callHandler(init?: FakeRequestInit): Promise<CapturedResponse> {
  const { res, captured } = createResponse()
  await handler(createRequest(init), res)
  return captured
}

describe('api/contact', () => {
  beforeEach(() => {
    sendEmail.mockReset()
    sendEmail.mockResolvedValue({ data: { id: 'email-1' }, error: null })
    for (const [key, value] of Object.entries(TEST_ENV)) {
      vi.stubEnv(key, value)
    }
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('responde 405 si el método no es POST', async () => {
    const response = await callHandler({ method: 'GET' })

    expect(response.statusCode).toBe(405)
    expect(response.headers.Allow).toBe('POST')
    expect(sendEmail).not.toHaveBeenCalled()
  })

  it('responde 415 si el cuerpo no es application/json', async () => {
    const response = await callHandler({ headers: { 'content-type': 'text/plain' } })

    expect(response.statusCode).toBe(415)
    expect(sendEmail).not.toHaveBeenCalled()
  })

  it('acepta application/json con charset', async () => {
    const response = await callHandler({
      headers: { 'content-type': 'application/json; charset=utf-8' },
    })

    expect(response.statusCode).toBe(200)
  })

  it('responde 413 si content-length supera 10 KB', async () => {
    const response = await callHandler({
      headers: { 'content-type': 'application/json', 'content-length': '10241' },
    })

    expect(response.statusCode).toBe(413)
    expect(sendEmail).not.toHaveBeenCalled()
  })

  it('responde 413 si el cuerpo en texto supera 10 KB sin content-length', async () => {
    const response = await callHandler({ body: 'x'.repeat(10 * 1024 + 1) })

    expect(response.statusCode).toBe(413)
    expect(sendEmail).not.toHaveBeenCalled()
  })

  it('responde 400 con JSON inválido en texto', async () => {
    const response = await callHandler({ body: '{"name":' })

    expect(response.statusCode).toBe(400)
    expect(sendEmail).not.toHaveBeenCalled()
  })

  it('responde 400 si el runtime no puede parsear el JSON', async () => {
    const response = await callHandler({ bodyThrows: true })

    expect(response.statusCode).toBe(400)
    expect(sendEmail).not.toHaveBeenCalled()
  })

  it('responde 400 con un mensaje genérico ante datos inválidos', async () => {
    const response = await callHandler({ body: { ...validPayload, email: 'no-es-correo' } })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ error: 'Datos inválidos.' })
    expect(sendEmail).not.toHaveBeenCalled()
  })

  it('responde 400 si llegan campos desconocidos', async () => {
    const response = await callHandler({ body: { ...validPayload, admin: true } })

    expect(response.statusCode).toBe(400)
    expect(sendEmail).not.toHaveBeenCalled()
  })

  it.each(Object.keys(TEST_ENV))('responde 500 si falta %s', async (variable) => {
    vi.stubEnv(variable, '')

    const response = await callHandler()

    expect(response.statusCode).toBe(500)
    expect(sendEmail).not.toHaveBeenCalled()
  })

  it('responde 500 si Resend devuelve un error', async () => {
    sendEmail.mockResolvedValue({ data: null, error: { message: 'fallo' } })

    const response = await callHandler()

    expect(response.statusCode).toBe(500)
  })

  it('responde 500 si Resend lanza una excepción', async () => {
    sendEmail.mockRejectedValue(new Error('network'))

    const response = await callHandler()

    expect(response.statusCode).toBe(500)
  })

  it('envía el correo con la configuración del entorno y el HTML escapado', async () => {
    const response = await callHandler({
      body: { ...validPayload, message: 'Hola & "chao" con \'comillas\' y <b>' },
    })

    expect(response.statusCode).toBe(200)
    expect(sendEmail).toHaveBeenCalledTimes(1)
    const [email] = sendEmail.mock.calls[0]
    expect(email.to).toEqual([TEST_ENV.CONTACT_TO_EMAIL])
    expect(email.from).toBe(TEST_ENV.CONTACT_FROM_EMAIL)
    expect(email.replyTo).toBe(validPayload.email)
    expect(email.html).toContain('Hola &amp; &quot;chao&quot; con &#39;comillas&#39; y b')
    expect(email.html).not.toContain('"chao"')
  })

  it('quita CR/LF del nombre y el asunto antes de armar el asunto del correo', async () => {
    await callHandler({
      body: { ...validPayload, name: 'Ana\r\nBcc: x@y.test', subject: 'Consulta\nurgente' },
    })

    const [email] = sendEmail.mock.calls[0]
    expect(email.subject).not.toMatch(/[\r\n]/)
    expect(email.subject).toBe('[Nuevo Contacto Web] Consulta urgente - Ana Bcc: x@y.test')
  })

  it('responde 200 sin enviar el correo si el honeypot llega con contenido', async () => {
    const response = await callHandler({ body: { ...validPayload, extraInfo: 'spam' } })

    expect(response.statusCode).toBe(200)
    expect(sendEmail).not.toHaveBeenCalled()
  })

  it.each(['', '   '])('envía el correo si el honeypot llega vacío (%j)', async (extraInfo) => {
    const response = await callHandler({ body: { ...validPayload, extraInfo } })

    expect(response.statusCode).toBe(200)
    expect(sendEmail).toHaveBeenCalledTimes(1)
  })
})
