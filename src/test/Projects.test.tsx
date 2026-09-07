import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Projects from '../components/sections/Projects'
import { showcaseProjects, testCases } from '../data/portfolioData'

const LAYER2_TOGGLE = /ver arquitectura y qa gate/i
const COMPACT_TOGGLE = /ver caso completo/i

const FEATURED_BENEFIT_TITLES = [
  'Visibilidad unificada de ventas y operación en un solo dashboard',
  'Digitalización y control de despachos en tiempo real',
  'Prevención de pérdidas de venta por stock bloqueado sin necesidad',
  'Gestión de finanzas personales asistida y funcional sin internet',
]

describe('Projects', () => {
  it('mantiene los 9 proyectos: 4 destacados y 5 en la franja compacta', () => {
    expect(showcaseProjects).toHaveLength(9)
    expect(
      showcaseProjects.filter((project) => project.isFeatured),
    ).toHaveLength(4)
    expect(
      showcaseProjects.filter((project) => !project.isFeatured),
    ).toHaveLength(5)
    expect(
      showcaseProjects.slice(0, 4).every((project) => project.isFeatured),
    ).toBe(true)
    expect(
      showcaseProjects.slice(4).some((project) => project.isFeatured),
    ).toBe(false)
  })

  it('arranca con el filtro Destacados activo y los 4 insignia en orden', () => {
    render(<Projects />)

    expect(
      screen.getByRole('button', { name: /destacados/i }),
    ).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: /todos/i })).toHaveAttribute(
      'aria-pressed',
      'false',
    )

    const headings = screen.getAllByRole('heading', { level: 3 })
    expect(headings.map((heading) => heading.textContent)).toEqual(
      FEATURED_BENEFIT_TITLES,
    )
    expect(screen.getAllByText('Destacado')).toHaveLength(4)
  })

  it('muestra los pills de filtro con su contador dinámico', () => {
    render(<Projects />)

    expect(
      screen.getByRole('button', { name: /destacados/i }),
    ).toHaveTextContent('4')
    expect(screen.getByRole('button', { name: /todos/i })).toHaveTextContent('9')
    expect(
      screen.getByRole('button', { name: /datos & bi/i }),
    ).toHaveTextContent('1')
    expect(
      screen.getByRole('button', { name: /erp & logística/i }),
    ).toHaveTextContent('4')
    expect(
      screen.getByRole('button', { name: /retail & omnicanal/i }),
    ).toHaveTextContent('2')
    expect(
      screen.getByRole('button', { name: /móvil & offline/i }),
    ).toHaveTextContent('2')
    expect(
      screen.getByRole('button', { name: /meta \/ producto/i }),
    ).toHaveTextContent('1')
    expect(
      screen.getByRole('button', { name: /qa & testing/i }),
    ).toHaveTextContent('9')
  })

  it('renderiza la franja compacta "Otros proyectos y desarrollos (+5)"', () => {
    render(<Projects />)

    expect(
      screen.getByRole('group', {
        name: /otros proyectos y desarrollos \(\+5\)/i,
      }),
    ).toBeInTheDocument()

    expect(
      screen.getAllByRole('button', { name: COMPACT_TOGGLE }),
    ).toHaveLength(5)

    expect(
      screen.getByText(
        'Sistema Transaccional de Retiro en Tienda (Click & Collect)',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Sistema de Trazabilidad & Control de Acceso Bodegas'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Portafolio Web con CI/CD y Flujo de Ramas Protegido'),
    ).toBeInTheDocument()
  })

  it('expande una fila compacta a la tarjeta completa y permite abrir su Capa 2', () => {
    render(<Projects />)

    fireEvent.click(screen.getAllByRole('button', { name: COMPACT_TOGGLE })[0])

    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Retiro en tienda (Click & Collect) con retorno automático de stock no retirado',
      }),
    ).toBeInTheDocument()

    const layer2Toggles = screen.getAllByRole('button', { name: LAYER2_TOGGLE })
    expect(layer2Toggles).toHaveLength(5) // 4 insignia + 1 fila compacta expandida

    fireEvent.click(layer2Toggles[4])
    expect(
      screen.getByText(/reversa transaccional hacia reserva en SAP B1/i),
    ).toBeInTheDocument()
  })

  it('al pulsar Todos lista los 9 proyectos y oculta la franja compacta', () => {
    render(<Projects />)

    fireEvent.click(screen.getByRole('button', { name: /todos/i }))

    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(9)
    expect(
      screen.queryByRole('group', { name: /otros proyectos y desarrollos/i }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: COMPACT_TOGGLE }),
    ).not.toBeInTheDocument()
  })

  it('el toggle "Ver arquitectura y QA Gate" monta el pipeline y el QA Gate', () => {
    render(<Projects />)

    expect(screen.queryByText('Pipeline de Arquitectura')).not.toBeInTheDocument()
    expect(screen.queryByText('QA Gate')).not.toBeInTheDocument()

    fireEvent.click(screen.getAllByRole('button', { name: LAYER2_TOGGLE })[0])

    expect(screen.getAllByText('Pipeline de Arquitectura')).toHaveLength(1)
    expect(screen.getByText('QA Gate')).toBeInTheDocument()
    expect(screen.getByText('API REST en Python (Flask)')).toBeInTheDocument()
    expect(
      screen.getByText(/pruebas de integridad de los indicadores calculados/i),
    ).toBeInTheDocument()

    fireEvent.click(screen.getAllByRole('button', { name: LAYER2_TOGGLE })[0])
    expect(screen.queryByText('Pipeline de Arquitectura')).not.toBeInTheDocument()
  })

  it('el switch Técnico Completo abre la Capa 2 de todos los proyectos visibles', () => {
    render(<Projects />)

    fireEvent.click(
      screen.getByRole('button', { name: /modo: técnico completo/i }),
    )

    expect(screen.getAllByText('Pipeline de Arquitectura')).toHaveLength(4)
    expect(screen.getAllByText('QA Gate')).toHaveLength(4)
    expect(
      screen.queryByRole('button', { name: LAYER2_TOGGLE }),
    ).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /modo: negocio/i }))
    expect(screen.queryByText('QA Gate')).not.toBeInTheDocument()
  })

  it('el filtro Datos & BI muestra solo el caso de Business Intelligence', () => {
    render(<Projects />)

    fireEvent.click(screen.getByRole('button', { name: /datos & bi/i }))

    const headings = screen.getAllByRole('heading', { level: 3 })
    expect(headings).toHaveLength(1)
    expect(headings[0]).toHaveTextContent(
      'Visibilidad unificada de ventas y operación en un solo dashboard',
    )
  })

  it('el filtro Móvil & Offline lista sus 2 proyectos en orden', () => {
    render(<Projects />)

    fireEvent.click(screen.getByRole('button', { name: /móvil & offline/i }))

    const headings = screen.getAllByRole('heading', { level: 3 })
    expect(headings.map((heading) => heading.textContent)).toEqual([
      'Gestión de finanzas personales asistida y funcional sin internet',
      'Trazabilidad y registro continuo de mercadería en bodega',
    ])
  })

  it('en la vista Todos cada tarjeta mantiene su Capa 1 (Problema, Solución y contexto)', () => {
    render(<Projects />)

    fireEvent.click(screen.getByRole('button', { name: /todos/i }))

    expect(screen.getAllByText('El Problema')).toHaveLength(9)
    expect(screen.getAllByText('Solución de Ingeniería')).toHaveLength(9)
    // Confidencialidad: el contexto empresarial se muestra en términos neutros.
    expect(screen.getAllByText('Entorno Empresarial')).toHaveLength(7)
    expect(screen.getAllByText('Iniciativa Personal')).toHaveLength(2)
    expect(screen.queryByText(/Atika/i)).not.toBeInTheDocument()
  })

  it('el filtro Meta / Producto muestra solo el caso del portafolio', () => {
    render(<Projects />)

    fireEvent.click(screen.getByRole('button', { name: /meta \/ producto/i }))

    const headings = screen.getAllByRole('heading', { level: 3 })
    expect(headings).toHaveLength(1)
    expect(headings[0]).toHaveTextContent(
      'Control de calidad y despliegue automatizado de este portafolio',
    )
  })

  it('renderiza el enlace a GitHub solo en los proyectos con githubUrl', () => {
    render(<Projects />)

    fireEvent.click(screen.getByRole('button', { name: /todos/i }))
    fireEvent.click(
      screen.getByRole('button', { name: /modo: técnico completo/i }),
    )

    const projectsWithRepo = showcaseProjects.filter(
      (project) => project.githubUrl,
    )
    expect(projectsWithRepo).toHaveLength(2) // Portafolio + App Móvil de Finanzas

    const ghLinks = screen.getAllByRole('link', { name: /ver código en github/i })
    expect(ghLinks).toHaveLength(projectsWithRepo.length)
    for (const link of ghLinks) {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link.getAttribute('rel')).toContain('noreferrer')
      expect(link.getAttribute('href')).toContain('github.com/WmikeeD')
    }

    // sin nota estática de confidencialidad ni fallback en el espacio del enlace
    expect(screen.queryByText(/confidencialidad/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/código privado/i)).not.toBeInTheDocument()
  })

  it('la Capa 2 de cada proyecto enlaza con su grupo en el QA Showcase', () => {
    render(<Projects />)

    fireEvent.click(screen.getByRole('button', { name: /todos/i }))
    fireEvent.click(
      screen.getByRole('button', { name: /modo: técnico completo/i }),
    )

    const qaLinks = screen.getAllByRole('link', { name: /ver en qa showcase/i })
    expect(qaLinks).toHaveLength(showcaseProjects.length)
    for (const link of qaLinks) {
      expect(link).toHaveAttribute('href', '#qa')
    }

    // cada enlace muestra el nº de casos del proyecto centralizados en portfolioData
    expect(
      screen.getAllByText(/pruebas relacionadas: \d+ casos/i),
    ).toHaveLength(showcaseProjects.length)
    expect(testCases.length).toBeGreaterThan(0)
  })
})
