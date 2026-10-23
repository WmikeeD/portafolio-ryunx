import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Projects from '../components/sections/Projects'
import { showcaseProjects, testCases } from '../data/portfolioData'

const LAYER2_TOGGLE = /ver arquitectura y qa gate/i
const COMPACT_TOGGLE = /ver caso completo/i

const FEATURED_PROJECTS = showcaseProjects.filter((project) => project.isFeatured)
const OTHER_PROJECTS = showcaseProjects.filter((project) => !project.isFeatured)

const countInCategory = (category: string) =>
  showcaseProjects.filter((project) =>
    (project.category as string[]).includes(category),
  ).length

describe('Projects', () => {
  it('ordena los proyectos destacados antes que los de la franja compacta', () => {
    expect(FEATURED_PROJECTS.length).toBeGreaterThan(0)
    expect(OTHER_PROJECTS.length).toBeGreaterThan(0)
    expect(showcaseProjects.slice(0, FEATURED_PROJECTS.length)).toEqual(
      FEATURED_PROJECTS,
    )
  })

  it('arranca con el filtro Destacados activo y los destacados en orden', () => {
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
      FEATURED_PROJECTS.map((project) => project.benefitTitle),
    )
    expect(screen.getAllByText('Destacado')).toHaveLength(
      FEATURED_PROJECTS.length,
    )
  })

  it('muestra los pills de filtro con su contador derivado de los datos', () => {
    render(<Projects />)

    expect(
      screen.getByRole('button', { name: /destacados/i }),
    ).toHaveTextContent(String(FEATURED_PROJECTS.length))
    expect(screen.getByRole('button', { name: /todos/i })).toHaveTextContent(
      String(showcaseProjects.length),
    )
    expect(
      screen.getByRole('button', { name: /datos & bi/i }),
    ).toHaveTextContent(String(countInCategory('data-bi')))
    expect(
      screen.getByRole('button', { name: /logística & erp/i }),
    ).toHaveTextContent(String(countInCategory('logistics-erp')))
    expect(
      screen.getByRole('button', { name: /retail & omnicanal/i }),
    ).toHaveTextContent(String(countInCategory('retail-omnichannel')))
    expect(
      screen.getByRole('button', { name: /ia aplicada/i }),
    ).toHaveTextContent(String(countInCategory('applied-ai')))
    expect(
      screen.getByRole('button', { name: /móvil & offline/i }),
    ).toHaveTextContent(String(countInCategory('mobile')))
    expect(
      screen.getByRole('button', { name: /meta \/ ingeniería de producto/i }),
    ).toHaveTextContent(String(countInCategory('product-eng')))
    expect(
      screen.getByRole('button', { name: /qa & testing/i }),
    ).toHaveTextContent(String(countInCategory('qa')))
  })

  it('no ofrece filtros de dominio sin proyectos', () => {
    render(<Projects />)

    const filterGroup = screen.getByRole('group', {
      name: /filtrar proyectos por dominio/i,
    })
    const counts = Array.from(filterGroup.querySelectorAll('button')).map(
      (button) => Number(button.querySelector('span')?.textContent),
    )
    expect(counts.every((count) => count > 0)).toBe(true)
  })

  it('renderiza la franja compacta con el resto de proyectos', () => {
    render(<Projects />)

    expect(
      screen.getByRole('group', {
        name: `Otros proyectos y desarrollos (+${OTHER_PROJECTS.length})`,
      }),
    ).toBeInTheDocument()

    expect(
      screen.getAllByRole('button', { name: COMPACT_TOGGLE }),
    ).toHaveLength(OTHER_PROJECTS.length)

    for (const project of OTHER_PROJECTS) {
      expect(screen.getByText(project.title)).toBeInTheDocument()
    }
  })

  it('expande una fila compacta a la tarjeta completa y permite abrir su Capa 2', () => {
    render(<Projects />)

    const [firstOther] = OTHER_PROJECTS
    fireEvent.click(screen.getAllByRole('button', { name: COMPACT_TOGGLE })[0])

    expect(
      screen.getByRole('heading', { level: 3, name: firstOther.benefitTitle }),
    ).toBeInTheDocument()

    const layer2Toggles = screen.getAllByRole('button', { name: LAYER2_TOGGLE })
    // destacados + la fila compacta expandida
    expect(layer2Toggles).toHaveLength(FEATURED_PROJECTS.length + 1)

    fireEvent.click(layer2Toggles[FEATURED_PROJECTS.length])
    expect(screen.getByText(firstOther.qaGate)).toBeInTheDocument()
  })

  it('al pulsar Todos lista todos los proyectos y oculta la franja compacta', () => {
    render(<Projects />)

    fireEvent.click(screen.getByRole('button', { name: /todos/i }))

    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(
      showcaseProjects.length,
    )
    expect(
      screen.queryByRole('group', { name: /otros proyectos y desarrollos/i }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: COMPACT_TOGGLE }),
    ).not.toBeInTheDocument()
  })

  it('el toggle "Ver arquitectura y QA Gate" monta el pipeline y el QA Gate', () => {
    render(<Projects />)

    const [firstFeatured] = FEATURED_PROJECTS
    expect(screen.queryByText('Pipeline de Arquitectura')).not.toBeInTheDocument()
    expect(screen.queryByText('QA Gate')).not.toBeInTheDocument()

    fireEvent.click(screen.getAllByRole('button', { name: LAYER2_TOGGLE })[0])

    expect(screen.getAllByText('Pipeline de Arquitectura')).toHaveLength(1)
    expect(screen.getByText('QA Gate')).toBeInTheDocument()
    expect(screen.getByText(firstFeatured.pipeline.api)).toBeInTheDocument()
    expect(screen.getByText(firstFeatured.qaGate)).toBeInTheDocument()

    fireEvent.click(screen.getAllByRole('button', { name: LAYER2_TOGGLE })[0])
    expect(screen.queryByText('Pipeline de Arquitectura')).not.toBeInTheDocument()
  })

  it('el switch Técnico Completo abre la Capa 2 de todos los proyectos visibles', () => {
    render(<Projects />)

    fireEvent.click(
      screen.getByRole('button', { name: /modo: técnico completo/i }),
    )

    expect(screen.getAllByText('Pipeline de Arquitectura')).toHaveLength(
      FEATURED_PROJECTS.length,
    )
    expect(screen.getAllByText('QA Gate')).toHaveLength(FEATURED_PROJECTS.length)
    expect(
      screen.queryByRole('button', { name: LAYER2_TOGGLE }),
    ).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /modo: negocio/i }))
    expect(screen.queryByText('QA Gate')).not.toBeInTheDocument()
  })

  it('el filtro Móvil & Offline lista solo sus proyectos en orden', () => {
    render(<Projects />)

    fireEvent.click(screen.getByRole('button', { name: /móvil & offline/i }))

    const headings = screen.getAllByRole('heading', { level: 3 })
    expect(headings.map((heading) => heading.textContent)).toEqual(
      showcaseProjects
        .filter((project) => project.category.includes('mobile'))
        .map((project) => project.benefitTitle),
    )
  })

  it('el filtro Logística & ERP lista destacados y franja compacta en orden', () => {
    render(<Projects />)

    fireEvent.click(screen.getByRole('button', { name: /logística & erp/i }))

    const headings = screen.getAllByRole('heading', { level: 3 })
    expect(headings.map((heading) => heading.textContent)).toEqual(
      showcaseProjects
        .filter((project) => project.category.includes('logistics-erp'))
        .map((project) => project.benefitTitle),
    )
  })

  it('en la vista Todos cada tarjeta mantiene su Capa 1 (Problema, Solución y contexto)', () => {
    render(<Projects />)

    fireEvent.click(screen.getByRole('button', { name: /todos/i }))

    expect(screen.getAllByText('El Problema')).toHaveLength(showcaseProjects.length)
    expect(screen.getAllByText('Solución de Ingeniería')).toHaveLength(
      showcaseProjects.length,
    )
    expect(screen.getAllByText('Iniciativa Personal')).toHaveLength(
      showcaseProjects.filter(
        (project) => project.context === 'Iniciativa Personal',
      ).length,
    )
  })

  it('el filtro Meta / Ingeniería de Producto muestra solo el caso del portafolio', () => {
    render(<Projects />)

    fireEvent.click(
      screen.getByRole('button', { name: /meta \/ ingeniería de producto/i }),
    )

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
    expect(projectsWithRepo.length).toBeGreaterThan(0)

    const ghLinks = screen.getAllByRole('link', { name: /ver código en github/i })
    expect(ghLinks).toHaveLength(projectsWithRepo.length)
    for (const link of ghLinks) {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link.getAttribute('rel')).toContain('noreferrer')
      expect(link.getAttribute('href')).toContain('github.com/WmikeeD')
    }

    // sin nota estática ni fallback en el espacio del enlace
    expect(
      screen.queryByText(/(código|repositorio) (privado|confidencial)/i),
    ).not.toBeInTheDocument()
  })

  it('el proyecto del portafolio enlaza a su repositorio público', () => {
    render(<Projects />)

    fireEvent.click(screen.getByRole('button', { name: /todos/i }))
    fireEvent.click(
      screen.getByRole('button', { name: /modo: técnico completo/i }),
    )

    const repoLink = screen
      .getAllByRole('link', { name: /ver código en github/i })
      .find(
        (link) =>
          link.getAttribute('href') ===
          'https://github.com/WmikeeD/portafolio-ryunx',
      )
    expect(repoLink).toBeDefined()
    expect(repoLink).toHaveAttribute('target', '_blank')
    expect(repoLink?.getAttribute('rel')).toContain('noopener')
    expect(repoLink?.getAttribute('rel')).toContain('noreferrer')
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

  it('cada caso de prueba referencia un proyecto existente', () => {
    const projectIds = new Set(showcaseProjects.map((project) => project.id))
    expect(
      testCases.every((testCase) => projectIds.has(testCase.proyecto_id)),
    ).toBe(true)
  })
})
