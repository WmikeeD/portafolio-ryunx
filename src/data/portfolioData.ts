import type { HeroData, NavLink } from '../types'

/** Anclajes de la barra de navegación principal. */
export const navLinks: NavLink[] = [
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'QA', href: '#qa' },
  { label: 'Contacto', href: '#contacto' },
]

/** Información profesional de Mayckol Rodríguez Sánchez para el Hero. */
export const heroData: HeroData = {
  name: 'Mayckol Rodríguez Sánchez',
  role: 'Desarrollador Full-Stack & QA Specialist',
  valueProposition:
    'Especialista en fiabilidad de sistemas críticos, integración ERP (SAP HANA) y calidad de software automatizada',
  metrics: [
    { value: '-35%', label: 'carga operativa en Atika' },
    { value: '-30%', label: 'errores administrativos' },
  ],
  ctas: {
    primary: { label: 'Explorar Casos', href: '#proyectos' },
    secondary: { label: 'Contactar', href: '#contacto' },
  },
  socials: [
    { label: 'GitHub', href: 'https://github.com/WmikeeD', icon: 'github' },
    {
      label: 'LinkedIn',
      // TODO(mayckol): confirmar el slug real del perfil de LinkedIn.
      href: 'https://www.linkedin.com/in/mayckol-rodriguez-sanchez',
      icon: 'linkedin',
    },
    { label: 'Correo', href: 'mailto:mayckol10r.s@gmail.com', icon: 'mail' },
  ],
}
