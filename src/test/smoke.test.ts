import { afterEach, describe, expect, it } from 'vitest'

/**
 * Smoke test del entorno de QA: valida que Vitest, el entorno jsdom y el
 * setup de @testing-library/jest-dom operan antes de escribir tests reales.
 */
describe('smoke: entorno de testing', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('expone las globals del DOM que aporta jsdom', () => {
    expect(typeof window).toBe('object')
    expect(typeof document).toBe('object')
    expect(document.body).toBeInstanceOf(HTMLElement)
  })

  it('permite crear, insertar y consultar un elemento del DOM', () => {
    const node = document.createElement('section')
    node.id = 'smoke-root'
    node.textContent = 'portafolio-ryunx'
    document.body.appendChild(node)

    const found = document.getElementById('smoke-root')

    expect(found).not.toBeNull()
    expect(found).toBeInTheDocument()
    expect(found).toHaveTextContent('portafolio-ryunx')
  })
})
