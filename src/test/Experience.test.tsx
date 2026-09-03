import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Experience from '../components/sections/Experience'

describe('Experience', () => {
  it('renderiza la experiencia en Atika S.A.', () => {
    render(<Experience />)

    expect(screen.getByRole('heading', { name: 'Atika S.A.' })).toBeInTheDocument()
  })

  it('destaca la integración con el ERP SAP HANA', () => {
    render(<Experience />)

    expect(screen.getAllByText(/SAP HANA/i).length).toBeGreaterThan(0)
  })

  it('muestra las métricas porcentuales de impacto en un badge', () => {
    render(<Experience />)

    expect(screen.getByText('-35%')).toBeInTheDocument()
    expect(screen.getByText('-30%')).toBeInTheDocument()
  })

  it('expone los casos de ingeniería con reto y arquitectura', () => {
    render(<Experience />)

    expect(
      screen.getByRole('heading', { name: /digitalización de hojas de ruta/i }),
    ).toBeInTheDocument()
    expect(screen.getAllByText('El reto').length).toBeGreaterThan(0)
    expect(screen.getAllByText('La arquitectura').length).toBeGreaterThan(0)
  })
})
