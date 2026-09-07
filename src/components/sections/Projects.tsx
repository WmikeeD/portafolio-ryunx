import { useEffect, useMemo, useState } from 'react'
import type { ComponentType, SVGProps } from 'react'
import { motion, type Variants } from 'framer-motion'
import {
  ArrowRight,
  ChevronDown,
  Cpu,
  Database,
  FlaskConical,
  Layers,
  Server,
  ShieldCheck,
  Star,
} from 'lucide-react'
import { showcaseProjects, testCases } from '../../data/portfolioData'
import type {
  ArchitecturePipeline,
  FilterCategory,
  ShowcaseProject,
} from '../../types'
import {
  HIGHLIGHT_MS,
  HIGHLIGHT_PROJECT_CARD_EVENT,
  focusQaGroup,
  onCrossLink,
  smoothScrollToId,
} from '../../lib/crossLink'

type GlyphComponent = ComponentType<SVGProps<SVGSVGElement>>

interface PipelineStage {
  key: keyof ArchitecturePipeline
  label: string
  Icon: GlyphComponent
}

/** Nodos del pipeline: Cliente ➔ API ➔ Adapter / Worker ➔ Persistencia / ERP. */
const PIPELINE_STAGES: readonly PipelineStage[] = [
  { key: 'client', label: 'Cliente', Icon: Layers },
  { key: 'api', label: 'API', Icon: Server },
  { key: 'adapterOrWorker', label: 'Adapter / Worker', Icon: Cpu },
  { key: 'persistenceOrErp', label: 'Persistencia / ERP', Icon: Database },
]

interface DomainFilter {
  id: FilterCategory
  label: string
}

/** Barra de filtros; `featured` (Top 4 insignia) es el filtro activo por defecto. */
const DOMAIN_FILTERS: readonly DomainFilter[] = [
  { id: 'featured', label: 'Destacados' },
  { id: 'all', label: 'Todos' },
  { id: 'bi-data', label: 'Datos & BI' },
  { id: 'erp-logistics', label: 'ERP & Logística' },
  { id: 'retail', label: 'Retail & Omnicanal' },
  { id: 'mobile', label: 'Móvil & Offline' },
  { id: 'product-eng', label: 'Meta / Producto' },
  { id: 'qa', label: 'QA & Testing' },
]

/** Glifo oficial de GitHub (lucide-react retiró los iconos de marca). */
function GithubGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.28-.01-1.02-.02-2.01-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.29 0 .32.22.7.82.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
    </svg>
  )
}

const FEATURED_PROJECTS = showcaseProjects.filter((project) => project.isFeatured)
const OTHER_PROJECTS = showcaseProjects.filter((project) => !project.isFeatured)

/** Proyectos que corresponden a una categoría de filtro. */
function projectsForFilter(filter: FilterCategory): readonly ShowcaseProject[] {
  if (filter === 'featured') {
    return FEATURED_PROJECTS
  }
  if (filter === 'all') {
    return showcaseProjects
  }
  return showcaseProjects.filter((project) => project.category.includes(filter))
}

function countForFilter(filter: FilterCategory): number {
  return projectsForFilter(filter).length
}

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const revealVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

const activeFilterClass =
  'inline-flex items-center gap-2 rounded-full border border-brand-primary bg-brand-primary/10 px-4 py-2 text-sm font-semibold text-sky-700 transition-colors dark:text-brand-primary'

const idleFilterClass =
  'inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-600 backdrop-blur-md transition-colors hover:border-brand-primary/50 hover:text-brand-primary dark:border-slate-800 dark:bg-brand-card/80 dark:text-slate-400'

const activeModeClass =
  'rounded-full px-4 py-1.5 text-xs font-semibold text-brand-dark transition-colors bg-brand-primary'

const idleModeClass =
  'rounded-full px-4 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:text-brand-primary dark:text-slate-400'

const cardBaseClass =
  'flex flex-col gap-5 rounded-2xl border bg-white p-6 transition-colors dark:bg-brand-card/90'

const featuredCardClass = `${cardBaseClass} border-brand-primary/40 ring-1 ring-brand-primary/20 dark:border-brand-primary/40`

const plainCardClass = `${cardBaseClass} border-slate-200 dark:border-slate-800`

const disclosureButtonClass =
  'inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:border-brand-primary/50 hover:text-brand-primary dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300'

function chevronClass(open: boolean): string {
  return open
    ? 'size-4 rotate-180 transition-transform'
    : 'size-4 transition-transform'
}

interface PipelineDiagramProps {
  title: string
  pipeline: ArchitecturePipeline
}

function PipelineDiagram({ title, pipeline }: PipelineDiagramProps) {
  return (
    <ol
      aria-label={`Pipeline de arquitectura de ${title}`}
      className="flex flex-col gap-3 sm:flex-row sm:items-stretch"
    >
      {PIPELINE_STAGES.map((stage, index) => {
        const isLast = index === PIPELINE_STAGES.length - 1
        const { Icon } = stage

        return (
          <li
            key={stage.key}
            className="flex flex-1 flex-col items-stretch gap-3 sm:flex-row sm:items-center"
          >
            <div className="flex-1 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/50">
              <p className="flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-wider text-sky-700 dark:text-brand-primary">
                <Icon className="size-3.5" aria-hidden="true" />
                {stage.label}
              </p>
              <p className="mt-1 text-xs font-medium text-slate-700 dark:text-slate-300">
                {pipeline[stage.key]}
              </p>
            </div>

            {!isLast && (
              <span
                aria-hidden="true"
                className="flex shrink-0 items-center justify-center self-center text-slate-400 dark:text-slate-600"
              >
                <ArrowRight className="size-4 rotate-90 sm:rotate-0" />
              </span>
            )}
          </li>
        )
      })}
    </ol>
  )
}

interface SectionBlockProps {
  label: string
  accent?: boolean
  children: string
}

/** Bloque de texto etiquetado ("El Problema" / "Solución de Ingeniería"). */
function SectionBlock({ label, accent = false, children }: SectionBlockProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <p
        className={
          accent
            ? 'text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-brand-primary'
            : 'text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500'
        }
      >
        {label}
      </p>
      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {children}
      </p>
    </div>
  )
}

interface ProjectCardProps {
  project: ShowcaseProject
  technicalMode: boolean
  isLayer2Open: boolean
  isHighlighted: boolean
  onToggleLayer2: () => void
}

/** Tarjeta completa del proyecto: Capa 1 (negocio) siempre + Capa 2 (técnica) colapsable. */
function ProjectCard({
  project,
  technicalMode,
  isLayer2Open,
  isHighlighted,
  onToggleLayer2,
}: ProjectCardProps) {
  const showLayer2 = technicalMode || isLayer2Open
  const layer2Id = `project-layer2-${project.id}`
  const relatedCaseCount = testCases.filter(
    (testCase) => testCase.proyecto_id === project.id,
  ).length

  const baseClass = project.isFeatured ? featuredCardClass : plainCardClass

  return (
    <article
      id={`project-card-${project.id}`}
      className={
        isHighlighted
          ? `${baseClass} border-emerald-400 ring-2 ring-emerald-400/60 dark:border-brand-secondary`
          : baseClass
      }
    >
      <header className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <span className="rounded-full border border-brand-primary/30 bg-brand-primary/10 px-3 py-1 text-xs font-semibold text-sky-700 dark:text-brand-primary">
            {project.badge}
          </span>
          {project.isFeatured && (
            <span className="inline-flex items-center gap-1 rounded-full border border-brand-primary/40 bg-brand-primary/15 px-2.5 py-1 text-xs font-bold text-sky-700 dark:text-brand-primary">
              <Star className="size-3" aria-hidden="true" />
              Destacado
            </span>
          )}
          <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-400">
            {project.context}
          </span>
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          {project.benefitTitle}
        </h3>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
          {project.title}
        </p>
      </header>

      <SectionBlock label="El Problema">{project.problem}</SectionBlock>
      <SectionBlock label="Solución de Ingeniería" accent>
        {project.solution}
      </SectionBlock>

      {!technicalMode && (
        <button
          type="button"
          onClick={onToggleLayer2}
          aria-expanded={showLayer2}
          aria-controls={layer2Id}
          className={disclosureButtonClass}
        >
          <ChevronDown className={chevronClass(showLayer2)} aria-hidden="true" />
          Ver arquitectura y QA Gate
        </button>
      )}

      <div id={layer2Id}>
        {showLayer2 && (
          <motion.div
            variants={revealVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                Pipeline de Arquitectura
              </p>
              <PipelineDiagram
                title={project.title}
                pipeline={project.pipeline}
              />
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4">
              <ShieldCheck
                className="mt-0.5 size-5 shrink-0 text-emerald-600 dark:text-brand-secondary"
                aria-hidden="true"
              />
              <div className="flex flex-col gap-0.5">
                <p className="text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-brand-secondary">
                  QA Gate
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  {project.qaGate}
                </p>
              </div>
            </div>

            <ul className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[0.7rem] font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300"
                >
                  {tech}
                </li>
              ))}
            </ul>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-brand-primary/50 hover:text-brand-primary dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200"
              >
                <GithubGlyph className="size-4" aria-hidden="true" />
                Ver Código en GitHub
              </a>
            )}

            {relatedCaseCount > 0 && (
              <a
                href="#qa"
                onClick={() => focusQaGroup(project.id)}
                className="inline-flex w-fit items-center gap-1.5 text-xs font-medium text-sky-700 transition-colors hover:text-brand-primary dark:text-brand-primary"
              >
                <FlaskConical className="size-3.5" aria-hidden="true" />
                Pruebas relacionadas: {relatedCaseCount} casos → Ver en QA Showcase
              </a>
            )}
          </motion.div>
        )}
      </div>
    </article>
  )
}

function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('featured')
  const [technicalMode, setTechnicalMode] = useState(false)
  const [expandedIds, setExpandedIds] = useState<ReadonlySet<string>>(
    () => new Set<string>(),
  )
  const [openCompactIds, setOpenCompactIds] = useState<ReadonlySet<string>>(
    () => new Set<string>(),
  )
  const [highlightedCardId, setHighlightedCardId] = useState<string | null>(null)

  const gridProjects = useMemo(
    () => projectsForFilter(activeFilter),
    [activeFilter],
  )

  useEffect(() => {
    return onCrossLink(HIGHLIGHT_PROJECT_CARD_EVENT, (projectId) => {
      // La vista "Todos" renderiza cada proyecto como tarjeta completa: garantiza
      // que el destino del salto sea visible sin importar el filtro previo.
      setActiveFilter('all')
      setHighlightedCardId(projectId)
      smoothScrollToId(`project-card-${projectId}`)
      window.setTimeout(() => setHighlightedCardId(null), HIGHLIGHT_MS)
    })
  }, [])

  const toggleLayer2 = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const toggleCompact = (id: string) => {
    setOpenCompactIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <section id="proyectos" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-700 dark:text-brand-primary">
            Engineering Showcase
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Proyectos destacados
          </h2>
          <p className="max-w-2xl text-slate-600 dark:text-slate-400">
            Los 4 casos insignia primero; el resto queda a un clic en la franja
            compacta. Cada tarjeta se lee en dos capas: beneficio y, al abrir,
            arquitectura y QA.
          </p>
        </header>

        <div
          role="group"
          aria-label="Nivel de detalle de los proyectos"
          className="mb-6 inline-flex items-center rounded-full border border-slate-200 bg-white/80 p-1 dark:border-slate-800 dark:bg-brand-card/80"
        >
          <button
            type="button"
            aria-pressed={!technicalMode}
            onClick={() => setTechnicalMode(false)}
            className={technicalMode ? idleModeClass : activeModeClass}
          >
            Modo: Negocio
          </button>
          <button
            type="button"
            aria-pressed={technicalMode}
            onClick={() => setTechnicalMode(true)}
            className={technicalMode ? activeModeClass : idleModeClass}
          >
            Modo: Técnico Completo
          </button>
        </div>

        <div
          role="group"
          aria-label="Filtrar proyectos por dominio"
          className="flex flex-wrap gap-2"
        >
          {DOMAIN_FILTERS.map((filter) => {
            const isActive = filter.id === activeFilter

            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveFilter(filter.id)}
                className={isActive ? activeFilterClass : idleFilterClass}
              >
                {filter.label}
                <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  {countForFilter(filter.id)}
                </span>
              </button>
            )
          })}
        </div>

        <motion.ul
          key={activeFilter}
          className="mt-10 flex flex-col gap-8"
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          {gridProjects.map((project) => (
            <motion.li key={project.id} variants={cardVariants}>
              <ProjectCard
                project={project}
                technicalMode={technicalMode}
                isLayer2Open={expandedIds.has(project.id)}
                isHighlighted={highlightedCardId === project.id}
                onToggleLayer2={() => toggleLayer2(project.id)}
              />
            </motion.li>
          ))}
        </motion.ul>

        {activeFilter === 'featured' && OTHER_PROJECTS.length > 0 && (
          <div
            role="group"
            aria-label={`Otros proyectos y desarrollos (+${OTHER_PROJECTS.length})`}
            className="mt-12 flex flex-col gap-3 border-t border-slate-200 pt-8 dark:border-slate-800"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Otros proyectos y desarrollos (+{OTHER_PROJECTS.length})
            </p>

            <ul className="flex flex-col gap-3">
              {OTHER_PROJECTS.map((project) => {
                const isOpen = openCompactIds.has(project.id)
                const bodyId = `compact-body-${project.id}`

                return (
                  <li key={project.id}>
                    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 px-4 py-3 transition-colors dark:border-slate-800">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                          {project.title}
                        </span>
                        <span className="rounded-full border border-brand-primary/30 bg-brand-primary/10 px-2 py-0.5 text-[0.7rem] font-semibold text-sky-700 dark:text-brand-primary">
                          {project.badge}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleCompact(project.id)}
                        aria-expanded={isOpen}
                        aria-controls={bodyId}
                        className={`${disclosureButtonClass} shrink-0`}
                      >
                        <ChevronDown
                          className={chevronClass(isOpen)}
                          aria-hidden="true"
                        />
                        {isOpen ? 'Ocultar caso' : 'Ver caso completo'}
                      </button>
                    </div>

                    <div id={bodyId}>
                      {isOpen && (
                        <motion.div
                          variants={revealVariants}
                          initial="hidden"
                          animate="visible"
                          className="pt-3"
                        >
                          <ProjectCard
                            project={project}
                            technicalMode={technicalMode}
                            isLayer2Open={expandedIds.has(project.id)}
                            isHighlighted={highlightedCardId === project.id}
                            onToggleLayer2={() => toggleLayer2(project.id)}
                          />
                        </motion.div>
                      )}
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects
