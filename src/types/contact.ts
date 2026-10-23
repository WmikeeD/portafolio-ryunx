import { z } from 'zod'

const CONTROL_CHAR_MAX = 31
const DELETE_CHAR = 127
const TAB = 9
const LINE_FEED = 10
const CARRIAGE_RETURN = 13

/**
 * Sanitización básica de texto libre para mitigar XSS e inyección de plantillas:
 * elimina los delimitadores de etiquetas (`<`, `>`), descarta caracteres de
 * control (salvo tabulador y saltos de línea) y recorta el resultado. No
 * sustituye al escape ni a la validación en el backend: es una primera barrera
 * en el cliente.
 */
export function sanitizeFreeText(value: string): string {
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

/** Esquema de validación y sanitización del formulario de contacto. */
export const contactSchema = z.object({
  name: nameField,
  email: emailField,
  subject: subjectField,
  message: messageField,
})

/** Datos del formulario de contacto ya validados y sanitizados. */
export type ContactFormData = z.infer<typeof contactSchema>
