import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Hero from '../components/sections/Hero'

describe('Hero', () => {
  it('presenta a Mayckol Rodríguez como encabezado principal', () => {
    render(<Hero />)

    expect(
      screen.getByRole('heading', { level: 1, name: /mayckol rodríguez/i }),
    ).toBeInTheDocument()
  })

  it('comunica el rol y la propuesta de valor', () => {
    render(<Hero />)

    expect(
      screen.getByText('Desarrollador Full-Stack & QA Specialist'),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/integración de sistemas ERP/i),
    ).toBeInTheDocument()
  })

  it('no renderiza el bloque de métricas cuando no hay métricas', () => {
    render(<Hero />)

    expect(
      screen.queryByRole('list', { name: /métricas destacadas/i }),
    ).not.toBeInTheDocument()
  })

  it('ofrece una llamada a la acción dual', () => {
    render(<Hero />)

    expect(
      screen.getByRole('link', { name: /explorar casos/i }),
    ).toHaveAttribute('href', '#proyectos')
    expect(
      screen.getByRole('link', { name: /contactar/i }),
    ).toHaveAttribute('href', '#contacto')
  })

  it('incluye un micro-hint interactivo que ancla a la sección de servicios', () => {
    render(<Hero />)

    const hint = screen.getByRole('link', {
      name: /¿buscas ayuda para tu negocio\? mira cómo puedo ayudarte/i,
    })
    expect(hint).toHaveAttribute('href', '#servicios')
  })

  it('solo renderiza contenido semántico sobre un contenedor transparente', () => {
    const { container } = render(<Hero />)

    // El fondo animado ya no vive dentro del Hero (migrado a GlobalBackground).
    expect(container.querySelector('canvas')).not.toBeInTheDocument()

    const section = container.querySelector('section#inicio')
    expect(section?.className).toMatch(/bg-transparent/)

    // El contenido y los enlaces siguen presentes e interactuables.
    expect(
      screen.getByRole('heading', { level: 1, name: /mayckol rodríguez/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /explorar casos/i }),
    ).toHaveAttribute('href', '#proyectos')
    expect(
      screen.getByRole('link', { name: /contactar/i }),
    ).toHaveAttribute('href', '#contacto')
    expect(
      screen.getByRole('link', {
        name: /¿buscas ayuda para tu negocio\? mira cómo puedo ayudarte/i,
      }),
    ).toHaveAttribute('href', '#servicios')
  })

  it('renderiza las métricas cuando el contenido las define', async () => {
    vi.resetModules()
    vi.doMock('../data/portfolioData', async (importOriginal) => {
      const original =
        await importOriginal<typeof import('../data/portfolioData')>()
      return {
        ...original,
        heroData: {
          ...original.heroData,
          metrics: [{ value: '12', label: 'proyectos de ejemplo' }],
        },
      }
    })
    const { default: HeroWithMetrics } = await import(
      '../components/sections/Hero'
    )

    render(<HeroWithMetrics />)

    const list = screen.getByRole('list', { name: /métricas destacadas/i })
    expect(list).toHaveTextContent('12')
    expect(list).toHaveTextContent('proyectos de ejemplo')

    vi.doUnmock('../data/portfolioData')
    vi.resetModules()
  })
})
