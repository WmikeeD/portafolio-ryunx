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

/** Logro corporativo estructurado: métrica de impacto y su detalle explicativo. */
export interface CorporateAchievement {
  /** Titular de impacto mostrado como badge esmeralda (p. ej. "-35% Tiempos de Despacho"). */
  metric: string
  /** Explicación del logro: qué se hizo y cómo se consiguió el impacto. */
  detail: string
}

/** Hito de experiencia profesional dentro del timeline corporativo. */
export interface CorporateExperience {
  role: string
  company: string
  /** Periodo de la colaboración, p. ej. "Diciembre 2023 – Julio 2026". */
  period: string
  location: string
  /** Resumen ejecutivo de la responsabilidad y el alcance del rol. */
  executiveSummary: string
  /** Logros cuantificados con métrica y detalle. */
  achievements: CorporateAchievement[]
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

/**
 * Flujo de arquitectura resumido de un proyecto, en cuatro etapas encadenadas
 * (Cliente ➔ API ➔ Persistencia/ERP ➔ QA Gate) para el minidiagrama en pipeline.
 */
export interface ArchitectureFlow {
  frontend: string
  backend: string
  databaseOrErp: string
  qaCheck: string
}

/** Proyecto destacado del portafolio con su minidiagrama de arquitectura. */
export interface Project {
  id: string
  title: string
  /** Etiqueta corta de dominio mostrada como kicker de la tarjeta. */
  badge: string
  summary: string
  architecture: ArchitectureFlow
  /** Métrica de negocio destacada en un badge esmeralda. */
  impactMetric: string
  stack: string[]
  githubUrl?: string
  demoUrl?: string
  /** Puntos técnicos clave del proyecto. */
  highlights: string[]
}

/** Estado del ciclo de vida de un caso de prueba en el showcase de QA. */
export type TestStatus = 'idle' | 'running' | 'passed' | 'failed'

/** Resultado de un caso de prueba individual dentro del showcase de QA. */
export interface TestCaseResult {
  id: string
  suite: string
  testName: string
  status: TestStatus
  durationMs: number
  assertion: string
}

/** Resumen agregado de una ejecución completa de la suite de pruebas. */
export interface TestRunSummary {
  totalTests: number
  passed: number
  coverage: string
  executionTime: string
}

/** Datos de contacto directo mostrados en la columna informativa de la sección. */
export interface ContactDetails {
  email: string
  /** Teléfono en formato legible para mostrar. */
  phone: string
  /** Teléfono en formato E.164 para el enlace `tel:`. */
  phoneHref: string
  location: string
  linkedinUrl: string
  githubUrl: string
  /** Frase de disponibilidad profesional. */
  availability: string
}
