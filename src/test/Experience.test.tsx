import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Experience from '../components/sections/Experience'

describe('Experience', () => {
  it('renderiza las dos experiencias del timeline corporativo', () => {
    render(<Experience />)

    expect(
      screen.getByRole('heading', { name: 'Atika S.A.' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: 'Servicios Profesionales / Freelance',
      }),
    ).toBeInTheDocument()
  })

  it('muestra rol, periodo y ubicación de cada experiencia', () => {
    render(<Experience />)

    expect(
      screen.getByText(
        'Desarrollador de Software y Especialista Técnico Full-Stack',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Consultor de Software y QA Independiente'),
    ).toBeInTheDocument()
    expect(screen.getByText('Diciembre 2023 – Julio 2026')).toBeInTheDocument()
    expect(screen.getByText('Julio 2026 – Presente')).toBeInTheDocument()
    expect(screen.getAllByText('Santiago, Chile')).toHaveLength(2)
  })

  it('expone el resumen ejecutivo con la integración al ERP SAP HANA', () => {
    render(<Experience />)

    expect(screen.getByText(/núcleo ERP SAP HANA/i)).toBeInTheDocument()
  })

  it('renderiza cada logro con su micro-frase de contexto de negocio', () => {
    render(<Experience />)

    expect(
      screen.getByText('Optimización Operativa (-35% tiempos en ruta)'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Control de Inventario (-30% discrepancias de stock)'),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Consistencia ACID (cero datos corruptos en transacciones clave)',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/eliminando el uso de planillas manuales/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/SAP HANA Transaction Notification/i),
    ).toBeInTheDocument()
  })

  it('colapsa el stack tecnológico tras un toggle "Ver tecnologías utilizadas"', () => {
    render(<Experience />)

    expect(screen.queryByText('SAP HANA')).not.toBeInTheDocument()
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
    expect(screen.getByText('SAP HANA')).toBeInTheDocument()
    expect(screen.getByText('Laravel')).toBeInTheDocument()

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
