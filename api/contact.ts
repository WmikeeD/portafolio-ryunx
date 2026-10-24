import type { IncomingMessage, ServerResponse } from 'node:http'
import { Resend } from 'resend'
import { z } from 'zod'

const MAX_BODY_BYTES = 10 * 1024

const CONTROL_CHAR_MAX = 31
const DELETE_CHAR = 127
const TAB = 9
const LINE_FEED = 10
const CARRIAGE_RETURN = 13

/**
 * Duplicado intencional de `src/types/contact.ts`: este endpoint debe ser
 * 100% autocontenido, ya que el runtime de Vercel empaqueta `api/` de forma
 * aislada y no incluye `src/` en el contenedor de producción.
 */
function sanitizeFreeText(value: string): string {
  const withoutTags = value.replace(/[<>]/g, '')

  const printable = Array.from(withoutTags)
    .filter((char) => {
      const code = char.codePointAt(0) ?? 0
      if (code === TAB || code === LINE_FEED || code === CARRIAGE_RETURN) {
        return true
      }
      return code > CONTROL_CHAR_MAX && code !== DELETE_CHAR
    })
    .join('')

  return printable.trim()
}

/**
 * Elimina CR/LF de los campos que terminan en el asunto del correo, para que
 * no puedan inyectar cabeceras ni partir la línea del asunto.
 */
function stripLineBreaks(value: string): string {
  return value.replace(/[\r\n]+/g, ' ')
}

const nameField = z
  .string()
  .trim()
  .min(3, 'El nombre debe tener al menos 3 caracteres.')
  .max(80, 'El nombre no puede superar los 80 caracteres.')
  .transform(stripLineBreaks)
  .transform(sanitizeFreeText)
  .pipe(
    z
      .string()
      .min(3, 'El nombre contiene caracteres no válidos.')
      .max(80, 'El nombre no puede superar los 80 caracteres.'),
  )

const emailField = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, 'El correo electrónico es obligatorio.')
  .pipe(z.email('Introduce un correo electrónico válido.'))

const subjectField = z
  .string()
  .trim()
  .min(4, 'El asunto debe tener al menos 4 caracteres.')
  .max(100, 'El asunto no puede superar los 100 caracteres.')
  .transform(stripLineBreaks)
  .transform(sanitizeFreeText)
  .pipe(
    z
      .string()
      .min(4, 'El asunto contiene caracteres no válidos.')
      .max(100, 'El asunto no puede superar los 100 caracteres.'),
  )

const messageField = z
  .string()
  .trim()
  .min(10, 'El mensaje debe tener al menos 10 caracteres.')
  .max(1000, 'El mensaje no puede superar los 1000 caracteres.')
  .transform(sanitizeFreeText)
  .pipe(
    z
      .string()
      .min(10, 'El mensaje contiene caracteres no válidos.')
      .max(1000, 'El mensaje no puede superar los 1000 caracteres.'),
  )

/**
 * Honeypot: campo oculto a las personas que los bots tienden a rellenar. Acepta
 * cualquier texto para que nunca produzca un error de validación visible; el
 * endpoint descarta el envío si llega con contenido.
 */
const honeypotField = z.string().optional()

export const contactSchema = z.strictObject({
  name: nameField,
  email: emailField,
  subject: subjectField,
  message: messageField,
  extraInfo: honeypotField,
})

type ContactFormData = z.infer<typeof contactSchema>

type ContactRequest = IncomingMessage & { body?: unknown }

interface ContactResponse extends ServerResponse {
  status(statusCode: number): ContactResponse
  json(body: unknown): ContactResponse
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function buildEmailHtml(data: ContactFormData): string {
  const safeName = escapeHtml(data.name)
  const safeEmail = escapeHtml(data.email)
  const safeSubject = escapeHtml(data.subject)
  const safeMessage = escapeHtml(data.message).replace(/\n/g, '<br />')

  return `
    <div style="font-family: -apple-system, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; color: #0f172a;">
      <h2 style="font-size: 18px; font-weight: 700; margin: 0 0 16px;">
        Nuevo mensaje desde el formulario de contacto
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tbody>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #475569; width: 100px;">Nombre</td>
            <td style="padding: 8px 0;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #475569;">Email</td>
            <td style="padding: 8px 0;">${safeEmail}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #475569;">Asunto</td>
            <td style="padding: 8px 0;">${safeSubject}</td>
          </tr>
        </tbody>
      </table>
      <div style="padding: 16px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
        <p style="margin: 0 0 8px; font-weight: 600; color: #475569;">Mensaje</p>
        <p style="margin: 0; line-height: 1.6;">${safeMessage}</p>
      </div>
    </div>
  `.trim()
}

interface MailConfig {
  apiKey: string
  to: string
  from: string
}

function readMailConfig(): MailConfig | null {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL
  if (!apiKey || !to || !from) {
    return null
  }
  return { apiKey, to, from }
}

function isJsonRequest(req: ContactRequest): boolean {
  const contentType = req.headers['content-type'] ?? ''
  return contentType.split(';')[0].trim().toLowerCase() === 'application/json'
}

const INVALID_JSON = Symbol('invalid-json')

/** El getter `req.body` de Vercel lanza una excepción si el JSON está mal formado. */
function readBody(req: ContactRequest): unknown {
  try {
    return req.body
  } catch {
    return INVALID_JSON
  }
}

/**
 * Depende de `content-length` (o del largo del cuerpo si llega como texto).
 * Sin esa cabecera, el tamaño queda acotado por los máximos del esquema.
 */
function exceedsBodyLimit(req: ContactRequest, body: unknown): boolean {
  const declaredLength = Number(req.headers['content-length'])
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return true
  }
  return typeof body === 'string' && Buffer.byteLength(body) > MAX_BODY_BYTES
}

function parseJsonBody(body: unknown): unknown {
  if (typeof body !== 'string') {
    return body
  }
  try {
    return JSON.parse(body)
  } catch {
    return INVALID_JSON
  }
}

function isHoneypotFilled(data: ContactFormData): boolean {
  return (data.extraInfo ?? '').trim() !== ''
}

const SEND_ERROR = 'No se pudo enviar el correo. Inténtalo de nuevo más tarde.'
const SUCCESS_BODY = { success: true, message: 'Correo enviado correctamente' }

export default async function handler(
  req: ContactRequest,
  res: ContactResponse,
): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).json({ error: 'Método no permitido' })
    return
  }

  if (!isJsonRequest(req)) {
    res.status(415).json({ error: 'El cuerpo debe ser application/json.' })
    return
  }

  const rawBody = readBody(req)
  if (exceedsBodyLimit(req, rawBody)) {
    res.status(413).json({ error: 'El cuerpo de la petición es demasiado grande.' })
    return
  }

  const config = readMailConfig()
  if (!config) {
    res.status(500).json({ error: 'Error interno de configuración del servidor.' })
    return
  }

  const body = parseJsonBody(rawBody)
  if (body === INVALID_JSON) {
    res.status(400).json({ error: 'Cuerpo de la petición inválido.' })
    return
  }

  const result = contactSchema.safeParse(body)
  if (!result.success) {
    res.status(400).json({ error: 'Datos inválidos.' })
    return
  }

  if (isHoneypotFilled(result.data)) {
    res.status(200).json(SUCCESS_BODY)
    return
  }

  const { name, email, subject } = result.data

  try {
    const resend = new Resend(config.apiKey)
    const { error } = await resend.emails.send({
      from: config.from,
      to: [config.to],
      replyTo: email,
      subject: `[Nuevo Contacto Web] ${subject} - ${name}`,
      html: buildEmailHtml(result.data),
    })

    if (error) {
      res.status(500).json({ error: SEND_ERROR })
      return
    }

    res.status(200).json(SUCCESS_BODY)
  } catch {
    res.status(500).json({ error: SEND_ERROR })
  }
}
