import type { IncomingMessage, ServerResponse } from 'node:http'
import { Resend } from 'resend'
import { z } from 'zod'

const RECIPIENT_EMAIL = 'mayckol10r.s@gmail.com'
const SENDER = 'Portfolio Contact <onboarding@resend.dev>'

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

const nameField = z
  .string()
  .trim()
  .min(3, 'El nombre debe tener al menos 3 caracteres.')
  .max(80, 'El nombre no puede superar los 80 caracteres.')
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

const contactSchema = z.object({
  name: nameField,
  email: emailField,
  subject: subjectField,
  message: messageField,
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

export default async function handler(
  req: ContactRequest,
  res: ContactResponse,
): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).json({ error: 'Método no permitido' })
    return
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    res.status(500).json({ error: 'Error interno de configuración del servidor.' })
    return
  }

  let body: unknown = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      res.status(400).json({ error: 'Cuerpo de la petición inválido.' })
      return
    }
  }

  const result = contactSchema.safeParse(body)
  if (!result.success) {
    res.status(400).json({ error: 'Datos inválidos', details: result.error.format() })
    return
  }

  const { name, email, subject } = result.data

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from: SENDER,
      to: [RECIPIENT_EMAIL],
      replyTo: email,
      subject: `[Nuevo Contacto Web] ${subject} - ${name}`,
      html: buildEmailHtml(result.data),
    })

    if (error) {
      res.status(500).json({
        error: 'No se pudo enviar el correo. Inténtalo de nuevo más tarde.',
      })
      return
    }

    res.status(200).json({ success: true, message: 'Correo enviado correctamente' })
  } catch {
    res.status(500).json({
      error: 'No se pudo enviar el correo. Inténtalo de nuevo más tarde.',
    })
  }
}
