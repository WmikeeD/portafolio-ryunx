import type { IncomingMessage, ServerResponse } from 'node:http'
import { Resend } from 'resend'
import { contactSchema, type ContactFormData } from '../src/types/contact'

const JSON_CONTENT_TYPE = 'application/json'
const MAX_BODY_BYTES = 1_000_000
const RECIPIENT_EMAIL = 'mayckol10r.s@gmail.com'
const SENDER = 'Portfolio Contact <onboarding@resend.dev>'

interface ContactResponseBody {
  success: boolean
  message: string
  errors?: Record<string, string>
}

function sendJson(
  res: ServerResponse,
  statusCode: number,
  body: ContactResponseBody,
): void {
  res.statusCode = statusCode
  res.setHeader('Content-Type', JSON_CONTENT_TYPE)
  res.end(JSON.stringify(body))
}

async function readRequestBody(req: IncomingMessage): Promise<string> {
  const chunks: Buffer[] = []
  let totalBytes = 0

  for await (const chunk of req) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    totalBytes += buffer.byteLength
    if (totalBytes > MAX_BODY_BYTES) {
      throw new Error('Cuerpo de la petición demasiado grande.')
    }
    chunks.push(buffer)
  }

  return Buffer.concat(chunks).toString('utf-8')
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

function extractFieldErrors(
  error: import('zod').ZodError,
): Record<string, string> {
  const fieldErrors: Record<string, string> = {}
  for (const issue of error.issues) {
    const key = issue.path[0]
    if (typeof key === 'string' && !(key in fieldErrors)) {
      fieldErrors[key] = issue.message
    }
  }
  return fieldErrors
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    sendJson(res, 405, { success: false, message: 'Método no permitido.' })
    return
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    sendJson(res, 500, {
      success: false,
      message: 'Error interno de configuración del servidor.',
    })
    return
  }

  let payload: unknown
  try {
    const rawBody = await readRequestBody(req)
    payload = rawBody.length > 0 ? JSON.parse(rawBody) : {}
  } catch {
    sendJson(res, 400, {
      success: false,
      message: 'Cuerpo de la petición inválido.',
    })
    return
  }

  const parsed = contactSchema.safeParse(payload)
  if (!parsed.success) {
    sendJson(res, 400, {
      success: false,
      message: 'Los datos del formulario no son válidos.',
      errors: extractFieldErrors(parsed.error),
    })
    return
  }

  const { name, email, subject } = parsed.data

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from: SENDER,
      to: [RECIPIENT_EMAIL],
      replyTo: email,
      subject: `[Nuevo Contacto Web] ${subject} - ${name}`,
      html: buildEmailHtml(parsed.data),
    })

    if (error) {
      sendJson(res, 500, {
        success: false,
        message: 'No se pudo enviar el correo. Inténtalo de nuevo más tarde.',
      })
      return
    }

    sendJson(res, 200, {
      success: true,
      message: 'Correo enviado correctamente',
    })
  } catch {
    sendJson(res, 500, {
      success: false,
      message: 'No se pudo enviar el correo. Inténtalo de nuevo más tarde.',
    })
  }
}
