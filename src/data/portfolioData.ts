import type {
  BusinessService,
  ContactDetails,
  CorporateExperience,
  HeroData,
  NavLink,
  ShowcaseProject,
  SkillCategory,
  TestCase,
} from '../types'

/** Anclajes de la barra de navegación principal. */
export const navLinks: NavLink[] = [
  { label: 'Servicios', href: '#servicios' },
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
    { value: '-35%', label: 'carga operativa' },
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
      href: 'https://www.linkedin.com/in/mayckol-rodriguez-sanchez',
      icon: 'linkedin',
    },
    { label: 'Correo', href: 'mailto:mayckol10r.s@gmail.com', icon: 'mail' },
  ],
}

/**
 * Pilares de servicio para founders y clientes de negocio: qué resuelvo,
 * sin tecnicismos. Es la capa de lectura más superficial del portafolio.
 */
export const businessServices: BusinessService[] = [
  {
    id: 'automatizacion-operativa',
    title: 'Automatización Operativa',
    description:
      'Automatizo procesos manuales y hojas de cálculo que generan errores, demoras y pérdida de tiempo operativo.',
    icon: 'Workflow',
  },
  {
    id: 'integracion-plataformas',
    title: 'Integración de Plataformas',
    description:
      'Conecto tus sistemas centrales (ERP, ventas, inventario) para que operen sincronizados y dejen de trabajar como islas.',
    icon: 'Network',
  },
  {
    id: 'blindaje-calidad-qa',
    title: 'Blindaje de Calidad & QA',
    description:
      'Reviso y aseguro la estabilidad de tu software antes de salir a producción, evitando caídas o fallos que afecten la facturación.',
    icon: 'ShieldCheck',
  },
]

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
        metric: 'Optimización Operativa (-35% tiempos en ruta)',
        detail:
          'Transformación digital de la cadena logística mediante la sincronización en tiempo real entre operaciones de campo y SAP HANA, eliminando el uso de planillas manuales y la doble digitación.',
      },
      {
        metric: 'Control de Inventario (-30% discrepancias de stock)',
        detail:
          'Optimización de los flujos de retail y omnicanalidad, asegurando la consistencia del stock distribuido y la conciliación automática de devoluciones entre sucursales y ERP central.',
      },
      {
        metric: 'Consistencia ACID (cero datos corruptos en transacciones clave)',
        detail:
          'Implementación de reglas de validación transaccional sobre el ERP (SAP HANA Transaction Notification) y bases de datos periféricas, blindando compras críticas contra datos corruptos.',
      },
      {
        metric: 'Productividad & IA (soporte técnico acelerado)',
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
      { name: 'CI/CD', icon: 'CD' },
      { name: 'Claude Code / Agentes IA', icon: 'IA' },
    ],
  },
]

/**
 * Engineering Showcase: los 9 casos de ingeniería de Mayckol Rodríguez bajo el
 * marco Problema ➔ Solución ➔ Arquitectura ➔ QA, ordenados por ranking de
 * prioridad técnica y de negocio. Los 4 primeros (`isFeatured`) son los insignia.
 */
export const showcaseProjects: ShowcaseProject[] = [
  {
    id: 'datalake-bi-dashboard',
    title: 'Datalake, Datawarehouse y Dashboard de Business Intelligence',
    benefitTitle:
      'Visibilidad unificada de ventas y operación en un solo dashboard',
    isFeatured: true,
    category: ['bi-data', 'qa'],
    badge: 'Datos & BI',
    context: 'Entorno Empresarial',
    problem:
      'La información de ventas, operación y logística vivía dispersa en distintos sistemas (ERP corporativo, plataforma de gestión comercial y bases de datos locales), sin ningún punto único de consulta. Esto impedía tener una visión consolidada y en tiempo real del estado del negocio, obligando a cruces manuales de información para obtener reportes básicos.',
    solution:
      'Diseño e implementación de un datalake para centralizar la información proveniente de múltiples fuentes (ERP, sistema comercial y bases de datos locales), seguido de un datawarehouse que estandariza y limpia esa información bajo un modelo consistente. Sobre esa base se conectó una herramienta de Business Intelligence para dashboards ejecutivos, y se desarrolló además una aplicación web propia de análisis de ventas y KPIs, consumiendo el datawarehouse mediante una API construida en Python.',
    pipeline: {
      client: 'Dashboard web (Vue.js 2) & Dashboards BI',
      api: 'API REST en Python (Flask)',
      adapterOrWorker: 'Datalake (Ingesta) + Datawarehouse (Limpieza/ETL)',
      persistenceOrErp: 'ERP corporativo, sistema comercial y BDs locales',
    },
    qaGate:
      'Validación de consistencia entre las fuentes de origen y el datawarehouse, y pruebas de integridad de los indicadores calculados frente a los datos consolidados.',
    stack: [
      'Vue.js 2',
      'Python (Flask)',
      'API REST',
      'Datawarehouse',
      'Business Intelligence',
      'ETL',
      'SQL',
    ],
  },
  {
    id: 'logistica-erp-sync',
    title: 'Plataforma de Digitalización Logística & ERP Sync',
    benefitTitle: 'Digitalización y control de despachos en tiempo real',
    isFeatured: true,
    category: ['erp-logistics', 'qa'],
    badge: 'Logística & ERP',
    context: 'Entorno Empresarial',
    problem:
      'Despachos generados manualmente mediante planillas Excel con búsquedas guía a guía sobre SAP B1, lo que provocaba alta latencia por lecturas no optimizadas y errores al consolidar cargas en rutas multi-bodega.',
    solution:
      'Plataforma en Vue.js 2 (Vuetify) con buscador reactivo para asignación de transportistas, bodegas y guías. Desacoplamiento del ciclo de vida de la ruta en MariaDB mediante API Laravel, consumiendo SAP HANA mediante un Adapter nativo en Java con vistas SQL indexadas.',
    pipeline: {
      client: 'Vue 2 / Vuetify (Debounce)',
      api: 'Laravel REST API',
      adapterOrWorker: 'Java Adapter (JDBC Native)',
      persistenceOrErp: 'SAP HANA (Vistas) & MariaDB',
    },
    qaGate:
      'Pruebas de integración de endpoints (Postman) y aserciones de consistencia relacional entre vistas HANA y tablas locales.',
    stack: ['Vue.js 2', 'Laravel', 'Java Adapter', 'SAP HANA', 'MariaDB', 'Postman'],
  },
  {
    id: 'motor-optimizacion-liberacion-stock',
    title: 'Motor de Optimización y Liberación de Stock Diferido',
    benefitTitle:
      'Prevención de pérdidas de venta por stock bloqueado sin necesidad',
    isFeatured: true,
    category: ['retail', 'qa'],
    badge: 'Gestión de Stock',
    context: 'Entorno Empresarial',
    problem:
      'Congelamiento prolongado de stock en pedidos de gran volumen con entrega a fechas lejanas, lo que restringe el inventario disponible y causa pérdida de ventas por falta de producto físico en bodega.',
    solution:
      'Interfaz SPA con alertas visuales de vencimiento de reservas y acciones de liberación individual o masiva (batch). La lógica de validación de pedidos y stock opera directamente contra el core de SAP HANA a través de una API REST de alto rendimiento en Java.',
    pipeline: {
      client: 'Responsive SPA (Batch Actions)',
      api: 'Java REST Service',
      adapterOrWorker: 'Direct JDBC Layer',
      persistenceOrErp: 'SAP HANA Core Logic & Stock',
    },
    qaGate:
      'Pruebas de integración y validación transaccional sobre el cálculo de stock disponible en SAP HANA durante liberaciones masivas.',
    stack: ['JavaScript SPA', 'Java REST API', 'SAP HANA Core', 'Transaction Validation'],
  },
  {
    id: 'app-movil-financiera-offline',
    title: 'App Móvil Financiera con Ingestión Inteligente',
    benefitTitle: 'Gestión de finanzas personales asistida y funcional sin internet',
    isFeatured: true,
    category: ['mobile', 'qa'],
    badge: 'Proyecto Personal / Mobile',
    context: 'Iniciativa Personal',
    problem:
      'Pérdida de continuidad en el registro financiero diario por interfaces complejas, falta de conectividad móvil y entrada manual tediosa de compras.',
    solution:
      'Aplicación móvil en Flutter aplicando Clean Architecture con ingesta asistida de gastos mediante escaneo OCR de comprobantes y lectura de notificaciones push bancarias. Persistencia local en SQLite con sincronización en la nube mediante Supabase.',
    pipeline: {
      client: 'Flutter Client (OCR / Push)',
      api: 'BLoC State Management',
      adapterOrWorker: 'Local Encrypted SQLite Store',
      persistenceOrErp: 'Supabase Cloud (Edge Sync)',
    },
    qaGate:
      'Pruebas unitarias de cálculo contable en Dart, cobertura de eventos BLoC y resolución de conflictos offline.',
    stack: ['Flutter', 'Dart', 'Clean Architecture', 'SQLite', 'Supabase', 'Unit Testing'],
    githubUrl: 'https://github.com/WmikeeD/flutter-personal-finance',
  },
  {
    id: 'retiro-tienda-click-collect',
    title: 'Sistema Transaccional de Retiro en Tienda (Click & Collect)',
    benefitTitle:
      'Retiro en tienda (Click & Collect) con retorno automático de stock no retirado',
    isFeatured: false,
    category: ['retail', 'qa'],
    badge: 'Retail & Omnicanal',
    context: 'Entorno Empresarial',
    problem:
      'Falta de trazabilidad en pedidos enviados desde bodega a tiendas físicas, con acumulación de paquetes no reclamados y desajustes de stock entre sucursales y la central.',
    solution:
      'Sistema de Click & Collect con reglas de admisibilidad (peso, volumen, formato). Detecta despachos en tránsito, permite recepción con impresión de etiquetas de almacenaje, notifica al comprador vía correo y ejecuta reversa automática a reserva en SAP B1 ante pedidos caducados.',
    pipeline: {
      client: 'Store Reception Web',
      api: 'Criteria Gatekeeper (Laravel)',
      adapterOrWorker: 'Event Broker (Mail & Print)',
      persistenceOrErp: 'SAP B1 (Stock Reversal) & MariaDB',
    },
    qaGate:
      'Pruebas de flujo completo de caducidad con reversa transaccional hacia reserva en SAP B1.',
    stack: ['Click & Collect Engine', 'Laravel', 'SAP B1', 'Label Automation', 'MariaDB'],
  },
  {
    id: 'calendarizacion-entregas-multifecha',
    title: 'Calendarización de Entregas Multi-Fecha & Gestión de Direcciones',
    benefitTitle:
      'Flexibilidad para fraccionar despachos masivos en múltiples fechas',
    isFeatured: false,
    category: ['erp-logistics', 'qa'],
    badge: 'Planificación Logística',
    context: 'Entorno Empresarial',
    problem:
      'Rigidez estructural en SAP B1 al recibir órdenes mayoristas que requieren despachos diferidos en distintas fechas y lugares, obligando a duplicar órdenes o intervenir documentos a mano.',
    solution:
      'Aplicación web de calendarización que permite fraccionar pedidos en múltiples despachos y dar de alta nuevas direcciones en el socio de negocio. Se comunica mediante un worker Java DI para emitir documentos de picking independientes en SAP B1.',
    pipeline: {
      client: 'Calendar Grid Web',
      api: 'Split Planner Engine (Laravel)',
      adapterOrWorker: 'Java DI Worker',
      persistenceOrErp: 'SAP B1 (Picking & Address Master)',
    },
    qaGate:
      'Pruebas de consistencia relacional entre cantidades fraccionadas y orden matriz en SAP B1.',
    stack: ['Vue.js / Web Grid', 'Laravel', 'Java DI API', 'SAP B1', 'Data Integrity'],
  },
  {
    id: 'gobernanza-alta-proveedores',
    title: 'Gobernanza & Alta de Proveedores Multi-Etapa',
    benefitTitle: 'Onboarding ordenado y seguro para registro de terceros',
    isFeatured: false,
    category: ['erp-logistics', 'qa'],
    badge: 'Gobernanza & Compliance',
    context: 'Entorno Empresarial',
    problem:
      'Onboarding desarticulado de proveedores nacionales e internacionales vía correo, con alto riesgo de manipulación indebida de cuentas bancarias y datos tributarios antes de impactar el maestro de SAP B1.',
    solution:
      'Portal con máquina de estados de aprobación jerárquica (Jefatura -> Contabilidad) gestionado por API Laravel sobre MariaDB. La inserción definitiva en SAP B1 se desacopla mediante un worker listener en Java.',
    pipeline: {
      client: 'Multi-Step Form (Sensitive Val)',
      api: 'Approval State Machine (Laravel)',
      adapterOrWorker: 'Java Sync Listener Worker',
      persistenceOrErp: 'SAP B1 (DI API) & MariaDB',
    },
    qaGate:
      'Sanitización estricta de inputs tributarios/bancarios y pruebas de idempotencia para prevenir duplicidad de proveedores en SAP B1.',
    stack: ['State Machine', 'Laravel', 'Java Worker', 'SAP B1', 'Security / XSS', 'MariaDB'],
  },
  {
    id: 'trazabilidad-control-acceso-bodegas',
    title: 'Sistema de Trazabilidad & Control de Acceso Bodegas',
    benefitTitle: 'Trazabilidad y registro continuo de mercadería en bodega',
    isFeatured: false,
    category: ['erp-logistics', 'mobile', 'qa'],
    badge: 'Control de Acceso',
    context: 'Entorno Empresarial',
    problem:
      'Registro manual en bitácoras físicas de accesos y salidas de personal, contratistas y transportistas, imposibilitando auditar tiempos de permanencia o validar que las cargas egresadas correspondieran a una guía u hoja de ruta autorizada.',
    solution:
      'Aplicación móvil híbrida con escáner de códigos para registro de salidas según identificador de guía/ruta y bodega emisora, habilitando seguimiento de devoluciones y reingresos a stock con backend Laravel y triggers de auditoría en MariaDB.',
    pipeline: {
      client: 'Hybrid Mobile (Scanner)',
      api: 'Laravel Auth & Gatekeeper',
      adapterOrWorker: 'Audit Triggers (State Events)',
      persistenceOrErp: 'MariaDB Ledger (Audit & Geo)',
    },
    qaGate:
      'Regresión de matrices de autorización RBAC y pruebas de estrés concurrente en horarios punta de garita.',
    stack: ['Hybrid Mobile', 'Laravel', 'MariaDB Triggers', 'Stress Testing', 'RBAC'],
  },
  {
    id: 'portfolio-ci-cd',
    title: 'Portafolio Web con CI/CD y Flujo de Ramas Protegido',
    benefitTitle:
      'Control de calidad y despliegue automatizado de este portafolio',
    isFeatured: false,
    category: ['product-eng', 'qa'],
    badge: 'Meta / Ingeniería de Producto',
    context: 'Iniciativa Personal',
    problem:
      'Un sitio personal que se actualiza constantemente corre el riesgo de romperse en producción si cada cambio se sube directo a la rama principal sin validación previa, además de requerir despliegue manual repetitivo.',
    solution:
      'Flujo de trabajo con rama dev como entorno de validación antes de integrar a producción, y pipeline de integración continua mediante GitHub Actions que automatiza el despliegue a Vercel al fusionar cambios aprobados. Esto permite iterar sobre el contenido y la arquitectura sin riesgo de exponer errores directamente a los visitantes.',
    pipeline: {
      client: 'React + Vite (TypeScript & Tailwind)',
      api: 'Flujo de Ramas Protegido (Git Flow)',
      adapterOrWorker: 'GitHub Actions (Build & Test Gates)',
      persistenceOrErp: 'Vercel Edge Network (Deploy Automático)',
    },
    qaGate:
      'Validación automática de build y tests en GitHub Actions antes de cada despliegue; cambios probados en entorno de validación antes del merge a main.',
    stack: [
      'React',
      'Vite',
      'TypeScript',
      'Tailwind CSS',
      'GitHub Actions',
      'Vercel',
      'Git Flow',
      'Vitest',
    ],
    githubUrl: 'https://github.com/WmikeeD/portafolio-ryunx',
  },
]

/** Cobertura objetivo reportada por el panel de cierre de la suite. */
export const QA_COVERAGE = '94.8%'

/**
 * Casos de prueba del QA Showcase, centralizados por proyecto. `proyecto_id`
 * referencia el `id` del proyecto en `showcaseProjects`. Todos arrancan en
 * estado `PEND`; el motor de simulación genera su delay real por ejecución.
 *
 * Gobernanza: excluido temporalmente el caso "registro de salida sin ingreso
 * previo asociado" (pendiente de confirmar su resultado esperado). El caso
 * transversal de Auth JWT / sanitización de payloads (REST API Auth) queda
 * asociado a `logistica-erp-sync` con tipo_prueba 'Seguridad'.
 */
export const testCases: TestCase[] = [
  // --- datalake-bi-dashboard (insignia) ---
  {
    id: 'dl-source-dwh-consistency',
    proyecto_id: 'datalake-bi-dashboard',
    titulo: 'Consistencia origen ↔ datawarehouse',
    descripcion:
      'Los totales por fuente coinciden con los agregados del datawarehouse tras cada carga ETL.',
    tipo_prueba: 'Integración',
    tiempo_simulado_ms: 420,
    estado: 'PEND',
  },
  {
    id: 'dl-kpi-integrity',
    proyecto_id: 'datalake-bi-dashboard',
    titulo: 'Integridad de los KPIs calculados',
    descripcion:
      'Cada indicador del dashboard cuadra contra los datos consolidados de referencia.',
    tipo_prueba: 'Integración',
    tiempo_simulado_ms: 380,
    estado: 'PEND',
  },
  {
    id: 'dl-etl-idempotency',
    proyecto_id: 'datalake-bi-dashboard',
    titulo: 'Idempotencia de la ingesta ETL',
    descripcion:
      'Reprocesar el mismo lote no duplica filas ni altera los agregados.',
    tipo_prueba: 'Robustez',
    tiempo_simulado_ms: 510,
    estado: 'PEND',
  },
  {
    id: 'dl-incremental-sync',
    proyecto_id: 'datalake-bi-dashboard',
    titulo: 'Sincronización incremental de fuentes',
    descripcion:
      'Solo los registros nuevos o modificados se propagan al datalake.',
    tipo_prueba: 'Sincronización',
    tiempo_simulado_ms: 340,
    estado: 'PEND',
  },
  {
    id: 'dl-heavy-query-perf',
    proyecto_id: 'datalake-bi-dashboard',
    titulo: 'Rendimiento de consultas pesadas',
    descripcion:
      'Las vistas del dashboard responden bajo el umbral aun con 12 meses de historia.',
    tipo_prueba: 'Performance',
    tiempo_simulado_ms: 720,
    estado: 'PEND',
  },
  {
    id: 'dl-source-outage-handling',
    proyecto_id: 'datalake-bi-dashboard',
    titulo: 'Manejo de fuentes vacías o caídas',
    descripcion:
      'Si una fuente no responde, el pipeline continúa y marca el vacío sin romper el tablero.',
    tipo_prueba: 'Robustez',
    tiempo_simulado_ms: 290,
    estado: 'PEND',
  },
  {
    id: 'dl-schema-drift-guard',
    proyecto_id: 'datalake-bi-dashboard',
    titulo: 'Detección de cambios de esquema en origen',
    descripcion:
      'Un cambio de columna en el sistema comercial se detecta antes de contaminar el modelo.',
    tipo_prueba: 'Integración',
    tiempo_simulado_ms: 400,
    estado: 'PEND',
  },

  // --- logistica-erp-sync (insignia) ---
  {
    id: 'log-hana-view-consistency',
    proyecto_id: 'logistica-erp-sync',
    titulo: 'Consistencia relacional vistas HANA ↔ tablas locales',
    descripcion:
      'Las vistas indexadas de SAP HANA cuadran con las tablas de MariaDB tras la sincronización.',
    tipo_prueba: 'Integración',
    tiempo_simulado_ms: 460,
    estado: 'PEND',
  },
  {
    id: 'log-endpoint-contract',
    proyecto_id: 'logistica-erp-sync',
    titulo: 'Contrato de endpoints del ciclo de ruta',
    descripcion:
      'Cada endpoint del ciclo de vida responde con el esquema y los códigos acordados (Postman).',
    tipo_prueba: 'Integración',
    tiempo_simulado_ms: 300,
    estado: 'PEND',
  },
  {
    id: 'log-debounce-search',
    proyecto_id: 'logistica-erp-sync',
    titulo: 'Búsqueda con debounce sin condiciones de carrera',
    descripcion:
      'Escribir rápido en el buscador nunca deja resultados obsoletos en pantalla.',
    tipo_prueba: 'Concurrencia',
    tiempo_simulado_ms: 250,
    estado: 'PEND',
  },
  {
    id: 'log-auth-security',
    proyecto_id: 'logistica-erp-sync',
    titulo: 'Auth JWT y sanitización de payloads (REST API Auth)',
    descripcion:
      'Los tokens JWT expirados o manipulados responden 401; los payloads con HTML o SQL embebido se rechazan con 422 antes de tocar el ERP.',
    tipo_prueba: 'Seguridad',
    tiempo_simulado_ms: 170,
    estado: 'PEND',
  },
  {
    id: 'log-adapter-timeout',
    proyecto_id: 'logistica-erp-sync',
    titulo: 'Timeout controlado del Adapter JDBC',
    descripcion:
      'Si SAP HANA no responde, el Adapter nativo corta y devuelve un error legible sin colgar la API.',
    tipo_prueba: 'Robustez',
    tiempo_simulado_ms: 540,
    estado: 'PEND',
  },
  {
    id: 'log-multibodega-load',
    proyecto_id: 'logistica-erp-sync',
    titulo: 'Consolidación de cargas multi-bodega',
    descripcion:
      'Una ruta que cruza tres bodegas consolida sus guías sin descuadres.',
    tipo_prueba: 'Integración',
    tiempo_simulado_ms: 410,
    estado: 'PEND',
  },
  {
    id: 'log-route-lifecycle-state',
    proyecto_id: 'logistica-erp-sync',
    titulo: 'Máquina de estados del ciclo de ruta',
    descripcion:
      'Una ruta no puede saltar de "creada" a "cerrada" sin pasar por los estados intermedios.',
    tipo_prueba: 'Robustez',
    tiempo_simulado_ms: 320,
    estado: 'PEND',
  },

  // --- motor-optimizacion-liberacion-stock (insignia) ---
  {
    id: 'stk-batch-release-concurrency',
    proyecto_id: 'motor-optimizacion-liberacion-stock',
    titulo: 'Liberación masiva bajo compras simultáneas',
    descripcion:
      'Dos compradores sobre el mismo stock recién liberado nunca dejan el inventario en negativo.',
    tipo_prueba: 'Concurrencia',
    tiempo_simulado_ms: 480,
    estado: 'PEND',
  },
  {
    id: 'stk-hana-available-calc',
    proyecto_id: 'motor-optimizacion-liberacion-stock',
    titulo: 'Cálculo de stock disponible en SAP HANA',
    descripcion:
      'El disponible equivale a físico menos reservado menos comprometido en cada liberación.',
    tipo_prueba: 'Integración',
    tiempo_simulado_ms: 360,
    estado: 'PEND',
  },
  {
    id: 'stk-reservation-expiry',
    proyecto_id: 'motor-optimizacion-liberacion-stock',
    titulo: 'Vencimiento de reservas de largo plazo',
    descripcion:
      'Una reserva a fecha lejana se libera automáticamente al expirar sin intervención manual.',
    tipo_prueba: 'Robustez',
    tiempo_simulado_ms: 300,
    estado: 'PEND',
  },
  {
    id: 'stk-phantom-allocation',
    proyecto_id: 'motor-optimizacion-liberacion-stock',
    titulo: 'Prevención de phantom allocations',
    descripcion:
      'Cancelar un pedido diferido devuelve el stock exacto que había bloqueado, ni más ni menos.',
    tipo_prueba: 'Concurrencia',
    tiempo_simulado_ms: 420,
    estado: 'PEND',
  },
  {
    id: 'stk-alert-threshold',
    proyecto_id: 'motor-optimizacion-liberacion-stock',
    titulo: 'Alertas visuales de vencimiento de reserva',
    descripcion: 'El panel marca en rojo toda reserva a menos de 48 h de caducar.',
    tipo_prueba: 'Unit',
    tiempo_simulado_ms: 150,
    estado: 'PEND',
  },
  {
    id: 'stk-rest-throughput',
    proyecto_id: 'motor-optimizacion-liberacion-stock',
    titulo: 'Throughput de la API REST de alto rendimiento',
    descripcion:
      'La API sostiene ráfagas de liberación sin degradar el tiempo de respuesta.',
    tipo_prueba: 'Performance',
    tiempo_simulado_ms: 690,
    estado: 'PEND',
  },
  {
    id: 'stk-partial-batch-failure',
    proyecto_id: 'motor-optimizacion-liberacion-stock',
    titulo: 'Fallo parcial en un lote de liberación',
    descripcion:
      'Si un ítem del lote falla, el resto se libera y el fallido queda trazado, sin rollback total.',
    tipo_prueba: 'Robustez',
    tiempo_simulado_ms: 380,
    estado: 'PEND',
  },

  // --- app-movil-financiera-offline (insignia) ---
  {
    id: 'fin-ledger-balance',
    proyecto_id: 'app-movil-financiera-offline',
    titulo: 'Balances contables acumulados',
    descripcion:
      'El balance final coincide con la suma firmada de todos los movimientos.',
    tipo_prueba: 'Unit',
    tiempo_simulado_ms: 150,
    estado: 'PEND',
  },
  {
    id: 'fin-sqlite-persistence',
    proyecto_id: 'app-movil-financiera-offline',
    titulo: 'Persistencia local en SQLite',
    descripcion: 'Los movimientos sobreviven a un reinicio en frío de la app.',
    tipo_prueba: 'Robustez',
    tiempo_simulado_ms: 200,
    estado: 'PEND',
  },
  {
    id: 'fin-offline-conflict-resolution',
    proyecto_id: 'app-movil-financiera-offline',
    titulo: 'Resolución de conflictos offline ↔ Supabase',
    descripcion:
      'Ediciones hechas sin conexión y en la nube se reconcilian por marca de tiempo sin perder datos.',
    tipo_prueba: 'Sincronización',
    tiempo_simulado_ms: 520,
    estado: 'PEND',
  },
  {
    id: 'fin-ocr-ingestion',
    proyecto_id: 'app-movil-financiera-offline',
    titulo: 'Ingesta asistida por OCR de comprobantes',
    descripcion:
      'El monto y la fecha leídos del comprobante se validan antes de crear el gasto.',
    tipo_prueba: 'Robustez',
    tiempo_simulado_ms: 340,
    estado: 'PEND',
  },
  {
    id: 'fin-push-parsing',
    proyecto_id: 'app-movil-financiera-offline',
    titulo: 'Parseo de notificaciones push bancarias',
    descripcion:
      'Una notificación con formato inesperado no crea un movimiento corrupto.',
    tipo_prueba: 'Robustez',
    tiempo_simulado_ms: 260,
    estado: 'PEND',
  },
  {
    id: 'fin-bloc-event-coverage',
    proyecto_id: 'app-movil-financiera-offline',
    titulo: 'Cobertura de eventos BLoC',
    descripcion:
      'Cada evento del BLoC transiciona a un estado esperado y emite un único efecto.',
    tipo_prueba: 'Unit',
    tiempo_simulado_ms: 180,
    estado: 'PEND',
  },
  {
    id: 'fin-bidirectional-sync',
    proyecto_id: 'app-movil-financiera-offline',
    titulo: 'Sincronización bidireccional diferida',
    descripcion:
      'Al recuperar conexión, la cola local se envía y los cambios remotos se aplican en orden.',
    tipo_prueba: 'Sincronización',
    tiempo_simulado_ms: 470,
    estado: 'PEND',
  },

  // --- retiro-tienda-click-collect (franja compacta) ---
  {
    id: 'cc-expiry-reversal',
    proyecto_id: 'retiro-tienda-click-collect',
    titulo: 'Reversa transaccional por caducidad',
    descripcion:
      'Un pedido no retirado en plazo devuelve el stock a reserva en SAP B1 de forma inmediata.',
    tipo_prueba: 'Integración',
    tiempo_simulado_ms: 440,
    estado: 'PEND',
  },
  {
    id: 'cc-eligibility-rules',
    proyecto_id: 'retiro-tienda-click-collect',
    titulo: 'Reglas de elegibilidad física',
    descripcion:
      'Un pedido que excede peso o volumen no se admite para retiro en tienda.',
    tipo_prueba: 'Unit',
    tiempo_simulado_ms: 160,
    estado: 'PEND',
  },
  {
    id: 'cc-label-print',
    proyecto_id: 'retiro-tienda-click-collect',
    titulo: 'Impresión de etiquetas en recepción',
    descripcion:
      'La etiqueta de almacenaje se genera con la ubicación y el código correctos.',
    tipo_prueba: 'Robustez',
    tiempo_simulado_ms: 280,
    estado: 'PEND',
  },
  {
    id: 'cc-notification-dispatch',
    proyecto_id: 'retiro-tienda-click-collect',
    titulo: 'Notificación al comprador',
    descripcion:
      'El correo de "pedido listo" se envía una sola vez al confirmar la recepción.',
    tipo_prueba: 'Integración',
    tiempo_simulado_ms: 320,
    estado: 'PEND',
  },
  {
    id: 'cc-in-transit-detection',
    proyecto_id: 'retiro-tienda-click-collect',
    titulo: 'Detección de despachos en tránsito',
    descripcion:
      'El sistema reconoce los pedidos en ruta desde bodega hacia la tienda.',
    tipo_prueba: 'Integración',
    tiempo_simulado_ms: 300,
    estado: 'PEND',
  },

  // --- calendarizacion-entregas-multifecha (franja compacta) ---
  {
    id: 'cal-split-vs-master',
    proyecto_id: 'calendarizacion-entregas-multifecha',
    titulo: 'Cantidades fraccionadas ↔ orden matriz',
    descripcion:
      'La suma de los despachos parciales cuadra exactamente con la orden matriz en SAP B1.',
    tipo_prueba: 'Integración',
    tiempo_simulado_ms: 400,
    estado: 'PEND',
  },
  {
    id: 'cal-address-master',
    proyecto_id: 'calendarizacion-entregas-multifecha',
    titulo: 'Alta de direcciones en el socio de negocio',
    descripcion:
      'Una dirección nueva se registra en el maestro sin duplicar entradas existentes.',
    tipo_prueba: 'Robustez',
    tiempo_simulado_ms: 260,
    estado: 'PEND',
  },
  {
    id: 'cal-picking-docs',
    proyecto_id: 'calendarizacion-entregas-multifecha',
    titulo: 'Emisión de documentos de picking independientes',
    descripcion:
      'Cada fecha de despacho genera su propio documento de picking en SAP B1.',
    tipo_prueba: 'Integración',
    tiempo_simulado_ms: 350,
    estado: 'PEND',
  },
  {
    id: 'cal-calendar-grid',
    proyecto_id: 'calendarizacion-entregas-multifecha',
    titulo: 'Grilla de calendario de despachos',
    descripcion:
      'Fraccionar una orden en cuatro fechas refleja cuatro entradas coherentes en la grilla.',
    tipo_prueba: 'Unit',
    tiempo_simulado_ms: 170,
    estado: 'PEND',
  },

  // --- gobernanza-alta-proveedores (franja compacta) ---
  {
    id: 'gov-idempotency',
    proyecto_id: 'gobernanza-alta-proveedores',
    titulo: 'Idempotencia del alta en SAP B1',
    descripcion:
      'Reenviar la aprobación no crea un proveedor duplicado en el maestro.',
    tipo_prueba: 'Robustez',
    tiempo_simulado_ms: 300,
    estado: 'PEND',
  },
  {
    id: 'gov-bank-input-sanitization',
    proyecto_id: 'gobernanza-alta-proveedores',
    titulo: 'Sanitización de datos bancarios y tributarios',
    descripcion:
      'Los campos sensibles se validan y normalizan antes de salir del portal.',
    tipo_prueba: 'Seguridad',
    tiempo_simulado_ms: 190,
    estado: 'PEND',
  },
  {
    id: 'gov-approval-state-machine',
    proyecto_id: 'gobernanza-alta-proveedores',
    titulo: 'Máquina de estados de aprobación jerárquica',
    descripcion:
      'El alta no llega a Contabilidad sin la aprobación previa de Jefatura.',
    tipo_prueba: 'Robustez',
    tiempo_simulado_ms: 330,
    estado: 'PEND',
  },
  {
    id: 'gov-worker-listener-sync',
    proyecto_id: 'gobernanza-alta-proveedores',
    titulo: 'Worker listener de sincronización a SAP B1',
    descripcion:
      'El worker en Java inserta en SAP B1 solo tras el commit del estado aprobado.',
    tipo_prueba: 'Sincronización',
    tiempo_simulado_ms: 420,
    estado: 'PEND',
  },
  {
    id: 'gov-malformed-payload',
    proyecto_id: 'gobernanza-alta-proveedores',
    titulo: 'Rechazo de payloads malformados',
    descripcion:
      'Un formulario multi-etapa incompleto no avanza ni persiste datos parciales.',
    tipo_prueba: 'Robustez',
    tiempo_simulado_ms: 240,
    estado: 'PEND',
  },

  // --- trazabilidad-control-acceso-bodegas (franja compacta) ---
  {
    id: 'trz-rbac-regression',
    proyecto_id: 'trazabilidad-control-acceso-bodegas',
    titulo: 'Regresión de matrices de autorización RBAC',
    descripcion:
      'Cada rol solo accede a las bodegas y acciones que le corresponden tras cambios de permisos.',
    tipo_prueba: 'Seguridad',
    tiempo_simulado_ms: 280,
    estado: 'PEND',
  },
  {
    id: 'trz-peak-hour-stress',
    proyecto_id: 'trazabilidad-control-acceso-bodegas',
    titulo: 'Estrés concurrente en horario punta de garita',
    descripcion:
      'La garita sostiene múltiples registros simultáneos sin perder eventos.',
    tipo_prueba: 'Concurrencia',
    tiempo_simulado_ms: 560,
    estado: 'PEND',
  },
  {
    id: 'trz-guide-match',
    proyecto_id: 'trazabilidad-control-acceso-bodegas',
    titulo: 'Validación de carga egresada contra guía',
    descripcion:
      'Una salida solo se autoriza si la carga corresponde a una guía u hoja de ruta vigente.',
    tipo_prueba: 'Integración',
    tiempo_simulado_ms: 340,
    estado: 'PEND',
  },
  {
    id: 'trz-return-reentry',
    proyecto_id: 'trazabilidad-control-acceso-bodegas',
    titulo: 'Seguimiento de devoluciones y reingresos a stock',
    descripcion:
      'Un reingreso a bodega actualiza el stock y deja traza del evento.',
    tipo_prueba: 'Integración',
    tiempo_simulado_ms: 320,
    estado: 'PEND',
  },

  // --- portfolio-ci-cd (franja compacta) ---
  {
    id: 'ci-build-gate',
    proyecto_id: 'portfolio-ci-cd',
    titulo: 'Gate de build en GitHub Actions',
    descripcion:
      'Un cambio que rompe la compilación no puede fusionarse a main.',
    tipo_prueba: 'Integración',
    tiempo_simulado_ms: 380,
    estado: 'PEND',
  },
  {
    id: 'ci-test-gate',
    proyecto_id: 'portfolio-ci-cd',
    titulo: 'Gate de tests en GitHub Actions',
    descripcion:
      'El pipeline bloquea el merge si algún test unitario o de componente falla.',
    tipo_prueba: 'Integración',
    tiempo_simulado_ms: 360,
    estado: 'PEND',
  },
  {
    id: 'ci-branch-protection',
    proyecto_id: 'portfolio-ci-cd',
    titulo: 'Flujo de ramas protegido (Git Flow)',
    descripcion:
      'Los cambios pasan por la rama dev de validación antes de integrarse a producción.',
    tipo_prueba: 'Robustez',
    tiempo_simulado_ms: 220,
    estado: 'PEND',
  },
  {
    id: 'ci-auto-deploy',
    proyecto_id: 'portfolio-ci-cd',
    titulo: 'Despliegue automático a Vercel',
    descripcion:
      'Al fusionar cambios aprobados, Vercel publica sin intervención manual.',
    tipo_prueba: 'Sincronización',
    tiempo_simulado_ms: 300,
    estado: 'PEND',
  },
  {
    id: 'ci-preview-isolation',
    proyecto_id: 'portfolio-ci-cd',
    titulo: 'Aislamiento del entorno de validación',
    descripcion:
      'Los errores probados en dev nunca se exponen a los visitantes de producción.',
    tipo_prueba: 'Robustez',
    tiempo_simulado_ms: 260,
    estado: 'PEND',
  },
]

/** Canales de contacto directo de Mayckol Rodríguez. */
export const contactInfo: ContactDetails = {
  email: 'mayckol10r.s@gmail.com',
  phone: '+56 9 50571303',
  phoneHref: '+56950571303',
  location: 'Santiago, Chile',
  linkedinUrl: 'https://www.linkedin.com/in/mayckol-rodriguez-sanchez',
  githubUrl: 'https://github.com/WmikeeD',
  availability: 'Disponible para roles Full-Stack y QA Lead.',
}
