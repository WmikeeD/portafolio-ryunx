import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Contact from '../components/sections/Contact'

describe('Contact', () => {
  it('renderiza la información de contacto directa', () => {
    render(<Contact />)

    expect(
      screen.getByRole('link', { name: 'mayckol10r.s@gmail.com' }),
    ).toHaveAttribute('href', 'mailto:mayckol10r.s@gmail.com')
    expect(screen.getByRole('link', { name: '+56 9 50571303' })).toHaveAttribute(
      'href',
      'tel:+56950571303',
    )
    expect(screen.getByText('Santiago, Chile')).toBeInTheDocument()
    expect(
      screen.getByRole('link', {
        name: /linkedin\.com\/in\/mayckol-sanchez-a32624122/i,
      }),
    ).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/mayckol-sanchez-a32624122',
    )
    expect(
      screen.getByRole('link', { name: /github\.com\/wmikeed/i }),
    ).toHaveAttribute('href', 'https://github.com/WmikeeD')
    expect(
      screen.getByText(/disponible para roles full-stack y qa lead/i),
    ).toBeInTheDocument()
  })

  it('presenta el formulario reactivo con todos sus campos y el CTA de envío', () => {
    render(<Contact />)

    expect(screen.getByLabelText('Nombre')).toBeInTheDocument()
    expect(screen.getByLabelText('Correo electrónico')).toBeInTheDocument()
    expect(screen.getByLabelText('Asunto')).toBeInTheDocument()
    expect(screen.getByLabelText('Mensaje')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /enviar mensaje/i }),
    ).toBeEnabled()
  })

  it('muestra los errores de validación de Zod al enviar el formulario vacío', async () => {
    render(<Contact />)

    fireEvent.click(screen.getByRole('button', { name: /enviar mensaje/i }))

    const alerts = await screen.findAllByRole('alert')
    expect(alerts.length).toBeGreaterThanOrEqual(4)

    expect(
      screen.getByText(/el nombre debe tener al menos 3 caracteres/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/el correo electrónico es obligatorio/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/el asunto debe tener al menos 4 caracteres/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/el mensaje debe tener al menos 10 caracteres/i),
    ).toBeInTheDocument()
  })

  it('acepta datos válidos y muestra la confirmación de éxito', async () => {
    render(<Contact />)

    fireEvent.change(screen.getByLabelText('Nombre'), {
      target: { value: 'Mayckol Rodríguez' },
    })
    fireEvent.change(screen.getByLabelText('Correo electrónico'), {
      target: { value: 'mayckol10r.s@gmail.com' },
    })
    fireEvent.change(screen.getByLabelText('Asunto'), {
      target: { value: 'Propuesta de rol Full-Stack' },
    })
    fireEvent.change(screen.getByLabelText('Mensaje'), {
      target: { value: 'Hola Mayckol, me gustaría conversar sobre una vacante.' },
    })

    fireEvent.click(screen.getByRole('button', { name: /enviar mensaje/i }))

    const status = await screen.findByRole('status', {}, { timeout: 2000 })
    expect(status).toHaveTextContent(/¡gracias, mayckol rodríguez!/i)
  })
})
