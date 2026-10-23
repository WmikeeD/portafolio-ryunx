import type {
  BusinessService,
  ContactDetails,
  CorporateExperience,
  ExperienceSectionContent,
  HeroData,
  NavLink,
  ShowcaseProject,
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
    'Especialista en fiabilidad de sistemas críticos, integración de sistemas ERP y calidad de software automatizada',
  metrics: [],
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

/** Cabecera de la sección Experiencia. */
export const experienceSection: ExperienceSectionContent = {
  subtitle:
    'Trayectoria en desarrollo full-stack, integración con ERP y calidad de software.',
}

/**
 * Experiencia profesional de Mayckol Rodríguez como timeline corporativo,
 * centrada en el impacto ejecutivo y sin duplicar el detalle de Proyectos.
 */
export const corporateExperience: CorporateExperience[] = [
  {
    role: 'Consultor de Software y QA Independiente',
    company: 'Servicios Profesionales / Freelance',
    period: 'Agosto 2026 – Presente',
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
    role: 'Full-Stack Software Engineer & Especialista Técnico',
    company: 'Atika S.A.',
    period: 'Enero 2024 – Agosto 2026',
    location: 'Santiago, Chile',
    executiveSummary:
      'Desarrollo y mantención de plataformas web internas integradas con el ERP de la compañía, para procesos de logística y retail.',
    achievements: [
      {
        metric: 'Automatización operativa',
        detail:
          'Digitalización de procesos que dependían de planillas y registro manual.',
      },
      {
        metric: 'Integración con ERP',
        detail:
          'Integración de aplicaciones web con el ERP corporativo, con validación de datos en ambos extremos.',
      },
      {
        metric: 'Calidad y pruebas',
        detail:
          'Pruebas funcionales, de integración y de regresión sobre mis desarrollos.',
      },
      {
        metric: 'IA aplicada al desarrollo',
        detail:
          'Uso de asistentes de IA en el ciclo de desarrollo y en el soporte técnico.',
      },
    ],
    stack: ['Laravel', 'Vue.js', 'React', 'Java', 'MariaDB', 'REST APIs'],
  },
]

/**
 * Engineering Showcase: casos de ingeniería de Mayckol Rodríguez bajo el
 * marco Problema ➔ Solución ➔ Arquitectura ➔ QA, ordenados por ranking de
 * prioridad técnica y de negocio. Los marcados `isFeatured` son los destacados.
 * Los casos de entorno empresarial siguen `docs/guia-confidencialidad.md`.
 */
export const showcaseProjects: ShowcaseProject[] = [
  {
    id: 'etl-data-warehouse',
    title: 'Pipelines ETL, Data Lake y Data Warehouse para análisis de negocio',
    benefitTitle: 'Una sola fuente de verdad para ventas y operación',
    isFeatured: true,
    category: ['data-bi'],
    badge: 'Datos & BI',
    context: 'Entorno Empresarial',
    problem:
      'La información de ventas, inventario y logística estaba repartida entre varios sistemas. Cada reporte requería cruzar datos a mano, y los resultados no siempre coincidían entre áreas.',
    solution:
      'Pipelines ETL en Python que extraen la información del ERP y de otros sistemas de origen hacia un Data Lake, la limpian y la modelan en un Data Warehouse con una definición única para cada indicador. Sobre esa base se conectaron dashboards en Qlik y una aplicación web propia de análisis en React, que consume el Warehouse mediante una API en Flask. Cada carga se monitorea y genera alertas automáticas ante fallas o datos incompletos.',
    pipeline: {
      client: 'App web de análisis (React) + dashboards (Qlik)',
      api: 'API REST en Python (Flask)',
      adapterOrWorker: 'Pipelines ETL (extracción, limpieza, modelado)',
      persistenceOrErp:
        'Data Lake y Data Warehouse (SQL Server) · fuentes: ERP SAP Business One y bases operativas (MariaDB)',
    },
    qaGate:
      'Conciliación de totales entre origen y Warehouse en cada carga, validación de esquema en la ingesta y alertas por datos faltantes o desactualizados.',
    stack: [
      'Python',
      'Flask',
      'React',
      'SQL Server',
      'MariaDB',
      'SAP HANA',
      'ETL',
      'Data Warehouse',
      'Qlik',
    ],
  },
  {
    id: 'planificacion-despachos',
    title: 'Plataforma web de planificación logística integrada con el ERP',
    benefitTitle: 'Planificación de despachos sin planillas ni consultas manuales',
    isFeatured: true,
    category: ['logistics-erp'],
    badge: 'Logística & ERP',
    context: 'Entorno Empresarial',
    problem:
      'Las hojas de ruta se armaban en planillas, consultando el ERP de forma manual para reunir los documentos de cada despacho. El proceso era lento, dependía de la digitación y facilitaba errores al consolidar la carga de cada ruta.',
    solution:
      'Aplicación web que unifica en una sola pantalla la búsqueda de los documentos a despachar, la asignación de transportista y la creación de la hoja de ruta. La planificación vive en una base de datos propia, expuesta por una API en Laravel, y la información del ERP se obtiene mediante un servicio de integración en Java, desacoplando el ciclo de vida de la ruta del ERP.',
    pipeline: {
      client: 'Vue.js 2 + Vuetify (búsqueda reactiva con debounce)',
      api: 'Laravel REST API',
      adapterOrWorker: 'Servicio de integración en Java',
      persistenceOrErp: 'MariaDB + ERP SAP Business One (sobre HANA)',
    },
    qaGate:
      'Pruebas de contrato de los endpoints (Postman), consistencia entre los datos del ERP y la planificación local, y una búsqueda que nunca muestra resultados obsoletos.',
    stack: ['Vue.js 2', 'Vuetify', 'Laravel', 'Java', 'MariaDB', 'SAP HANA', 'Postman'],
  },
  {
    id: 'bot-hojas-de-ruta-ia',
    title:
      'Bot de Telegram con extracción multimodelo (Gemini / OpenAI / Anthropic) sobre FastAPI',
    benefitTitle: 'De una captura a una hoja de ruta lista para salir',
    isFeatured: true,
    category: ['applied-ai', 'qa'],
    badge: 'Proyecto Personal / IA aplicada',
    context: 'Iniciativa Personal',
    problem:
      'Lo viví como repartidor: antes de salir, había que transcribir a mano las direcciones de cada entrega para armar la ruta del día. Es lento, se cometen errores de digitación y retrasa la salida.',
    solution:
      'Bot de Telegram que recibe capturas de la app de rutas del repartidor. Un modelo con visión (Gemini, OpenAI o Anthropic) lee la imagen y extrae las paradas de forma estructurada; luego el código normaliza las direcciones y elimina duplicados. El resultado es una hoja de ruta en PDF. Si un proveedor falla, excede el tiempo o alcanza su límite de uso, el bot reintenta y pasa al siguiente. Las imágenes se procesan en memoria y no se guardan en disco ni en base de datos. Corre en Render con FastAPI, y es la base de una futura app de última milla.',
    pipeline: {
      client: 'Bot de Telegram (menú guiado)',
      api: 'FastAPI en Render',
      adapterOrWorker:
        'Extracción con LLM de visión y fallback (Gemini / OpenAI / Anthropic) + normalización y deduplicación',
      persistenceOrErp: 'Sin almacenamiento de imágenes · salida: hoja de ruta en PDF',
    },
    qaGate:
      'CI con ruff, mypy y pytest. Tests del fallback entre proveedores y de la deduplicación de direcciones.',
    stack: [
      'Python',
      'FastAPI',
      'Telegram Bot API',
      'Gemini API',
      'OpenAI API',
      'Anthropic API',
      'pytest',
      'Render',
    ],
    githubUrl: 'https://github.com/WmikeeD/ai-route-builder',
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
    stack: [
      'Flutter',
      'Dart',
      'Clean Architecture',
      'SQLite',
      'Supabase',
      'Docker',
      'Unit Testing',
    ],
  },
  {
    id: 'retiro-en-tienda',
    title: 'Flujo transaccional de pedidos con retiro en tienda (Click & Collect)',
    benefitTitle: 'Retiro en tienda sin fricción para el cliente ni para la sucursal',
    isFeatured: false,
    category: ['retail-omnichannel'],
    badge: 'Retail & Omnicanal',
    context: 'Entorno Empresarial',
    problem:
      'Los pedidos online con retiro en tienda se coordinaban de forma manual entre canales. Sin un estado único del pedido era difícil saber si estaba listo, y los productos de pedidos no retirados quedaban reservados más tiempo del necesario.',
    solution:
      'Aplicación web que gestiona el ciclo completo del pedido: validación de que es apto para retiro, preparación, aviso al cliente y entrega con verificación. El stock se sincroniza con el ERP y, si un pedido vence sin retirarse, la reserva se libera automáticamente para volver a la venta.',
    pipeline: {
      client: 'App web de sucursal (React)',
      api: 'Spring Boot REST API',
      adapterOrWorker: 'Sincronización de estado y stock con reintentos',
      persistenceOrErp: 'MariaDB + ERP SAP Business One (sobre HANA)',
    },
    qaGate:
      'Pruebas de la máquina de estados del pedido, de concurrencia en la entrega y de consistencia del stock al liberar reservas.',
    stack: ['React', 'Spring Boot', 'MariaDB', 'SAP HANA', 'REST API'],
  },
  {
    id: 'entregas-parciales',
    title: 'Reprogramación y parcialización de entregas para clientes de alto volumen',
    benefitTitle: 'Entregas parciales con fechas confirmadas',
    isFeatured: false,
    category: ['logistics-erp'],
    badge: 'Logística & ERP',
    context: 'Entorno Empresarial',
    problem:
      'Los pedidos de clientes de alto volumen se programaban como una sola entrega o con fechas poco precisas. Logística no podía planificar con certeza y el stock quedaba comprometido más tiempo del necesario.',
    solution:
      'Aplicación web para dividir un pedido en entregas parciales, asignar a cada una una fecha y una dirección confirmadas y entregar esa programación a logística. La API en Spring Boot valida cada cambio y lo sincroniza con el ERP, de modo que el stock se compromete solo para las fechas confirmadas.',
    pipeline: {
      client: 'Vue 3',
      api: 'Spring Boot REST API',
      adapterOrWorker: 'Sincronización de la programación con el ERP',
      persistenceOrErp: 'MariaDB + ERP SAP Business One (sobre HANA)',
    },
    qaGate:
      'Pruebas de las reglas de parcialización, validación de fechas y direcciones, y sincronización idempotente con el ERP.',
    stack: ['Vue 3', 'Spring Boot', 'MariaDB', 'SAP HANA', 'REST API'],
  },
  {
    id: 'portfolio-ci-cd',
    title: 'Portafolio Web con CI en GitHub Actions y Deploy en Vercel',
    benefitTitle:
      'Control de calidad y despliegue automatizado de este portafolio',
    isFeatured: false,
    category: ['product-eng', 'qa'],
    badge: 'Meta / Ingeniería de Producto',
    context: 'Iniciativa Personal',
    problem:
      'Un sitio personal que se actualiza constantemente corre el riesgo de romperse en producción si cada cambio se sube directo a la rama principal sin validación previa, además de requerir despliegue manual repetitivo.',
    solution:
      'Trabajo por ramas y pull requests hacia main. En cada PR, GitHub Actions ejecuta la auditoría de dependencias de producción (falla ante cualquier vulnerabilidad conocida), el type-check y la suite de Vitest + React Testing Library. La integración de Vercel publica producción desde main y genera un preview por cada PR. El formulario de contacto corre como función serverless en Vercel, y el contenido está tipado y cubierto por tests de invariantes y de confidencialidad.',
    pipeline: {
      client: 'React 19 + TypeScript + Tailwind',
      api: 'Función serverless (contacto)',
      adapterOrWorker: 'GitHub Actions (audit, type-check, tests)',
      persistenceOrErp: 'Vercel (producción + previews por PR)',
    },
    qaGate:
      'Cada PR hacia main pasa por GitHub Actions: auditoría de dependencias, type-check y tests de Vitest + React Testing Library, incluidos los de invariantes del contenido y de confidencialidad. Vercel genera un preview del PR para revisarlo antes del merge.',
    stack: [
      'React',
      'Vite',
      'TypeScript',
      'Tailwind CSS',
      'GitHub Actions',
      'Vercel',
      'Vitest',
      'React Testing Library',
    ],
  },
]

/**
 * Casos de prueba del QA Showcase, centralizados por proyecto. `proyecto_id`
 * referencia el `id` del proyecto en `showcaseProjects`. Todos arrancan en
 * estado `PEND`; el QA Showcase los recorre en una ejecución simulada (demo).
 */
export const testCases: TestCase[] = [
  // --- etl-data-warehouse (destacado) ---
  {
    id: 'etl-source-reconciliation',
    proyecto_id: 'etl-data-warehouse',
    titulo: 'Conciliación origen ↔ Warehouse',
    descripcion:
      'La suma de registros cargados coincide con la del sistema de origen para cada período.',
    tipo_prueba: 'Integración',
    estado: 'PEND',
  },
  {
    id: 'etl-idempotent-load',
    proyecto_id: 'etl-data-warehouse',
    titulo: 'Carga idempotente',
    descripcion:
      'Reejecutar la carga de un mismo período no duplica registros.',
    tipo_prueba: 'Robustez',
    estado: 'PEND',
  },
  {
    id: 'etl-ingest-schema-validation',
    proyecto_id: 'etl-data-warehouse',
    titulo: 'Validación de esquema en ingesta',
    descripcion:
      'Una fuente con columnas faltantes o tipos inválidos se rechaza y genera una alerta, sin contaminar el Warehouse.',
    tipo_prueba: 'Robustez',
    estado: 'PEND',
  },
  {
    id: 'etl-stale-data-alert',
    proyecto_id: 'etl-data-warehouse',
    titulo: 'Alerta por datos desactualizados',
    descripcion:
      'Si una fuente no entrega datos a tiempo, se emite una alerta y el dashboard muestra la fecha del último dato válido.',
    tipo_prueba: 'Robustez',
    estado: 'PEND',
  },
  {
    id: 'etl-kpi-single-definition',
    proyecto_id: 'etl-data-warehouse',
    titulo: 'Indicadores con definición única',
    descripcion:
      'Cada KPI coincide con el valor esperado sobre un set de datos ficticio de referencia.',
    tipo_prueba: 'Unit',
    estado: 'PEND',
  },

  // --- planificacion-despachos (destacado) ---
  {
    id: 'dsp-erp-consistency',
    proyecto_id: 'planificacion-despachos',
    titulo: 'Consistencia ERP ↔ planificación',
    descripcion:
      'Los documentos de una ruta coinciden con los del ERP después de la sincronización.',
    tipo_prueba: 'Integración',
    estado: 'PEND',
  },
  {
    id: 'dsp-endpoint-contract',
    proyecto_id: 'planificacion-despachos',
    titulo: 'Contrato de endpoints',
    descripcion:
      'Cada endpoint del ciclo de la ruta responde con el esquema y los códigos acordados.',
    tipo_prueba: 'Integración',
    estado: 'PEND',
  },
  {
    id: 'dsp-search-race-condition',
    proyecto_id: 'planificacion-despachos',
    titulo: 'Búsqueda sin condiciones de carrera',
    descripcion:
      'Escribir rápido en el buscador nunca deja resultados obsoletos en pantalla.',
    tipo_prueba: 'Concurrencia',
    estado: 'PEND',
  },
  {
    id: 'dsp-single-route-document',
    proyecto_id: 'planificacion-despachos',
    titulo: 'Documento en una sola ruta',
    descripcion:
      'Un documento no puede quedar asignado a dos rutas, aunque se asigne en paralelo.',
    tipo_prueba: 'Concurrencia',
    estado: 'PEND',
  },
  {
    id: 'dsp-erp-unavailable',
    proyecto_id: 'planificacion-despachos',
    titulo: 'ERP lento o no disponible',
    descripcion:
      'Si el ERP tarda, la API responde con un error controlado y la interfaz lo informa sin bloquearse.',
    tipo_prueba: 'Robustez',
    estado: 'PEND',
  },

  // --- bot-hojas-de-ruta-ia (destacado) ---
  {
    id: 'bot-provider-fallback',
    proyecto_id: 'bot-hojas-de-ruta-ia',
    titulo: 'Fallback entre proveedores',
    descripcion:
      'Si un proveedor falla o alcanza su límite, la solicitud se completa con el siguiente.',
    tipo_prueba: 'Robustez',
    estado: 'PEND',
  },
  {
    id: 'bot-duplicate-addresses',
    proyecto_id: 'bot-hojas-de-ruta-ia',
    titulo: 'Direcciones duplicadas',
    descripcion:
      'Una dirección repetida aparece una sola vez en la hoja de ruta.',
    tipo_prueba: 'Unit',
    estado: 'PEND',
  },

  // --- app-movil-financiera-offline (destacado) ---
  {
    id: 'fin-ledger-balance',
    proyecto_id: 'app-movil-financiera-offline',
    titulo: 'Balances contables acumulados',
    descripcion:
      'El balance final coincide con la suma firmada de todos los movimientos.',
    tipo_prueba: 'Unit',
    estado: 'PEND',
  },
  {
    id: 'fin-sqlite-persistence',
    proyecto_id: 'app-movil-financiera-offline',
    titulo: 'Persistencia local en SQLite',
    descripcion: 'Los movimientos sobreviven a un reinicio en frío de la app.',
    tipo_prueba: 'Robustez',
    estado: 'PEND',
  },
  {
    id: 'fin-offline-conflict-resolution',
    proyecto_id: 'app-movil-financiera-offline',
    titulo: 'Resolución de conflictos offline ↔ Supabase',
    descripcion:
      'Ediciones hechas sin conexión y en la nube se reconcilian por marca de tiempo sin perder datos.',
    tipo_prueba: 'Sincronización',
    estado: 'PEND',
  },
  {
    id: 'fin-ocr-ingestion',
    proyecto_id: 'app-movil-financiera-offline',
    titulo: 'Ingesta asistida por OCR de comprobantes',
    descripcion:
      'El monto y la fecha leídos del comprobante se validan antes de crear el gasto.',
    tipo_prueba: 'Robustez',
    estado: 'PEND',
  },
  {
    id: 'fin-push-parsing',
    proyecto_id: 'app-movil-financiera-offline',
    titulo: 'Parseo de notificaciones push bancarias',
    descripcion:
      'Una notificación con formato inesperado no crea un movimiento corrupto.',
    tipo_prueba: 'Robustez',
    estado: 'PEND',
  },
  {
    id: 'fin-bloc-event-coverage',
    proyecto_id: 'app-movil-financiera-offline',
    titulo: 'Cobertura de eventos BLoC',
    descripcion:
      'Cada evento del BLoC transiciona a un estado esperado y emite un único efecto.',
    tipo_prueba: 'Unit',
    estado: 'PEND',
  },
  {
    id: 'fin-bidirectional-sync',
    proyecto_id: 'app-movil-financiera-offline',
    titulo: 'Sincronización bidireccional diferida',
    descripcion:
      'Al recuperar conexión, la cola local se envía y los cambios remotos se aplican en orden.',
    tipo_prueba: 'Sincronización',
    estado: 'PEND',
  },

  // --- retiro-en-tienda (franja compacta) ---
  {
    id: 'cc-valid-state-transitions',
    proyecto_id: 'retiro-en-tienda',
    titulo: 'Transiciones de estado válidas',
    descripcion:
      'Un pedido solo avanza por estados permitidos; no puede entregarse sin estar preparado.',
    tipo_prueba: 'Unit',
    estado: 'PEND',
  },
  {
    id: 'cc-single-delivery',
    proyecto_id: 'retiro-en-tienda',
    titulo: 'Entrega única',
    descripcion:
      'Dos confirmaciones simultáneas de entrega registran una sola.',
    tipo_prueba: 'Concurrencia',
    estado: 'PEND',
  },
  {
    id: 'cc-expired-reservation-release',
    proyecto_id: 'retiro-en-tienda',
    titulo: 'Liberación de reserva al vencer',
    descripcion:
      'Un pedido vencido libera su reserva una sola vez y el stock disponible se actualiza en el ERP.',
    tipo_prueba: 'Sincronización',
    estado: 'PEND',
  },
  {
    id: 'cc-pickup-verification',
    proyecto_id: 'retiro-en-tienda',
    titulo: 'Verificación al entregar',
    descripcion:
      'Un código de retiro inválido o de otro pedido es rechazado.',
    tipo_prueba: 'Robustez',
    estado: 'PEND',
  },
  {
    id: 'cc-erp-failure-retry',
    proyecto_id: 'retiro-en-tienda',
    titulo: 'Reintento ante falla del ERP',
    descripcion:
      'Si el ERP no responde, la sincronización se reintenta sin perder ni duplicar movimientos.',
    tipo_prueba: 'Robustez',
    estado: 'PEND',
  },

  // --- entregas-parciales (franja compacta) ---
  {
    id: 'pd-consistent-split',
    proyecto_id: 'entregas-parciales',
    titulo: 'Parcialización consistente',
    descripcion:
      'La suma de las entregas parciales nunca supera la cantidad del pedido.',
    tipo_prueba: 'Unit',
    estado: 'PEND',
  },
  {
    id: 'pd-valid-dates',
    proyecto_id: 'entregas-parciales',
    titulo: 'Fechas válidas',
    descripcion:
      'No se acepta una fecha pasada ni anterior al plazo mínimo de preparación.',
    tipo_prueba: 'Unit',
    estado: 'PEND',
  },
  {
    id: 'pd-concurrent-edit',
    proyecto_id: 'entregas-parciales',
    titulo: 'Edición concurrente',
    descripcion:
      'Dos personas editando el mismo pedido no generan entregas duplicadas: la segunda edición detecta el cambio.',
    tipo_prueba: 'Concurrencia',
    estado: 'PEND',
  },
  {
    id: 'pd-idempotent-sync',
    proyecto_id: 'entregas-parciales',
    titulo: 'Sincronización idempotente',
    descripcion:
      'Reenviar la misma programación al ERP no duplica entregas.',
    tipo_prueba: 'Sincronización',
    estado: 'PEND',
  },
  {
    id: 'pd-invalid-address',
    proyecto_id: 'entregas-parciales',
    titulo: 'Dirección inválida',
    descripcion:
      'Una dirección incompleta se rechaza con un mensaje claro antes de confirmar la entrega.',
    tipo_prueba: 'Robustez',
    estado: 'PEND',
  },

  // --- portfolio-ci-cd (franja compacta) ---
  {
    id: 'ci-dependency-audit',
    proyecto_id: 'portfolio-ci-cd',
    titulo: 'Auditoría de dependencias en cada PR',
    descripcion:
      'Cualquier vulnerabilidad conocida en las dependencias de producción, de cualquier severidad, deja el CI del PR en rojo.',
    tipo_prueba: 'Seguridad',
    estado: 'PEND',
  },
  {
    id: 'ci-type-check-gate',
    proyecto_id: 'portfolio-ci-cd',
    titulo: 'Type-check en GitHub Actions',
    descripcion:
      'Un error de tipos en cualquier proyecto de TypeScript deja el CI del PR en rojo.',
    tipo_prueba: 'Integración',
    estado: 'PEND',
  },
  {
    id: 'ci-test-gate',
    proyecto_id: 'portfolio-ci-cd',
    titulo: 'Gate de tests en GitHub Actions',
    descripcion:
      'Si algún test unitario o de componente falla, el CI del PR queda en rojo.',
    tipo_prueba: 'Integración',
    estado: 'PEND',
  },
  {
    id: 'ci-confidentiality-check',
    proyecto_id: 'portfolio-ci-cd',
    titulo: 'Test de confidencialidad del contenido',
    descripcion:
      'Los textos de proyectos y casos QA se validan contra una lista de términos que no deben publicarse.',
    tipo_prueba: 'Seguridad',
    estado: 'PEND',
  },
  {
    id: 'ci-pr-preview',
    proyecto_id: 'portfolio-ci-cd',
    titulo: 'Preview por pull request',
    descripcion:
      'Cada PR genera un despliegue de preview en Vercel, aislado de producción.',
    tipo_prueba: 'Robustez',
    estado: 'PEND',
  },
  {
    id: 'ci-production-deploy',
    proyecto_id: 'portfolio-ci-cd',
    titulo: 'Despliegue a producción desde main',
    descripcion:
      'Al fusionar un PR en main, la integración de Vercel publica producción sin pasos manuales.',
    tipo_prueba: 'Sincronización',
    estado: 'PEND',
  },
]

/** Canales de contacto directo de Mayckol Rodríguez. */
export const contactInfo: ContactDetails = {
  email: 'mayckol10r.s@gmail.com',
  location: 'Santiago, Chile',
  linkedinUrl: 'https://www.linkedin.com/in/mayckol-rodriguez-sanchez',
  githubUrl: 'https://github.com/WmikeeD',
  availability: 'Disponible para roles Full-Stack y QA Lead.',
}
