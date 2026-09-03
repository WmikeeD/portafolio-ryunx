import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Footer from '../components/layout/Footer'

describe('Footer', () => {
  it('muestra el copyright con el año actual y el nombre completo', () => {
    render(<Footer />)

    const year = new Date().getFullYear()
    expect(
      screen.getByText(
        new RegExp(`©\\s*${year}\\s*Mayckol Rodríguez Sánchez`),
      ),
    ).toBeInTheDocument()
  })

  it('incluye la leyenda de arquitectura del stack', () => {
    render(<Footer />)

    expect(
      screen.getByText(
        'Desarrollado con React, Vite, TypeScript & Tailwind CSS',
      ),
    ).toBeInTheDocument()
  })

  it('ofrece un enlace de vuelta al inicio', () => {
    render(<Footer />)

    expect(
      screen.getByRole('link', { name: /volver al inicio/i }),
    ).toHaveAttribute('href', '#inicio')
  })
})
