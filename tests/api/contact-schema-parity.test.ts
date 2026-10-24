// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { contactSchema as apiSchema } from '../../api/contact'
import { contactSchema as clientSchema } from '../../src/types/contact'

/**
 * `api/contact.ts` duplica el esquema de `src/types/contact.ts` a propósito
 * (Vercel no empaqueta `src/`). Esta tabla protege la duplicación: ambos
 * esquemas deben aceptar, rechazar y transformar exactamente igual.
 */
const base = {
  name: 'Ana Pérez',
  email: 'ana@ejemplo.test',
  subject: 'Consultoría Técnica',
  message: 'Hola, me gustaría conversar sobre un proyecto.',
}

const cases: Array<[string, unknown]> = [
  ['entrada válida', base],
  ['correo con mayúsculas y espacios', { ...base, email: '  ANA@Ejemplo.TEST ' }],
  ['correo inválido', { ...base, email: 'ana@' }],
  ['nombre demasiado corto', { ...base, name: 'Al' }],
  ['nombre en el límite (80)', { ...base, name: 'a'.repeat(80) }],
  ['nombre sobre el límite (81)', { ...base, name: 'a'.repeat(81) }],
  ['asunto sobre el límite (101)', { ...base, subject: 'a'.repeat(101) }],
  ['mensaje en el límite (1000)', { ...base, message: 'a'.repeat(1000) }],
  ['mensaje sobre el límite (1001)', { ...base, message: 'a'.repeat(1001) }],
  ['CR/LF en nombre y asunto', { ...base, name: 'Ana\r\nPérez', subject: 'Hola\nmundo' }],
  ['saltos de línea en el mensaje', { ...base, message: 'Línea uno\nLínea dos\r\ntres' }],
  ['etiquetas HTML', { ...base, name: '<script>Ana</script>', message: '<b>Hola mundo</b>!!' }],
  ['solo etiquetas en el nombre', { ...base, name: '<<<>>>' }],
  ['caracteres de control', { ...base, message: 'Hola\u0000\u0007 mundo\u007f, ¿qué tal?' }],
  ['campo desconocido', { ...base, admin: true }],
  ['campo faltante', { name: base.name, email: base.email, subject: base.subject }],
  ['tipo incorrecto', { ...base, message: 42 }],
  ['honeypot vacío', { ...base, extraInfo: '' }],
  ['honeypot con contenido', { ...base, extraInfo: 'https://spam.test' }],
  ['honeypot con tipo incorrecto', { ...base, extraInfo: 1 }],
  ['no es un objeto', 'texto'],
  ['null', null],
]

describe('paridad de esquemas de contacto (src/types vs api)', () => {
  it.each(cases)('%s', (_label, input) => {
    const fromClient = clientSchema.safeParse(input)
    const fromApi = apiSchema.safeParse(input)

    expect(fromApi.success).toBe(fromClient.success)
    expect(fromApi.data).toEqual(fromClient.data)
    expect(fromApi.error?.issues).toEqual(fromClient.error?.issues)
  })
})
