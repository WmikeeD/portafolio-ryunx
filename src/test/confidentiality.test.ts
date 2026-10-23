import { describe, expect, it } from 'vitest'
import {
  corporateExperience,
  showcaseProjects,
  testCases,
} from '../data/portfolioData'

/** Mecanismos internos que la guía de confidencialidad prohíbe nombrar. */
const FORBIDDEN_MECHANISMS = [
  'Transaction Notification',
  'DI API',
  'JDBC',
  'vistas',
  'UDF',
] as const

/** Todas las cadenas de un valor, recorriendo objetos y arreglos. */
function collectStrings(value: unknown): string[] {
  if (typeof value === 'string') {
    return [value]
  }
  if (Array.isArray(value)) {
    return value.flatMap(collectStrings)
  }
  if (value !== null && typeof value === 'object') {
    return Object.values(value).flatMap(collectStrings)
  }
  return []
}

function containsTerm(text: string, term: string): boolean {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(`(^|[^\\p{L}])${escaped}([^\\p{L}]|$)`, 'iu').test(text)
}

const projectAndQaTexts = [
  ...collectStrings(showcaseProjects),
  ...collectStrings(testCases),
]

const employerExperience = corporateExperience.filter(
  (experience) => !/freelance/i.test(experience.company),
)

describe('Confidencialidad del contenido', () => {
  it('hay una experiencia corporativa de la que tomar el nombre del empleador', () => {
    expect(employerExperience).toHaveLength(1)
    expect(employerExperience[0].company.trim()).not.toBe('')
  })

  it('el nombre del ex empleador no aparece en proyectos ni en casos QA', () => {
    const [{ company }] = employerExperience
    const brand = company.replace(/\s+S\.?A\.?$/i, '')

    for (const term of [company, brand]) {
      const leaks = projectAndQaTexts.filter((text) => containsTerm(text, term))
      expect(leaks).toEqual([])
    }
  })

  it.each(FORBIDDEN_MECHANISMS)(
    'el mecanismo interno "%s" no aparece en proyectos ni en casos QA',
    (mechanism) => {
      const leaks = projectAndQaTexts.filter((text) =>
        containsTerm(text, mechanism),
      )
      expect(leaks).toEqual([])
    },
  )

  it('el detector de términos respeta los límites de palabra', () => {
    expect(containsTerm('consultas previstas', 'vistas')).toBe(false)
    expect(containsTerm('Lectura de vistas del ERP', 'vistas')).toBe(true)
    expect(containsTerm('capa jdbc nativa', 'JDBC')).toBe(true)
  })
})
