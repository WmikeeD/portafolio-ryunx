import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Experience from '../components/sections/Experience'
import { corporateExperience, experienceSection } from '../data/portfolioData'

describe('Experience', () => {
  it('toma el subtítulo de la sección desde los datos', () => {
    render(<Experience />)

    expect(screen.getByText(experienceSection.subtitle)).toBeInTheDocument()
  })

  it('renderiza las dos experiencias del timeline corporativo', () => {
    render(<Experience />)

    expect(corporateExperience).toHaveLength(2)
    for (const { company } of corporateExperience) {
      expect(
        screen.getByRole('heading', { name: company }),
      ).toBeInTheDocument()
    }
  })

  it('muestra rol, periodo y ubicación de cada experiencia', () => {
    render(<Experience />)

    expect(
      screen.getByText('Full-Stack Software Engineer & Especialista Técnico'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Consultor de Software y QA Independiente'),
    ).toBeInTheDocument()
    expect(screen.getByText('Enero 2024 – Agosto 2026')).toBeInTheDocument()
    expect(screen.getByText('Agosto 2026 – Presente')).toBeInTheDocument()
    expect(screen.getAllByText('Santiago, Chile')).toHaveLength(2)
  })

  it('expone el resumen del rol integrado con el ERP de la compañía', () => {
    render(<Experience />)

    expect(
      screen.getByText(
        /plataformas web internas integradas con el ERP de la compañía/i,
      ),
    ).toBeInTheDocument()
  })

  it('renderiza cada logro con su titular y su descripción', () => {
    render(<Experience />)

    expect(screen.getByText('Automatización operativa')).toBeInTheDocument()
    expect(screen.getByText('Integración con ERP')).toBeInTheDocument()
    expect(screen.getByText('Calidad y pruebas')).toBeInTheDocument()
    expect(screen.getByText('IA aplicada al desarrollo')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Digitalización de procesos que dependían de planillas y registro manual.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Pruebas funcionales, de integración y de regresión sobre mis desarrollos.',
      ),
    ).toBeInTheDocument()
  })

  it('colapsa el stack tecnológico tras un toggle "Ver tecnologías utilizadas"', () => {
    render(<Experience />)

    expect(screen.queryByText('Laravel')).not.toBeInTheDocument()
    expect(screen.queryByText('Clean Architecture')).not.toBeInTheDocument()

    const toggles = screen.getAllByRole('button', {
      name: /ver tecnologías utilizadas/i,
    })
    expect(toggles).toHaveLength(2)

    fireEvent.click(toggles[0])
    expect(toggles[0]).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('Flutter / Dart')).toBeInTheDocument()
    expect(screen.getByText('Clean Architecture')).toBeInTheDocument()

    fireEvent.click(toggles[1])
    expect(screen.getByText('Laravel')).toBeInTheDocument()
    expect(screen.getByText('MariaDB')).toBeInTheDocument()

    fireEvent.click(toggles[0])
    expect(toggles[0]).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText('Flutter / Dart')).not.toBeInTheDocument()
  })

  it('elimina las sub-tarjetas residuales de proyecto (El reto / La arquitectura)', () => {
    render(<Experience />)

    expect(screen.queryByText('El reto')).not.toBeInTheDocument()
    expect(screen.queryByText('La arquitectura')).not.toBeInTheDocument()
  })
})
