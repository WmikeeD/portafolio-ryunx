import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App.tsx'

describe('App', () => {
  it('ensambla la navegación principal y el hero', () => {
    render(<App />)

    expect(
      screen.getByRole('navigation', { name: /principal/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 1, name: /mayckol rodríguez/i }),
    ).toBeInTheDocument()
  })

  it('compone las secciones de experiencia y habilidades bajo el hero', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { level: 2, name: /experiencia empresarial/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: /habilidades/i }),
    ).toBeInTheDocument()
  })

  it('incluye la sección de proyectos (#proyectos) en el árbol principal', () => {
    const { container } = render(<App />)

    const projectsSection = container.querySelector('#proyectos')
    expect(projectsSection).toBeInTheDocument()
    expect(projectsSection?.tagName).toBe('SECTION')
    expect(
      screen.getByRole('heading', { level: 2, name: /proyectos destacados/i }),
    ).toBeInTheDocument()
  })

  it('incluye la sección de QA (#qa) en el árbol principal', () => {
    const { container } = render(<App />)

    const qaSection = container.querySelector('#qa')
    expect(qaSection).toBeInTheDocument()
    expect(qaSection?.tagName).toBe('SECTION')
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /gobernanza de calidad & qa automation/i,
      }),
    ).toBeInTheDocument()
  })
})
