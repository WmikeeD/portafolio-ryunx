import type { Experience, HeroData, NavLink, SkillCategory } from '../types'

/** Anclajes de la barra de navegación principal. */
export const navLinks: NavLink[] = [
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'Habilidades', href: '#habilidades' },
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

/** Experiencia empresarial de Mayckol Rodríguez, ordenada de la más reciente a la más antigua. */
export const experiences: Experience[] = [
  {
    company: 'Consultor Independiente & QA',
    role: 'Consultor de Software & QA Specialist',
    period: '2026 - Presente',
    summary:
      'Aseguramiento de calidad y desarrollo de producto para clientes independientes.',
    metrics: [],
    cases: [
      {
        title: 'Aseguramiento de calidad end-to-end',
        challenge:
          'Los clientes necesitaban liberar versiones sin regresiones ni inconsistencias de datos entre servicios.',
        solution:
          'Ejecuté testing funcional, de regresión y pruebas de integración de APIs, con validación de consistencia SQL sobre las bases de datos implicadas.',
        technologies: ['Testing funcional', 'Regresión', 'API Testing', 'SQL'],
      },
      {
        title: 'App financiera nativa en Flutter',
        challenge:
          'Se requería una aplicación financiera nativa con datos disponibles sin conexión.',
        solution:
          'Desarrollé una app nativa en Flutter/Dart con persistencia local, operando bajo un enfoque offline-first.',
        technologies: ['Flutter', 'Dart', 'Persistencia local'],
      },
    ],
    stack: ['Flutter', 'Dart', 'SQL', 'API Testing'],
  },
  {
    company: 'Atika S.A.',
    role: 'Desarrollador Full-Stack',
    period: '2023 - 2026',
    summary:
      'Desarrollo de soluciones internas de logística y retail con integración al ERP corporativo SAP HANA.',
    metrics: [
      { value: '-35%', label: 'carga operativa manual en logística' },
      { value: '-30%', label: 'errores administrativos' },
    ],
    cases: [
      {
        title: 'Digitalización de hojas de ruta',
        challenge:
          'Las hojas de ruta se gestionaban en papel, sin trazabilidad ni sincronización con el ERP corporativo.',
        solution:
          'Digitalicé el flujo completo e integré la captura con SAP HANA, eliminando la doble digitación y habilitando trazabilidad en tiempo real.',
        technologies: ['Vue.js', 'Laravel', 'SAP HANA', 'REST APIs'],
      },
      {
        title: 'Click & Collect con liberación automática de stock',
        challenge:
          'El stock reservado para retiro en tienda no se liberaba de forma fiable, bloqueando inventario disponible para la venta.',
        solution:
          'Implementé un sistema Click & Collect con liberación automática de stock condicionada al ciclo de vida del pedido.',
        technologies: ['Vue.js', 'Laravel', 'MariaDB', 'REST APIs'],
      },
      {
        title: 'Arquitectura transaccional sobre SAP HANA y MariaDB',
        challenge:
          'Operaciones críticas cruzaban SAP HANA y MariaDB sin garantías de consistencia ante fallos parciales.',
        solution:
          'Diseñé una arquitectura transaccional apoyada en Transaction Notification sobre SAP HANA, coordinando la consistencia con MariaDB.',
        technologies: ['SAP HANA', 'MariaDB', 'Java', 'Transaction Notification'],
      },
    ],
    stack: ['Vue.js', 'Laravel', 'Java', 'SAP HANA', 'MariaDB', 'REST APIs'],
  },
]

/** Habilidades técnicas de Mayckol Rodríguez agrupadas por dominio. */
export const skillCategories: SkillCategory[] = [
  {
    category: 'Frontend & Mobile',
    skills: [
      { name: 'React', icon: 'Re' },
      { name: 'Vue.js', icon: 'Vue' },
      { name: 'TypeScript', icon: 'TS' },
      { name: 'Flutter', icon: 'Fl' },
      { name: 'Tailwind CSS', icon: 'Tw' },
    ],
  },
  {
    category: 'Backend & APIs',
    skills: [
      { name: 'Laravel', icon: 'Lv' },
      { name: 'Java', icon: 'Jv' },
      { name: 'REST APIs', icon: 'API' },
    ],
  },
  {
    category: 'Bases de Datos & ERP',
    skills: [
      { name: 'SAP HANA', icon: 'SAP' },
      { name: 'MariaDB', icon: 'Ma' },
      { name: 'SQL', icon: 'SQL' },
    ],
  },
  {
    category: 'QA & Testing',
    skills: [
      { name: 'Vitest', icon: 'Vi' },
      { name: 'React Testing Library', icon: 'RTL' },
      { name: 'Testing de regresión', icon: 'Rg' },
    ],
  },
  {
    category: 'DevOps & AI Tools',
    skills: [
      { name: 'Git', icon: 'Git' },
      { name: 'GitHub Actions', icon: 'CI' },
      { name: 'Claude Code / Agentes IA', icon: 'IA' },
    ],
  },
]
