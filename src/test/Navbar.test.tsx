import { fireEvent, render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import Navbar from '../components/layout/Navbar'

const NAV_LABELS = [
  'Experiencia',
  'Habilidades',
  'Proyectos',
  'QA',
  'Contacto',
] as const
const THEME_STORAGE_KEY = 'theme'

describe('Navbar', () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('renderiza los enlaces de anclaje de navegación', () => {
    render(<Navbar />)
    const nav = screen.getByRole('navigation', { name: /principal/i })

    for (const label of NAV_LABELS) {
      expect(within(nav).getByRole('link', { name: label })).toBeInTheDocument()
    }
    expect(
      within(nav).getByRole('link', { name: 'Habilidades' }),
    ).toHaveAttribute('href', '#habilidades')
    expect(
      within(nav).getByRole('link', { name: 'Proyectos' }),
    ).toHaveAttribute('href', '#proyectos')
  })

  it('alterna tema, clase dark del documento e icono (Sun ↔ Moon) al pulsar', () => {
    render(<Navbar />)

    // Arranque por defecto en modo oscuro → icono Sun.
    const toggleDark = screen.getByRole('button', { name: /activar modo claro/i })
    expect(document.documentElement).toHaveClass('dark')
    expect(toggleDark.querySelector('.lucide-sun')).not.toBeNull()

    fireEvent.click(toggleDark)

    // Modo claro → clase dark eliminada, persistida en localStorage, icono Moon.
    const toggleLight = screen.getByRole('button', {
      name: /activar modo oscuro/i,
    })
    expect(document.documentElement).not.toHaveClass('dark')
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('light')
    expect(toggleLight.querySelector('.lucide-moon')).not.toBeNull()

    fireEvent.click(toggleLight)

    expect(document.documentElement).toHaveClass('dark')
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark')
  })

  it('gestiona el menú móvil con estado accesible (aria-expanded)', () => {
    render(<Navbar />)

    const openButton = screen.getByRole('button', { name: /abrir menú/i })
    expect(openButton).toHaveAttribute('aria-expanded', 'false')
    expect(
      screen.queryByRole('navigation', { name: /móvil/i }),
    ).not.toBeInTheDocument()

    fireEvent.click(openButton)

    const closeButton = screen.getByRole('button', { name: /cerrar menú/i })
    expect(closeButton).toHaveAttribute('aria-expanded', 'true')

    const mobileNav = screen.getByRole('navigation', { name: /móvil/i })
    expect(
      within(mobileNav).getByRole('link', { name: 'Contacto' }),
    ).toHaveAttribute('href', '#contacto')
  })
})
