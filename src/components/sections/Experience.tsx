import { motion, type Variants } from 'framer-motion'
import { experiences } from '../../data/portfolioData'

const timelineVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const entryVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

function Experience() {
  return (
    <section id="experiencia" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <header className="mb-14 flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-700 dark:text-brand-primary">
            Trayectoria
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Experiencia empresarial
          </h2>
          <p className="max-w-2xl text-slate-600 dark:text-slate-400">
            Casos de ingeniería con impacto medible en operaciones críticas e
            integración ERP.
          </p>
        </header>

        <motion.ol
          className="relative flex flex-col gap-16 border-l border-slate-200 pl-8 dark:border-slate-800"
          variants={timelineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {experiences.map((exp) => (
            <motion.li key={exp.company} variants={entryVariants} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-8 top-1.5 size-3 -translate-x-1/2 rounded-full border-2 border-brand-primary bg-slate-50 dark:bg-brand-dark"
              />

              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {exp.company}
                  </h3>
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-500">
                    {exp.period}
                  </span>
                </div>
                <p className="text-sm font-semibold text-sky-700 dark:text-brand-primary">
                  {exp.role}
                </p>
                <p className="mt-1 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
                  {exp.summary}
                </p>
              </div>

              {exp.metrics.length > 0 && (
                <ul
                  aria-label={`Métricas de impacto en ${exp.company}`}
                  className="mt-4 flex flex-wrap gap-2"
                >
                  {exp.metrics.map((metric) => (
                    <li
                      key={metric.label}
                      className="flex items-baseline gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5"
                    >
                      <span className="text-sm font-bold text-emerald-600 dark:text-brand-secondary">
                        {metric.value}
                      </span>
                      <span className="text-xs text-slate-600 dark:text-slate-400">
                        {metric.label}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {exp.cases.map((item) => (
                  <article
                    key={item.title}
                    className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/80 p-5 backdrop-blur-md dark:border-slate-800 dark:bg-brand-card/80"
                  >
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h4>

                    <div className="flex flex-col gap-1">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                        El reto
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {item.challenge}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                        La arquitectura
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {item.solution}
                      </p>
                    </div>

                    <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
                      {item.technologies.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[0.7rem] font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>

              <p className="mt-5 text-xs text-slate-500 dark:text-slate-500">
                <span className="font-semibold uppercase tracking-wide">Stack:</span>{' '}
                {exp.stack.join(' · ')}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}

export default Experience
