import { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { corporateExperience } from '../../data/portfolioData'

const timelineVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const entryVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

function slug(value: string): string {
  return value.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '')
}

function Experience() {
  const [openStacks, setOpenStacks] = useState<ReadonlySet<string>>(
    () => new Set<string>(),
  )

  const toggleStack = (company: string) => {
    setOpenStacks((prev) => {
      const next = new Set(prev)
      if (next.has(company)) {
        next.delete(company)
      } else {
        next.add(company)
      }
      return next
    })
  }

  return (
    <section id="experiencia" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <header className="mb-14 flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-700 dark:text-brand-primary">
            Trayectoria
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Experiencia empresarial
          </h2>
          <p className="max-w-2xl text-slate-600 dark:text-slate-400">
            Timeline corporativo centrado en el impacto ejecutivo: plataformas críticas,
            integración ERP y gobernanza de datos transaccionales.
          </p>
        </header>

        <motion.ol
          className="relative flex flex-col gap-12 border-l border-slate-200 pl-8 dark:border-slate-800"
          variants={timelineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {corporateExperience.map((experience) => {
            const stackOpen = openStacks.has(experience.company)
            const stackId = `experience-stack-${slug(experience.company)}`

            return (
              <motion.li
                key={experience.company}
                variants={entryVariants}
                className="relative"
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-8 top-6 size-3 -translate-x-1/2 rounded-full border-2 border-brand-primary bg-slate-50 dark:bg-brand-dark"
                />

                <article className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white/90 p-6 transition-colors dark:border-slate-800 dark:bg-brand-card/90">
                  <header className="flex flex-col gap-1.5">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {experience.company}
                      </h3>
                      <span className="text-sm font-medium text-slate-500 dark:text-slate-500">
                        {experience.period}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-sky-700 dark:text-brand-primary">
                      {experience.role}
                    </p>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
                      {experience.location}
                    </p>
                  </header>

                  <p className="max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {experience.executiveSummary}
                  </p>

                  <ul
                    aria-label={`Logros clave en ${experience.company}`}
                    className="flex flex-col gap-4"
                  >
                    {experience.achievements.map((achievement) => (
                      <li
                        key={achievement.metric}
                        className="flex flex-col gap-2 sm:flex-row sm:gap-4"
                      >
                        <span className="inline-flex h-fit shrink-0 items-center self-start rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-brand-secondary sm:w-64">
                          {achievement.metric}
                        </span>
                        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                          {achievement.detail}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => toggleStack(experience.company)}
                      aria-expanded={stackOpen}
                      aria-controls={stackId}
                      className="inline-flex w-fit items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400 transition-colors hover:text-brand-primary dark:text-slate-500"
                    >
                      <ChevronDown
                        className={
                          stackOpen
                            ? 'size-3.5 rotate-180 transition-transform'
                            : 'size-3.5 transition-transform'
                        }
                        aria-hidden="true"
                      />
                      Ver tecnologías utilizadas
                    </button>

                    <ul id={stackId} className="flex flex-wrap gap-1.5">
                      {stackOpen &&
                        experience.stack.map((tech) => (
                          <li
                            key={tech}
                            className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[0.7rem] font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300"
                          >
                            {tech}
                          </li>
                        ))}
                    </ul>
                  </div>
                </article>
              </motion.li>
            )
          })}
        </motion.ol>
      </div>
    </section>
  )
}

export default Experience
