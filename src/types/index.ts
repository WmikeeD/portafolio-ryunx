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
