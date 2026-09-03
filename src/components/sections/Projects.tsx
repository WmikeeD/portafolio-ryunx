import type { ComponentType, SVGProps } from 'react'
import { motion, type Variants } from 'framer-motion'
import {
  ArrowRight,
  Check,
  Database,
  ExternalLink,
  Layers,
  Server,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react'
import { featuredProjects } from '../../data/portfolioData'
import type { ArchitectureFlow } from '../../types'

type GlyphComponent = ComponentType<SVGProps<SVGSVGElement>>

interface FlowStage {
  key: keyof ArchitectureFlow
  label: string
  Icon: GlyphComponent
}

/** Etapas del pipeline: Cliente ➔ API ➔ Persistencia/ERP ➔ QA Gate. */
const FLOW_STAGES: readonly FlowStage[] = [
  { key: 'frontend', label: 'Cliente', Icon: Layers },
  { key: 'backend', label: 'API', Icon: Server },
  { key: 'databaseOrErp', label: 'Persistencia / ERP', Icon: Database },
  { key: 'qaCheck', label: 'QA Gate', Icon: ShieldCheck },
]

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const linkClass =
  'inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 transition-colors hover:text-brand-primary dark:text-brand-primary dark:hover:text-white'

interface ArchitectureDiagramProps {
  title: string
  architecture: ArchitectureFlow
}

function ArchitectureDiagram({ title, architecture }: ArchitectureDiagramProps) {
  return (
    <ol
      aria-label={`Flujo de arquitectura de ${title}`}
      className="flex flex-col gap-3 md:flex-row md:items-stretch"
    >
      {FLOW_STAGES.map((stage, index) => {
        const isLast = index === FLOW_STAGES.length - 1
        const { Icon } = stage

        return (
          <li
            key={stage.key}
            className="flex flex-1 flex-col items-stretch gap-3 md:flex-row md:items-center"
          >
            <div className="flex-1 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/50">
              <p className="flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-wider text-sky-700 dark:text-brand-primary">
                <Icon className="size-3.5" aria-hidden="true" />
                {stage.label}
              </p>
              <p className="mt-1 text-xs font-medium text-slate-700 dark:text-slate-300">
                {architecture[stage.key]}
              </p>
            </div>

            {!isLast && (
              <span
                aria-hidden="true"
                className="flex shrink-0 items-center justify-center self-center text-slate-400 dark:text-slate-600"
              >
                <ArrowRight className="size-4 rotate-90 md:rotate-0" />
              </span>
            )}
          </li>
        )
      })}
    </ol>
  )
}

function Projects() {
  return (
    <section id="proyectos" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <header className="mb-14 flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-700 dark:text-brand-primary">
            Portafolio
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Proyectos destacados
          </h2>
          <p className="max-w-2xl text-slate-600 dark:text-slate-400">
            Cada proyecto incluye su flujo de arquitectura de extremo a extremo, del
            cliente al QA gate.
          </p>
        </header>

        <motion.ul
          className="flex flex-col gap-8"
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {featuredProjects.map((project) => (
            <motion.li key={project.id} variants={cardVariants}>
              <article className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 transition-colors dark:border-slate-800 dark:bg-brand-card/90">
                <header className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-brand-primary/30 bg-brand-primary/10 px-3 py-1 text-xs font-semibold text-sky-700 dark:text-brand-primary">
                      {project.badge}
                    </span>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className={linkClass}
                      >
                        <ExternalLink className="size-3.5" aria-hidden="true" />
                        Repositorio
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className={linkClass}
                      >
                        <ExternalLink className="size-3.5" aria-hidden="true" />
                        Demo
                      </a>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {project.summary}
                  </p>
                </header>

                <p className="flex items-start gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-700 dark:text-brand-secondary">
                  <TrendingUp className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  <span>{project.impactMetric}</span>
                </p>

                <div className="flex flex-col gap-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                    Arquitectura
                  </p>
                  <ArchitectureDiagram
                    title={project.title}
                    architecture={project.architecture}
                  />
                </div>

                <ul className="flex flex-col gap-1.5">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
                    >
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-brand-secondary"
                        aria-hidden="true"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <ul className="mt-auto flex flex-wrap gap-1.5 pt-1">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[0.7rem] font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </article>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

export default Projects
