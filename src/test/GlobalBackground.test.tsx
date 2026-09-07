import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import GlobalBackground from '../components/layout/GlobalBackground'

describe('GlobalBackground', () => {
  it('se monta y desmonta limpiamente con un lienzo a pantalla completa', () => {
    const { container, unmount } = render(<GlobalBackground />)

    const canvas = container.querySelector('canvas')
    expect(canvas).toBeInTheDocument()
    expect(canvas).toHaveAttribute('aria-hidden', 'true')

    expect(() => unmount()).not.toThrow()
  })

  it('cubre el viewport como capa fija, decorativa y no interactiva', () => {
    const { container } = render(<GlobalBackground />)

    const root = container.firstElementChild
    expect(root).not.toBeNull()
    expect(root).toHaveAttribute('aria-hidden', 'true')
    expect(root?.className).toMatch(/\bfixed\b/)
    expect(root?.className).toMatch(/\binset-0\b/)
    expect(root?.className).toMatch(/\bz-0\b/)
    expect(root?.className).toMatch(/pointer-events-none/)
  })

  it('no aporta contenido semántico, enlaces ni elementos enfocables', () => {
    const { container } = render(<GlobalBackground />)

    expect(
      container.querySelectorAll('a, button, input, [tabindex], h1, h2, h3'),
    ).toHaveLength(0)
  })
})
