import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App.tsx'

describe('App', () => {
  it('renderiza el título del portafolio', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: /portafolio-ryunx/i }),
    ).toBeInTheDocument()
  })
})
