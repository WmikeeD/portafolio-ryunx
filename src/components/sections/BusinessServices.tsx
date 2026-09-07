import type { ComponentType, SVGProps } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Network, ShieldCheck, Workflow } from 'lucide-react'
import { businessServices } from '../../data/portfolioData'

type GlyphComponent = ComponentType<SVGProps<SVGSVGElement>>

/** Registro de glifos disponibles para las tarjetas de servicio. */
const SERVICE_ICONS: Record<string, GlyphComponent> = {
  Workflow,
  Network,
  ShieldCheck,
}

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

function BusinessServices() {
  return (
    <section id="servicios" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-700 dark:text-brand-primary">
            Servicios
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            En qué puedo ayudarte
          </h2>
          <p className="max-w-2xl text-slate-600 dark:text-slate-400">
            Tres frentes de trabajo para que la operación de tu negocio sea más
            rápida, consistente y estable.
          </p>
        </header>

        <motion.ul
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {businessServices.map((service) => {
            const Icon = SERVICE_ICONS[service.icon] ?? Workflow

            return (
              <motion.li
                key={service.id}
                variants={cardVariants}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 transition-colors dark:border-slate-800 dark:bg-brand-card/90"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-primary/10 text-sky-700 dark:text-brand-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {service.description}
                </p>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}

export default BusinessServices
