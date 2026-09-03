import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
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
      screen.getByText(/integración ERP \(SAP HANA\)/i),
    ).toBeInTheDocument()
  })

  it('destaca las métricas clave de impacto', () => {
    render(<Hero />)

    expect(screen.getByText('-35%')).toBeInTheDocument()
    expect(screen.getByText(/carga operativa en Atika/i)).toBeInTheDocument()
    expect(screen.getByText('-30%')).toBeInTheDocument()
    expect(screen.getByText(/errores administrativos/i)).toBeInTheDocument()
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
})
