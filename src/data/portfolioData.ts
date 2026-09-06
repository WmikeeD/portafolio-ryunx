import type {
  ContactDetails,
  CorporateExperience,
  HeroData,
  NavLink,
  Project,
  SkillCategory,
  TestCaseResult,
  TestRunSummary,
} from '../types'

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
      href: 'https://www.linkedin.com/in/mayckol-sanchez-a32624122',
      icon: 'linkedin',
    },
    { label: 'Correo', href: 'mailto:mayckol10r.s@gmail.com', icon: 'mail' },
  ],
}

/**
 * Experiencia profesional de Mayckol Rodríguez como timeline corporativo,
 * centrada en el impacto ejecutivo y sin duplicar el detalle de Proyectos.
 */
export const corporateExperience: CorporateExperience[] = [
  {
    role: 'Consultor de Software y QA Independiente',
    company: 'Servicios Profesionales / Freelance',
    period: 'Julio 2026 – Presente',
    location: 'Santiago, Chile',
    executiveSummary:
      'Servicios especializados de arquitectura, aseguramiento de calidad (QA) y desarrollo para soluciones web y móviles con foco en resiliencia, cobertura de testing y consistencia lógica.',
    achievements: [
      {
        metric: 'Cobertura & Confiabilidad',
        detail:
          'Diseño y ejecución de estrategias de prueba end-to-end: matrices funcionales, testing de regresión, validación de endpoints REST y consistencia transaccional con SQL.',
      },
      {
        metric: 'Arquitectura Offline-First',
        detail:
          'Desarrollo de aplicaciones móviles financieras nativas con Flutter y Dart, aplicando Clean Architecture, patrones de gestión de estado y persistencia local de alta fidelidad.',
      },
    ],
    stack: [
      'QA Automation',
      'Flutter / Dart',
      'Postman',
      'SQL Validation',
      'Clean Architecture',
    ],
  },
  {
    role: 'Desarrollador de Software y Especialista Técnico Full-Stack',
    company: 'Atika S.A.',
    period: 'Diciembre 2023 – Julio 2026',
    location: 'Santiago, Chile',
    executiveSummary:
      'Liderazgo en el diseño, desarrollo y estabilización de plataformas corporativas críticas integradas al núcleo ERP SAP HANA, impulsando la transformación digital operativa y la gobernanza de datos transaccionales en logística y retail.',
    achievements: [
      {
        metric: '-35% Tiempos de Despacho',
        detail:
          'Transformación digital de la cadena logística mediante la sincronización en tiempo real entre operaciones de campo y SAP HANA, eliminando el uso de planillas manuales y la doble digitación.',
      },
      {
        metric: '-30% Brechas de Inventario',
        detail:
          'Optimización de los flujos de retail y omnicanalidad, asegurando la consistencia del stock distribuido y la conciliación automática de devoluciones entre sucursales y ERP central.',
      },
      {
        metric: 'Consistencia ACID',
        detail:
          'Implementación de reglas de validación transaccional sobre el ERP (SAP HANA Transaction Notification) y bases de datos periféricas, blindando compras críticas contra datos corruptos.',
      },
      {
        metric: 'Productividad & IA',
        detail:
          'Modernización de procesos internos de soporte y optimización del ciclo de vida del software mediante la integración de agentes de IA en flujos de desarrollo y troubleshooting técnico.',
      },
    ],
    stack: ['SAP HANA', 'Laravel', 'Vue.js', 'React','Java', 'MariaDB', 'REST APIs'],
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

/** Proyectos destacados de Mayckol Rodríguez, cada uno con su flujo de arquitectura. */
export const featuredProjects: Project[] = [
  {
    id: 'logistica-erp-sync',
    title: 'Plataforma de Digitalización Logística & ERP Sync',
    badge: 'Logística · ERP',
    summary:
      'Digitalización de hojas de ruta con sincronización transaccional al ERP corporativo y trazabilidad en tiempo real.',
    architecture: {
      frontend: 'Vue.js 3',
      backend: 'Laravel API REST',
      databaseOrErp: 'SAP HANA DB (Transaction Notification)',
      qaCheck: 'Testing de integración de endpoints + consistencia SQL',
    },
    impactMetric:
      'Reducción del 35% en carga operativa manual y trazabilidad en tiempo real.',
    stack: ['Vue.js', 'Laravel', 'SAP HANA', 'MariaDB', 'REST APIs', 'Postman'],
    highlights: [
      'Integración con SAP HANA vía Transaction Notification para garantizar consistencia.',
      'Eliminación de la doble digitación entre la operación de campo y el ERP.',
      'Trazabilidad de hojas de ruta disponible en tiempo real.',
    ],
  },
  {
    id: 'motor-stock-omnicanal',
    title: 'Motor Transaccional de Stock & Omnicanalidad (Click & Collect)',
    badge: 'Omnicanalidad · Retail',
    summary:
      'Motor de stock para Click & Collect con liberación automática y sincronización directa de devoluciones entre canales.',
    architecture: {
      frontend: 'Single Page App',
      backend: 'Microservicios en Java / Laravel',
      databaseOrErp: 'MariaDB + Triggers de Stock',
      qaCheck: 'Pruebas de regresión y concurrencia',
    },
    impactMetric:
      '30% menos incidencias administrativas y sincronización directa de devoluciones.',
    stack: [
      'Java',
      'Laravel',
      'MariaDB',
      'Transaction Triggers',
      'Integration Testing',
    ],
    highlights: [
      'Liberación automática de stock condicionada al ciclo de vida del pedido.',
      'Triggers de stock en MariaDB para mantener consistencia bajo concurrencia.',
      'Sincronización directa de devoluciones entre los canales de venta.',
    ],
  },
  {
    id: 'app-financiera-flutter',
    title: 'App Móvil Financiera con Persistencia Local',
    badge: 'Mobile · Fintech',
    summary:
      'Aplicación financiera offline-first en Flutter con estado predecible y arquitectura limpia.',
    architecture: {
      frontend: 'UI Flutter/Dart',
      backend: 'BLoC/Provider State Management',
      databaseOrErp: 'Persistencia local SQLite/Hive',
      qaCheck: 'Pruebas unitarias de lógica contable',
    },
    impactMetric:
      'Control de finanzas offline-first con sincronización segura y arquitectura limpia.',
    stack: ['Flutter', 'Dart', 'SQLite', 'Clean Architecture', 'Unit Testing'],
    highlights: [
      'Persistencia local con SQLite/Hive para operar sin conexión.',
      'Gestión de estado con BLoC/Provider para una lógica contable predecible.',
      'Capas desacopladas siguiendo Clean Architecture.',
    ],
  },
]

/**
 * Casos de prueba representativos del trabajo de QA de Mayckol, usados por el
 * showcase interactivo. Todos arrancan en estado `idle`.
 */
export const qaTestCases: TestCaseResult[] = [
  {
    id: 'hana-transaction-notification',
    suite: 'Integración SAP HANA',
    testName: 'Valida Transaction Notification en pedidos bloqueados',
    status: 'idle',
    durationMs: 312,
    assertion:
      'El pedido bloqueado dispara la notificación y revierte el stock reservado.',
  },
  {
    id: 'hana-header-detail-rollback',
    suite: 'Integración SAP HANA',
    testName: 'Concilia cabecera y detalle tras un rollback de HANA',
    status: 'idle',
    durationMs: 268,
    assertion: 'Cabecera y líneas quedan consistentes ante un fallo parcial.',
  },
  {
    id: 'stock-concurrent-return',
    suite: 'Stock Click & Collect',
    testName: 'Mantiene la consistencia de stock ante devolución concurrente',
    status: 'idle',
    durationMs: 401,
    assertion: 'Dos devoluciones simultáneas nunca dejan el stock en negativo.',
  },
  {
    id: 'stock-reservation-expiry',
    suite: 'Stock Click & Collect',
    testName: 'Libera la reserva cuando expira el pedido de retiro',
    status: 'idle',
    durationMs: 224,
    assertion: 'El stock reservado vuelve a disponible al caducar la orden.',
  },
  {
    id: 'auth-payload-sanitization',
    suite: 'REST API Auth',
    testName: 'Sanitiza el payload de entrada',
    status: 'idle',
    durationMs: 143,
    assertion: 'Los campos con HTML o SQL embebido se rechazan con HTTP 422.',
  },
  {
    id: 'auth-jwt-validation',
    suite: 'REST API Auth',
    testName: 'Rechaza tokens JWT expirados o manipulados',
    status: 'idle',
    durationMs: 118,
    assertion: 'Un token con firma inválida responde HTTP 401.',
  },
  {
    id: 'finance-ledger-balance',
    suite: 'Finanzas Flutter',
    testName: 'Calcula balances contables acumulados',
    status: 'idle',
    durationMs: 96,
    assertion: 'El balance final coincide con la suma firmada de los movimientos.',
  },
  {
    id: 'finance-sqlite-persistence',
    suite: 'Finanzas Flutter',
    testName: 'Persiste y recupera movimientos en SQLite local',
    status: 'idle',
    durationMs: 132,
    assertion: 'Los movimientos sobreviven a un reinicio en frío de la app.',
  },
]

/** Resumen objetivo de una ejecución verde de la suite de QA. */
export const qaRunSummary: TestRunSummary = {
  totalTests: qaTestCases.length,
  passed: qaTestCases.length,
  coverage: '94.8%',
  executionTime: '1.84s',
}

/** Canales de contacto directo de Mayckol Rodríguez. */
export const contactInfo: ContactDetails = {
  email: 'mayckol10r.s@gmail.com',
  phone: '+56 9 50571303',
  phoneHref: '+56950571303',
  location: 'Santiago, Chile',
  linkedinUrl: 'https://www.linkedin.com/in/mayckol-sanchez-a32624122',
  githubUrl: 'https://github.com/WmikeeD',
  availability: 'Disponible para roles Full-Stack y QA Lead.',
}
