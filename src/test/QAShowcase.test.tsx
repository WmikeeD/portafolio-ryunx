import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import QAShowcase from '../components/sections/QAShowcase'
import { qaTestCases } from '../data/portfolioData'

const SUITES = [
  'Integración SAP HANA',
  'Stock Click & Collect',
  'REST API Auth',
  'Finanzas Flutter',
] as const

afterEach(() => {
  vi.useRealTimers()
})

describe('QAShowcase', () => {
  it('renderiza el título y el subtítulo de gobernanza de calidad', () => {
    render(<QAShowcase />)

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /gobernanza de calidad & qa automation/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText(/shift-left testing/i)).toBeInTheDocument()
  })

  it('expone el botón de ejecución de la suite, habilitado al inicio', () => {
    render(<QAShowcase />)

    expect(
      screen.getByRole('button', { name: /ejecutar suite de testing/i }),
    ).toBeEnabled()
  })

  it('arranca con la barra de progreso en 0% y sin resumen final', () => {
    render(<QAShowcase />)

    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0')
    expect(screen.queryByText(/cobertura: 94\.8%/i)).not.toBeInTheDocument()
  })

  it('lista cada caso de prueba con sus cuatro suites representadas', () => {
    render(<QAShowcase />)

    for (const testCase of qaTestCases) {
      expect(screen.getByText(testCase.testName)).toBeInTheDocument()
    }

    for (const suite of SUITES) {
      expect(screen.getAllByText(suite).length).toBeGreaterThan(0)
    }
  })

  it('entra en estado de ejecución al pulsar el botón', () => {
    vi.useFakeTimers()
    render(<QAShowcase />)

    fireEvent.click(
      screen.getByRole('button', { name: /ejecutar suite de testing/i }),
    )

    expect(screen.getByRole('button', { name: /ejecutando/i })).toBeDisabled()
  })
})
