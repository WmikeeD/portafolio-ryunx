import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Skills from '../components/sections/Skills'

const KEY_CATEGORIES = [
  'Frontend & Mobile',
  'Backend & APIs',
  'Bases de Datos & ERP',
  'QA & Testing',
  'DevOps & AI Tools',
] as const

describe('Skills', () => {
  it('expone todas las categorías técnicas clave como pestañas', () => {
    render(<Skills />)

    for (const category of KEY_CATEGORIES) {
      expect(screen.getByRole('tab', { name: category })).toBeInTheDocument()
    }
  })

  it('muestra por defecto las habilidades de Frontend & Mobile', () => {
    render(<Skills />)

    expect(screen.getByRole('tab', { name: 'Frontend & Mobile' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('cambia el panel de habilidades al seleccionar otra pestaña', () => {
    render(<Skills />)

    fireEvent.click(screen.getByRole('tab', { name: 'QA & Testing' }))

    expect(screen.getByText('Vitest')).toBeInTheDocument()
    expect(screen.queryByText('React')).not.toBeInTheDocument()
  })
})
