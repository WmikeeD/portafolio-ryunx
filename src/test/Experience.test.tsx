import { render, screen } from '@testing-library/react'
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

  it('renderiza cada logro como badge de métrica junto a su detalle', () => {
    render(<Experience />)

    expect(
      screen.getByText('-35% Tiempos de Despacho'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('-30% Brechas de Inventario'),
    ).toBeInTheDocument()
    expect(screen.getByText('Consistencia ACID')).toBeInTheDocument()
    expect(
      screen.getByText(/eliminando el uso de planillas manuales/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/SAP HANA Transaction Notification/i),
    ).toBeInTheDocument()
  })

  it('lista el stack tecnológico asociado a cada experiencia', () => {
    render(<Experience />)

    expect(screen.getByText('SAP HANA')).toBeInTheDocument()
    expect(screen.getByText('Laravel')).toBeInTheDocument()
    expect(screen.getByText('Flutter / Dart')).toBeInTheDocument()
    expect(screen.getByText('Clean Architecture')).toBeInTheDocument()
  })

  it('elimina las sub-tarjetas residuales de proyecto (El reto / La arquitectura)', () => {
    render(<Experience />)

    expect(screen.queryByText('El reto')).not.toBeInTheDocument()
    expect(screen.queryByText('La arquitectura')).not.toBeInTheDocument()
  })
})
