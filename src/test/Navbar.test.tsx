import { fireEvent, render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import Navbar from '../components/layout/Navbar'

const NAV_LABELS = [
  'Servicios',
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

  it('presenta el header como capa glass translúcida (sticky, blur, borde tenue)', () => {
    render(<Navbar />)

    const header = screen.getByRole('banner')
    expect(header.className).toMatch(/sticky/)
    expect(header.className).toMatch(/\btop-0\b/)
    expect(header.className).toMatch(/\bz-20\b/)
    expect(header.className).toMatch(/backdrop-blur-md/)
    // Fondo semi-transparente + borde inferior tenue en ambos temas.
    expect(header.className).toMatch(/bg-\[#f8fafc\]\/60/)
    expect(header.className).toMatch(/dark:bg-\[#0a0e17\]\/55/)
    expect(header.className).toMatch(/border-b/)
  })

  it('mantiene el foco de teclado visible en enlaces y botón de tema', () => {
    render(<Navbar />)

    expect(
      screen.getByRole('button', { name: /activar modo claro/i }).className,
    ).toMatch(/focus-visible:ring/)
    const nav = screen.getByRole('navigation', { name: /principal/i })
    expect(
      within(nav).getByRole('link', { name: 'Proyectos' }).className,
    ).toMatch(/focus-visible:ring/)
  })

  it('renderiza los enlaces de anclaje de navegación', () => {
    render(<Navbar />)
    const nav = screen.getByRole('navigation', { name: /principal/i })

    for (const label of NAV_LABELS) {
      expect(within(nav).getByRole('link', { name: label })).toBeInTheDocument()
    }
    expect(
      within(nav).getByRole('link', { name: 'Servicios' }),
    ).toHaveAttribute('href', '#servicios')
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
      within(mobileNav).getByRole('link', { name: 'Servicios' }),
    ).toHaveAttribute('href', '#servicios')
    expect(
      within(mobileNav).getByRole('link', { name: 'Contacto' }),
    ).toHaveAttribute('href', '#contacto')
  })

  it('cierra el menú móvil al pulsar un enlace de anclaje (Servicios)', () => {
    render(<Navbar />)

    fireEvent.click(screen.getByRole('button', { name: /abrir menú/i }))
    const mobileNav = screen.getByRole('navigation', { name: /móvil/i })

    fireEvent.click(within(mobileNav).getByRole('link', { name: 'Servicios' }))

    expect(screen.getByRole('button', { name: /abrir menú/i })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
    expect(
      screen.queryByRole('navigation', { name: /móvil/i }),
    ).not.toBeInTheDocument()
  })
})
