import { motion, type Variants } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import { heroData } from '../../data/portfolioData'
import { SocialLinks } from '../interactive/SocialLinks'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, delayChildren: 0.15, staggerChildren: 0.12 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

function Hero() {
  const { name, role, valueProposition, metrics, ctas, socials } = heroData

  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24 pb-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 size-96 -translate-x-1/2 rounded-full bg-brand-primary/20 blur-3xl"
      />

      <motion.div
        className="mx-auto flex w-full max-w-3xl flex-col items-start gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={itemVariants}
          className="rounded-full border border-brand-primary/30 bg-brand-primary/10 px-4 py-1 text-sm font-medium text-sky-700 dark:text-brand-primary"
        >
          {role}
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white"
        >
          {name}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="max-w-2xl text-lg text-slate-600 sm:text-xl dark:text-slate-400"
        >
          {valueProposition}
        </motion.p>

        <motion.ul
          variants={itemVariants}
          aria-label="Métricas destacadas"
          className="flex flex-wrap gap-3"
        >
          {metrics.map((metric) => (
            <li
              key={metric.label}
              className="flex items-baseline gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-2 backdrop-blur-md dark:border-slate-800 dark:bg-brand-card/80"
            >
              <span className="text-lg font-bold text-emerald-600 dark:text-brand-secondary">
                {metric.value}
              </span>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {metric.label}
              </span>
            </li>
          ))}
        </motion.ul>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center gap-4"
        >
          <a
            href={ctas.primary.href}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-5 py-3 text-sm font-semibold text-brand-dark transition-transform hover:-translate-y-0.5"
          >
            {ctas.primary.label}
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
          <a
            href={ctas.secondary.href}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:border-brand-primary hover:text-brand-primary dark:border-slate-800 dark:text-slate-100"
          >
            <Mail className="size-4" aria-hidden="true" />
            {ctas.secondary.label}
          </a>
        </motion.div>

        <motion.div variants={itemVariants}>
          <SocialLinks links={socials} className="flex items-center gap-3 pt-2" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
