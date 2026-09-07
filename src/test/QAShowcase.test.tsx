import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import QAShowcase from '../components/sections/QAShowcase'
import { showcaseProjects, testCases } from '../data/portfolioData'
import { FOCUS_QA_GROUP_EVENT } from '../lib/crossLink'

const FEATURED_IDS = showcaseProjects
  .filter((project) => project.isFeatured)
  .map((project) => project.id)

const featuredCaseCount = testCases.filter((testCase) =>
  FEATURED_IDS.includes(testCase.proyecto_id),
).length

const distinctProjectCount = new Set(
  testCases.map((testCase) => testCase.proyecto_id),
).size

const GROUP_TOGGLE = /\d+ casos$/i
const PROJECT_RUN = /^probar proyecto/i
const SUITE_BUTTON = /ejecutar suite de testing/i

afterEach(() => {
  vi.useRealTimers()
})

describe('QAShowcase', () => {
  it('renderiza el encabezado de gobernanza de calidad con la bajada de métricas', () => {
    render(<QAShowcase />)

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /gobernanza de calidad & qa automation/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/28 casos de prueba cubren consistencia de datos/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/0 fallos en la última ejecución/i),
    ).toBeInTheDocument()
  })

  it('arranca con la pestaña Destacados activa y todos los grupos colapsados', () => {
    render(<QAShowcase />)

    expect(
      screen.getByRole('button', { name: /^destacados/i }),
    ).toHaveAttribute('aria-pressed', 'true')
    expect(
      screen.getByRole('button', { name: /todos los proyectos/i }),
    ).toHaveAttribute('aria-pressed', 'false')

    const groupToggles = screen.getAllByRole('button', { name: GROUP_TOGGLE })
    expect(groupToggles).toHaveLength(FEATURED_IDS.length)
    for (const toggle of groupToggles) {
      expect(toggle).toHaveAttribute('aria-expanded', 'false')
    }

    expect(screen.queryByText(testCases[0].titulo)).not.toBeInTheDocument()
    expect(
      screen.getByText(new RegExp(`0/${featuredCaseCount} casos`)),
    ).toBeInTheDocument()
  })

  it('expande un grupo al pulsar su header y muestra los tags de tipo de prueba', () => {
    render(<QAShowcase />)

    const firstToggle = screen.getAllByRole('button', { name: GROUP_TOGGLE })[0]
    fireEvent.click(firstToggle)
    expect(firstToggle).toHaveAttribute('aria-expanded', 'true')

    const firstProjectCases = testCases.filter(
      (testCase) => testCase.proyecto_id === FEATURED_IDS[0],
    )
    expect(screen.getByText(firstProjectCases[0].titulo)).toBeInTheDocument()
    expect(
      screen.getAllByText(firstProjectCases[0].tipo_prueba).length,
    ).toBeGreaterThan(0)
  })

  it('bloquea todos los botones individuales mientras la suite global corre', () => {
    vi.useFakeTimers()
    render(<QAShowcase />)

    const before = screen.getAllByRole('button', { name: PROJECT_RUN })
    expect(before).toHaveLength(FEATURED_IDS.length)
    for (const button of before) {
      expect(button).toBeEnabled()
    }

    fireEvent.click(screen.getByRole('button', { name: SUITE_BUTTON }))

    const suiteButton = screen.getByRole('button', { name: /ejecutando/i })
    expect(suiteButton).toBeDisabled()
    expect(suiteButton).toHaveAttribute('aria-busy', 'true')

    for (const button of screen.getAllByRole('button', { name: PROJECT_RUN })) {
      expect(button).toBeDisabled()
      expect(button.className).toMatch(/cursor-not-allowed/)
    }
  })

  it('renderiza el indicador de progreso "Ejecutando proyecto X de Y" durante la suite', () => {
    vi.useFakeTimers()
    render(<QAShowcase />)

    expect(
      screen.queryByText(/ejecutando proyecto \d+ de \d+/i),
    ).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: SUITE_BUTTON }))

    const indicator = screen.getByText(/ejecutando proyecto 1 de 4:/i)
    expect(indicator).toBeInTheDocument()
    expect(indicator).toHaveTextContent(showcaseProjects[0].title)

    act(() => {
      vi.advanceTimersByTime(20000)
    })

    expect(
      screen.queryByText(/ejecutando proyecto \d+ de \d+/i),
    ).not.toBeInTheDocument()
  })

  it('ejecuta la suite completa: secuencia, auto-colapso y panel de cierre recalculado', () => {
    vi.useFakeTimers()
    render(<QAShowcase />)

    fireEvent.click(screen.getByRole('button', { name: SUITE_BUTTON }))
    expect(screen.getByRole('button', { name: /ejecutando/i })).toBeDisabled()

    act(() => {
      vi.advanceTimersByTime(20000)
    })

    // Máquina global → COMPLETED_SUITE, botón interactivo.
    const rerun = screen.getByRole('button', { name: /volver a ejecutar/i })
    expect(rerun).toBeEnabled()
    expect(
      screen.queryByText(/ejecutando proyecto \d+ de \d+/i),
    ).not.toBeInTheDocument()

    // Contador dinámico al 100 % del filtro activo.
    expect(
      screen.getByText(
        new RegExp(`${featuredCaseCount}/${featuredCaseCount} casos`),
      ),
    ).toBeInTheDocument()

    // Cada proyecto quedó PASSED y su grupo auto-colapsado.
    const runButtons = screen.getAllByRole('button', { name: PROJECT_RUN })
    expect(runButtons).toHaveLength(FEATURED_IDS.length)
    for (const button of runButtons) {
      expect(button).toHaveTextContent(/passed/i)
    }
    for (const toggle of screen.getAllByRole('button', { name: GROUP_TOGGLE })) {
      expect(toggle).toHaveAttribute('aria-expanded', 'false')
    }

    // Panel resumen.
    expect(screen.getByText(/cobertura: 94\.8%/i)).toBeInTheDocument()
    expect(screen.getByText('0 Fallos')).toBeInTheDocument()
    expect(screen.getByText(/status: passing/i)).toBeInTheDocument()
    expect(
      screen.getByText(
        new RegExp(`${featuredCaseCount}/${featuredCaseCount} tests`),
      ),
    ).toBeInTheDocument()
  })

  it('ejecuta un proyecto de forma aislada sin disparar la suite global', () => {
    vi.useFakeTimers()
    render(<QAShowcase />)

    fireEvent.click(screen.getAllByRole('button', { name: PROJECT_RUN })[0])

    // Estado local del proyecto → RUNNING (botón bloqueado).
    const runningButton = screen.getAllByRole('button', { name: PROJECT_RUN })[0]
    expect(runningButton).toBeDisabled()
    expect(runningButton).toHaveTextContent(/ejecutando/i)

    // La suite global NO se activó.
    expect(screen.getByRole('button', { name: SUITE_BUTTON })).toBeEnabled()
    expect(
      screen.queryByText(/ejecutando proyecto \d+ de \d+/i),
    ).not.toBeInTheDocument()

    // Los demás botones individuales siguen disponibles.
    for (const button of screen
      .getAllByRole('button', { name: PROJECT_RUN })
      .slice(1)) {
      expect(button).toBeEnabled()
    }

    act(() => {
      vi.advanceTimersByTime(6000)
    })

    // El grupo se auto-expandió y todos sus casos pasaron.
    const firstProjectCases = testCases.filter(
      (testCase) => testCase.proyecto_id === FEATURED_IDS[0],
    )
    expect(screen.getAllByText('PASS')).toHaveLength(firstProjectCases.length)

    // Estado local → PASSED e interactivo de nuevo para reintentos puntuales.
    const passedButton = screen.getAllByRole('button', { name: PROJECT_RUN })[0]
    expect(passedButton).toBeEnabled()
    expect(passedButton).toHaveTextContent(/passed/i)

    // La suite global sigue en IDLE.
    expect(
      screen.getByRole('button', { name: SUITE_BUTTON }),
    ).toBeInTheDocument()
  })

  it('reinicia estados y acordeones de forma predecible al alternar Destacados ↔ Todos', () => {
    vi.useFakeTimers()
    render(<QAShowcase />)

    // Corre un proyecto individual y déjalo expandido.
    fireEvent.click(screen.getAllByRole('button', { name: PROJECT_RUN })[0])
    act(() => {
      vi.advanceTimersByTime(6000)
    })
    expect(
      screen.getAllByRole('button', { name: GROUP_TOGGLE })[0],
    ).toHaveAttribute('aria-expanded', 'true')

    // Cambia a "Todos los proyectos".
    fireEvent.click(
      screen.getByRole('button', { name: /todos los proyectos/i }),
    )

    const toggles = screen.getAllByRole('button', { name: GROUP_TOGGLE })
    expect(toggles).toHaveLength(distinctProjectCount)
    for (const toggle of toggles) {
      expect(toggle).toHaveAttribute('aria-expanded', 'false')
    }

    const runButtons = screen.getAllByRole('button', { name: PROJECT_RUN })
    expect(runButtons).toHaveLength(distinctProjectCount)
    for (const button of runButtons) {
      expect(button).toBeEnabled()
      expect(button).toHaveTextContent(/^ejecutar$/i)
    }

    expect(
      screen.getByText(new RegExp(`0/${testCases.length} casos`)),
    ).toBeInTheDocument()
    expect(screen.queryByText(/status: passing/i)).not.toBeInTheDocument()

    // Volver a Destacados: 4 grupos colapsados otra vez.
    fireEvent.click(screen.getByRole('button', { name: /^destacados/i }))
    const backToggles = screen.getAllByRole('button', { name: GROUP_TOGGLE })
    expect(backToggles).toHaveLength(FEATURED_IDS.length)
    for (const toggle of backToggles) {
      expect(toggle).toHaveAttribute('aria-expanded', 'false')
    }
  })

  it('tras completar la suite, re-ejecutar reinicia toda la simulación desde cero', () => {
    vi.useFakeTimers()
    render(<QAShowcase />)

    fireEvent.click(screen.getByRole('button', { name: SUITE_BUTTON }))
    act(() => {
      vi.advanceTimersByTime(20000)
    })

    const rerun = screen.getByRole('button', { name: /volver a ejecutar/i })
    for (const button of screen.getAllByRole('button', { name: PROJECT_RUN })) {
      expect(button).toBeEnabled()
    }

    fireEvent.click(rerun)

    expect(screen.getByText(/ejecutando proyecto 1 de 4/i)).toBeInTheDocument()
    for (const button of screen.getAllByRole('button', { name: PROJECT_RUN })) {
      expect(button).toBeDisabled()
    }
    expect(screen.queryByText(/status: passing/i)).not.toBeInTheDocument()
  })

  it('enlaza cada grupo con la tarjeta de su proyecto en #proyectos', () => {
    render(<QAShowcase />)

    const projectLinks = screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('href') === '#proyectos')
    expect(projectLinks).toHaveLength(FEATURED_IDS.length)
    expect(projectLinks[0]).toHaveTextContent(showcaseProjects[0].title)
  })

  it('expande y resalta el grupo de un proyecto al recibir el evento de foco', () => {
    render(<QAShowcase />)
    const nonFeatured = showcaseProjects.find((project) => !project.isFeatured)

    act(() => {
      window.dispatchEvent(
        new CustomEvent(FOCUS_QA_GROUP_EVENT, {
          detail: { projectId: nonFeatured?.id },
        }),
      )
    })

    expect(
      screen.getByRole('button', { name: /todos los proyectos/i }),
    ).toHaveAttribute('aria-pressed', 'true')

    const groupBody = document.getElementById(
      `qa-group-body-${nonFeatured?.id}`,
    )
    const firstCase = testCases.find(
      (testCase) => testCase.proyecto_id === nonFeatured?.id,
    )
    expect(groupBody?.textContent).toContain(firstCase?.titulo)
  })
})
