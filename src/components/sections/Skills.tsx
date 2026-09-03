import { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { skillCategories } from '../../data/portfolioData'

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

const activeTabClass =
  'rounded-full border border-brand-primary bg-brand-primary/10 px-4 py-2 text-sm font-semibold text-sky-700 transition-colors dark:text-brand-primary'

const idleTabClass =
  'rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-600 backdrop-blur-md transition-colors hover:border-brand-primary/50 hover:text-brand-primary dark:border-slate-800 dark:bg-brand-card/80 dark:text-slate-400'

function Skills() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeCategory = skillCategories[activeIndex]

  return (
    <section id="habilidades" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-700 dark:text-brand-primary">
            Stack técnico
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Habilidades
          </h2>
          <p className="max-w-2xl text-slate-600 dark:text-slate-400">
            Herramientas y tecnologías organizadas por dominio de trabajo.
          </p>
        </header>

        <div
          role="tablist"
          aria-label="Categorías de habilidades"
          className="flex flex-wrap gap-2"
        >
          {skillCategories.map((category, index) => {
            const isActive = index === activeIndex

            return (
              <button
                key={category.category}
                type="button"
                role="tab"
                id={`skills-tab-${index}`}
                aria-selected={isActive}
                aria-controls="skills-panel"
                onClick={() => setActiveIndex(index)}
                className={isActive ? activeTabClass : idleTabClass}
              >
                {category.category}
              </button>
            )
          })}
        </div>

        <motion.ul
          key={activeCategory.category}
          id="skills-panel"
          role="tabpanel"
          aria-labelledby={`skills-tab-${activeIndex}`}
          className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          variants={gridVariants}
          initial="hidden"
          animate="visible"
        >
          {activeCategory.skills.map((skill) => (
            <motion.li
              key={skill.name}
              variants={tileVariants}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white/80 px-4 py-3 backdrop-blur-md transition-colors hover:border-brand-primary/40 dark:border-slate-800 dark:bg-brand-card/80"
            >
              <span
                aria-hidden="true"
                className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-xs font-bold text-sky-700 dark:text-brand-primary"
              >
                {skill.icon}
              </span>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {skill.name}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

export default Skills
