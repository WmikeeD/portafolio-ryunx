import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Projects from '../components/sections/Projects'
import { featuredProjects } from '../data/portfolioData'

describe('Projects', () => {
  it('renderiza los tres proyectos destacados', () => {
    render(<Projects />)

    expect(featuredProjects).toHaveLength(3)
    for (const project of featuredProjects) {
      expect(
        screen.getByRole('heading', { level: 3, name: project.title }),
      ).toBeInTheDocument()
    }
  })

  it('dibuja un minidiagrama de arquitectura por proyecto', () => {
    render(<Projects />)

    const diagrams = screen.getAllByRole('list', {
      name: /flujo de arquitectura/i,
    })
    expect(diagrams).toHaveLength(3)
  })

  it('encadena las etapas Cliente ➔ API ➔ Persistencia/ERP ➔ QA Gate', () => {
    render(<Projects />)

    expect(screen.getAllByText('Cliente')).toHaveLength(3)
    expect(screen.getAllByText('API')).toHaveLength(3)
    expect(screen.getAllByText('Persistencia / ERP')).toHaveLength(3)
    expect(screen.getAllByText('QA Gate')).toHaveLength(3)
  })

  it('muestra los componentes tecnológicos del flujo (SAP HANA, Flutter)', () => {
    render(<Projects />)

    expect(screen.getAllByText(/SAP HANA/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Flutter/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Transaction Notification/i).length).toBeGreaterThan(0)
  })

  it('destaca la métrica de negocio de cada proyecto', () => {
    render(<Projects />)

    expect(screen.getByText(/Reducción del 35% en carga operativa manual/i)).toBeInTheDocument()
    expect(
      screen.getByText(/30% menos incidencias administrativas/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/offline-first con sincronización segura/i),
    ).toBeInTheDocument()
  })
})
