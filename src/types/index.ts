import type { IconType } from 'react-icons'

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

/**
 * Habilidad técnica individual. `Icon` es el logo oficial en SVG
 * (`react-icons/si`); es `null` para conceptos de arquitectura o metodología
 * sin logo de marca, en cuyo caso el badge cae al monograma `initials`.
 */
export interface SkillItem {
  name: string
  /** Monograma corto (2-3 caracteres) usado como fallback sin logo. */
  initials: string
  /** Componente de logo oficial, o `null` para mostrar `initials`. */
  Icon: IconType | null
  /** Color de marca oficial del logo (hex). */
  color: string
}

/** Grupo de habilidades bajo una misma categoría técnica. */
export interface SkillCategory {
  category: SkillCategoryName
  skills: SkillItem[]
}

/** Dominio temático de un proyecto del showcase; `all` es el comodín de filtro. */
export type ProjectCategory =
  | 'all'
  | 'erp-logistics'
  | 'retail'
  | 'mobile'
  | 'bi-data'
  | 'product-eng'
  | 'qa'

/**
 * Categoría seleccionable en la barra de filtros. Suma a los dominios el pill
 * `featured` (Top 4 insignia), que es el filtro activo por defecto.
 */
export type FilterCategory = ProjectCategory | 'featured'

/**
 * Pipeline de arquitectura en cuatro nodos encadenados
 * (Cliente ➔ API ➔ Adapter / Worker ➔ Persistencia / ERP).
 */
export interface ArchitecturePipeline {
  client: string
  api: string
  adapterOrWorker: string
  persistenceOrErp: string
}

/**
 * Caso de ingeniería del showcase bajo el marco Problema ➔ Solución ➔
 * Arquitectura ➔ QA, con dos capas de lectura (negocio y técnica).
 */
export interface ShowcaseProject {
  id: string
  /** Título técnico de referencia (subtítulo discreto en la Capa 1). */
  title: string
  /** Título orientado al beneficio de negocio (titular de la Capa 1). */
  benefitTitle: string
  /** Proyecto insignia: `true` para el Top 4 destacado, `false` para la franja compacta. */
  isFeatured: boolean
  /** Dominios a los que pertenece el proyecto, usados por la barra de filtros. */
  category: ProjectCategory[]
  /** Etiqueta temática corta mostrada como kicker de la tarjeta. */
  badge: string
  /** Origen del proyecto, en términos neutros: "Entorno Empresarial" o "Iniciativa Personal". */
  context: string
  /** Escenario previo y fricción, en lenguaje equilibrado de negocio. */
  problem: string
  /** Decisiones de diseño y arquitectura, en lenguaje equilibrado de negocio. */
  solution: string
  pipeline: ArchitecturePipeline
  /** Criterio de aseguramiento de calidad que blinda el caso. */
  qaGate: string
  /** Stack tecnológico del caso. */
  stack: string[]
  /** Repositorio público del proyecto, si el código es abierto. */
  githubUrl?: string
  /** Demo pública desplegada del proyecto, si existe. */
  demoUrl?: string
}

/** Pilar de servicio de negocio, descrito sin tecnicismos para founders y clientes. */
export interface BusinessService {
  id: string
  title: string
  description: string
  /** Nombre del glifo de `lucide-react` usado como icono de la tarjeta. */
  icon: string
}

/** Clasificación del caso de prueba dentro del QA Showcase. */
export type TestType =
  | 'Unit'
  | 'Integración'
  | 'Concurrencia'
  | 'Seguridad'
  | 'Performance'
  | 'Robustez'
  | 'Sincronización'

/** Estado del ciclo de vida de un caso en la simulación de la suite. */
export type TestStatus = 'PEND' | 'RUNNING' | 'PASS'

/**
 * Caso de prueba de un proyecto del showcase. `proyecto_id` referencia el `id`
 * del proyecto correspondiente en `showcaseProjects`.
 */
export interface TestCase {
  id: string
  proyecto_id: string
  titulo: string
  descripcion: string
  tipo_prueba: TestType
  /** Duración base (ms) del caso; la ejecución genera un delay real 150–900 ms. */
  tiempo_simulado_ms: number
  estado: TestStatus
}

/**
 * Máquina de estados global de la suite de QA.
 * - `IDLE`: estado inicial o posterior a un reseteo (cambio de filtro).
 * - `RUNNING_SUITE`: la suite completa itera proyecto por proyecto en secuencia.
 * - `COMPLETED_SUITE`: todos los proyectos del filtro activo terminaron en verde.
 */
export type GlobalSuiteState = 'IDLE' | 'RUNNING_SUITE' | 'COMPLETED_SUITE'

/**
 * Máquina de estados local de un proyecto dentro de la suite.
 * - `IDLE`: sin ejecutar.
 * - `QUEUED`: en cola tras el proyecto en curso durante una ejecución global.
 * - `RUNNING`: ejecutando sus casos (spinner inline).
 * - `PASSED`: casos finalizados en verde (check estático).
 */
export type ProjectRunState = 'IDLE' | 'QUEUED' | 'RUNNING' | 'PASSED'

/** Mapa de estados de ejecución por `id` de proyecto del showcase. */
export type ProjectRunStateMap = Record<string, ProjectRunState>

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
