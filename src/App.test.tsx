import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App.tsx'

describe('App', () => {
  it('ensambla la navegación principal y el hero', () => {
    render(<App />)

    expect(
      screen.getByRole('navigation', { name: /principal/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 1, name: /mayckol rodríguez/i }),
    ).toBeInTheDocument()
  })

  it('monta la app completa sin que Vercel Web Analytics bloquee el render', () => {
    expect(() => render(<App />)).not.toThrow()

    // <Analytics/> es inerte en jsdom (mock → null): el contenido real sigue intacto.
    expect(
      screen.getByRole('heading', { level: 1, name: /mayckol rodríguez/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('monta el fondo global continuo detrás del contenido en z-10', () => {
    const { container } = render(<App />)

    // El lienzo global se monta una sola vez, como decoración inerte.
    const canvas = container.querySelector('canvas')
    expect(canvas).toBeInTheDocument()
    expect(canvas).toHaveAttribute('aria-hidden', 'true')

    // El contenido de las secciones queda envuelto en la capa z-10.
    const main = container.querySelector('main')
    expect(main?.className).toMatch(/relative/)
    expect(main?.className).toMatch(/z-10/)

    // La navegación y el hero siguen operativos por encima del fondo.
    expect(
      screen.getByRole('navigation', { name: /principal/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /activar modo/i }),
    ).toBeEnabled()
  })

  it('compone las secciones de experiencia y habilidades bajo el hero', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { level: 2, name: /experiencia empresarial/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: /habilidades/i }),
    ).toBeInTheDocument()
  })

  it('inserta Servicios tras el Hero y mantiene QA tras Proyectos', () => {
    const { container } = render(<App />)

    const ids = Array.from(container.querySelectorAll('main > section')).map(
      (section) => section.id,
    )

    expect(ids).toEqual([
      'inicio',
      'servicios',
      'experiencia',
      'habilidades',
      'proyectos',
      'qa',
      'contacto',
    ])
  })

  it('incluye la sección de proyectos (#proyectos) en el árbol principal', () => {
    const { container } = render(<App />)

    const projectsSection = container.querySelector('#proyectos')
    expect(projectsSection).toBeInTheDocument()
    expect(projectsSection?.tagName).toBe('SECTION')
    expect(
      screen.getByRole('heading', { level: 2, name: /proyectos destacados/i }),
    ).toBeInTheDocument()
  })

  it('incluye la sección de QA (#qa) en el árbol principal', () => {
    const { container } = render(<App />)

    const qaSection = container.querySelector('#qa')
    expect(qaSection).toBeInTheDocument()
    expect(qaSection?.tagName).toBe('SECTION')
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /gobernanza de calidad & qa automation/i,
      }),
    ).toBeInTheDocument()
  })

  it('cierra la estructura con la sección de contacto (#contacto) y el footer', () => {
    const { container } = render(<App />)

    const contactSection = container.querySelector('#contacto')
    expect(contactSection).toBeInTheDocument()
    expect(contactSection?.tagName).toBe('SECTION')
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })
})
