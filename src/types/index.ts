/** Enlace de navegación por anclaje dentro de la landing. */
export interface NavLink {
  label: string
  href: string
}

/** Perfil social o canal de contacto mostrado en el Hero. */
export interface SocialLink {
  label: string
  href: string
  icon: 'github' | 'linkedin' | 'mail'
}

/** Métrica de impacto destacada como badge. */
export interface HeroMetric {
  value: string
  label: string
}

/** Llamada a la acción del Hero. */
export interface HeroCta {
  label: string
  href: string
}

/** Contenido íntegro de la sección principal (Hero). */
export interface HeroData {
  name: string
  role: string
  valueProposition: string
  metrics: HeroMetric[]
  ctas: {
    primary: HeroCta
    secondary: HeroCta
  }
  socials: SocialLink[]
}

/** Métrica de impacto cuantificable destacada como badge dentro de una experiencia. */
export interface ImpactMetric {
  value: string
  label: string
}

/** Caso de ingeniería concreto: reto de negocio y arquitectura de la solución. */
export interface ExperienceCase {
  title: string
  /** Descripción técnica del problema de negocio a resolver. */
  challenge: string
  /** Solución implementada y decisiones de arquitectura relevantes. */
  solution: string
  /** Tecnologías empleadas específicamente en este caso. */
  technologies: string[]
}

/** Experiencia profesional en una empresa u organización. */
export interface Experience {
  company: string
  role: string
  /** Periodo de la colaboración, p. ej. "2023 - 2026". */
  period: string
  /** Resumen ejecutivo de la responsabilidad principal. */
  summary: string
  /** Métricas de impacto cuantificable; puede estar vacío. */
  metrics: ImpactMetric[]
  /** Casos de ingeniería representativos. */
  cases: ExperienceCase[]
  /** Stack tecnológico transversal de la experiencia. */
  stack: string[]
}

/** Nombre canónico de una categoría de habilidades técnicas. */
export type SkillCategoryName =
  | 'Frontend & Mobile'
  | 'Backend & APIs'
  | 'Bases de Datos & ERP'
  | 'QA & Testing'
  | 'DevOps & AI Tools'

/** Habilidad técnica individual con su glifo identificativo. */
export interface Skill {
  name: string
  /** Monograma corto (2-3 caracteres) usado como icono textual. */
  icon: string
}

/** Grupo de habilidades bajo una misma categoría técnica. */
export interface SkillCategory {
  category: SkillCategoryName
  skills: Skill[]
}
