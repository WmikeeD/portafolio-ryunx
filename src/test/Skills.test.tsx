import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Skills from '../components/sections/Skills'

/** Badge decorativo (contenedor 36px) de la tarjeta que muestra `name`. */
function badgeFor(name: string): HTMLElement {
  const tile = screen.getByText(name).closest('li')
  const badge = tile?.querySelector('[aria-hidden="true"]')
  if (!(badge instanceof HTMLElement)) {
    throw new Error(`No se encontró el badge de la habilidad "${name}"`)
  }
  return badge
}

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

  it('incluye GitHub Actions y CI/CD en la pestaña de DevOps & AI Tools', () => {
    render(<Skills />)

    fireEvent.click(screen.getByRole('tab', { name: 'DevOps & AI Tools' }))

    expect(screen.getByText('GitHub Actions')).toBeInTheDocument()
    expect(screen.getByText('CI/CD')).toBeInTheDocument()
  })

  it('renderiza el logo SVG oficial cuando la habilidad tiene icono', () => {
    render(<Skills />)

    const reactBadge = badgeFor('React')
    expect(reactBadge.querySelector('svg')).toBeInTheDocument()
    // El SVG reemplaza al monograma: el badge no aporta texto.
    expect(reactBadge.textContent).toBe('')

    const tsBadge = badgeFor('TypeScript')
    expect(tsBadge.querySelector('svg')).toBeInTheDocument()
  })

  it('cae limpiamente a las iniciales cuando no hay logo oficial', () => {
    render(<Skills />)

    fireEvent.click(screen.getByRole('tab', { name: 'Backend & APIs' }))

    // REST APIs: concepto sin logo → monograma, sin SVG.
    const restBadge = badgeFor('REST APIs')
    expect(restBadge.querySelector('svg')).not.toBeInTheDocument()
    expect(within(restBadge).getByText('API')).toBeInTheDocument()

    // Laravel sí tiene logo oficial en la misma pestaña.
    expect(badgeFor('Laravel').querySelector('svg')).toBeInTheDocument()
  })

  it('mantiene el badge en un contenedor fijo de 36px (w-9 h-9) para evitar CLS', () => {
    render(<Skills />)

    const badge = badgeFor('React')
    expect(badge.className).toMatch(/\bsize-9\b/)
    expect(badge.className).toMatch(/items-center/)
    expect(badge.className).toMatch(/justify-center/)
  })

  it('reacciona al cambio de pestaña intercambiando logos e iniciales', () => {
    render(<Skills />)

    // Frontend: React con logo.
    expect(badgeFor('React').querySelector('svg')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('tab', { name: 'QA & Testing' }))
    expect(screen.queryByText('React')).not.toBeInTheDocument()

    // QA: Vitest con logo, "QA Testing" con iniciales.
    expect(badgeFor('Vitest').querySelector('svg')).toBeInTheDocument()
    const qaBadge = badgeFor('QA Testing')
    expect(qaBadge.querySelector('svg')).not.toBeInTheDocument()
    expect(within(qaBadge).getByText('QA')).toBeInTheDocument()
  })
})
