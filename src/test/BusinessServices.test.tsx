import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import BusinessServices from '../components/sections/BusinessServices'
import { businessServices } from '../data/portfolioData'

describe('BusinessServices', () => {
  it('monta los 3 pilares de servicio', () => {
    render(<BusinessServices />)

    expect(businessServices).toHaveLength(3)
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(3)

    for (const service of businessServices) {
      expect(
        screen.getByRole('heading', { level: 3, name: service.title }),
      ).toBeInTheDocument()
      expect(screen.getByText(service.description)).toBeInTheDocument()
    }
  })

  it('describe cada servicio en lenguaje de negocio, sin tecnicismos', () => {
    render(<BusinessServices />)

    expect(
      screen.getByText(/Automatizo procesos manuales y hojas de cálculo/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Conecto tus sistemas centrales \(ERP, ventas, inventario\)/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        /aseguro la estabilidad de tu software antes de salir a producción/i,
      ),
    ).toBeInTheDocument()
  })

  it('se ancla en la sección #servicios', () => {
    const { container } = render(<BusinessServices />)

    const section = container.querySelector('#servicios')
    expect(section).toBeInTheDocument()
    expect(section?.tagName).toBe('SECTION')
  })
})
