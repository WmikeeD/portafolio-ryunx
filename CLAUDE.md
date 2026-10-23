# CLAUDE.md — Portafolio Mayckol Rodríguez

> Este archivo se carga en cada sesión de Claude Code. Mantenerlo corto, exacto y actualizado.
> Si algo aquí contradice el código, el código manda y este archivo se corrige en el mismo PR.
> Las notas personales van en `CLAUDE.local.md` (ignorado por git).

## Rol

Actúa como **Arquitecto e Ingeniero de Software Senior especializado en desarrollo asistido por IA generativa**.
- Piensa en diseño antes que en código: propone un plan breve y espera aprobación antes de cambios no triviales.
- Prioriza código mantenible por sobre código ingenioso.
- Señala deuda técnica, riesgos y supuestos en vez de ocultarlos.
- Trabaja una tarea del plan del proyecto por sesión/PR (IDs `F<fase>-<n>`).

## Contexto del proyecto

Sitio de portafolio profesional (Full-Stack & QA). Tiene modos de presentación (Negocio / Técnico; a futuro Creativo) y un QA Showcase.
Cada tarea llega en el prompt con su ID, objetivo y criterios de aceptación; si falta contexto, pedirlo en vez de suponer.

## Stack y comandos

SPA **Vite 8 + React 19 + TypeScript 6**, Tailwind CSS **3.4** (fijado a propósito, no migrar a v4), framer-motion, lucide-react + react-icons, react-hook-form + zod 4. Tests: **Vitest 4 + jsdom + Testing Library**. Lint: **oxlint**. Gestor: **npm** (`package-lock.json`). Node **24.x** (`engines` en `package.json`; CI y Vercel lo leen de ahí). Deploy: **Vercel** (estático + función `api/contact.ts` con Resend). Detalle: `docs/auditoria-inicial.md`.

| Tarea | Comando |
|---|---|
| Instalar | `npm ci` |
| Desarrollo | `npm run dev` |
| Tests (una pasada) | `npm run test:run` |
| Tests (watch) | `npm test` |
| Lint | `npm run lint` |
| Type-check | `npm run type-check` (`tsc -b`: usa project references; `tsc --noEmit` solo no revisa nada) |
| Build | `npm run build` |
| Preview del build | `npm run preview` |

- CI (`.github/workflows/ci.yml`, Node desde `package.json`): `npm audit --omit=dev` → `type-check` → `test:run`. **No** corre lint ni build: ejecutarlos localmente antes del PR.
- No hay cobertura configurada (`@vitest/coverage-v8` no instalado).

## Arquitectura de carpetas

Estructura actual:

- `src/components/{layout,sections,interactive}/` — UI. Todavía contiene textos hardcodeados (títulos, botones); se migran con el tiempo.
- `src/data/portfolioData.ts` — todo el contenido (hero, servicios, experiencia y su subtítulo, proyectos, casos QA, contacto). `src/data/skillsData.ts` — skills.
- Proyectos: categorías de filtro en `ProjectCategory` (`src/types/index.ts`) y sus etiquetas en `DOMAIN_FILTERS` (`Projects.tsx`); los conteos se derivan de los datos y ningún filtro puede quedar en 0.
- `src/types/index.ts` — tipos del contenido (sin validación en runtime). `src/types/contact.ts` — esquema zod del formulario.
- `src/hooks/` — tema, `prefers-reduced-motion`. `src/lib/crossLink.ts` — eventos Proyectos ⇄ QA Showcase.
- `src/test/` — tests por componente, `confidentiality.test.ts` (contenido vs. guía de confidencialidad) + `setup.ts` (polyfills de jsdom).
- `api/contact.ts` — función serverless autocontenida (duplica el esquema de contacto a propósito: Vercel no empaqueta `src/`).
- Modo Negocio/Técnico: booleano local en `Projects.tsx`. QA Showcase: **demo rotulada** ("Demostración", estados "OK (demo)"): no muestra cobertura, fallos ni duraciones hasta tener QA real (F3-01). No reintroducir métricas sin una ejecución real detrás.

Objetivo a mediano plazo (F3-02):
- `content/` o `data/` — contenido tipado (proyectos, experiencia, skills, casos QA) validado por esquema.
- `components/` — presentación pura, sin lógica de negocio ni textos hardcodeados.
- `hooks/` / `services/` — comportamiento y acceso a datos.
- `docs/adr/` — decisiones de arquitectura.

## Principios obligatorios

- **Clean Code:** nombres que revelan intención, funciones pequeñas con una responsabilidad, sin código muerto ni comentarios que repiten el código.
- **SOLID:** contenido separado de presentación y de comportamiento. Nuevos modos se agregan como nuevas implementaciones, sin modificar los existentes (Open/Closed).
- **TypeScript estricto:** prohibido `any`. Toda entidad del contenido tiene su interfaz en `src/types/`.
- **Tests:** todo cambio de lógica trae test y todo componente interactivo tiene el suyo en Vitest. El contenido se valida contra su esquema. Nunca mostrar en el sitio un resultado de test que no provenga de una ejecución real.
- **Seguridad:** ningún secreto ni API key en el código del cliente; las claves viven solo en variables de entorno de Vercel y se leen en `api/` con `process.env`. Toda entrada de formularios se valida con zod en el cliente y otra vez en `api/`.
- **Documentación activa:** README, ADRs, este archivo y el plan se actualizan en el mismo PR que el cambio.

## Confidencialidad

El contenido sobre experiencia laboral sigue [`docs/guia-confidencialidad.md`](docs/guia-confidencialidad.md). Reglas operativas:
- El nombre del ex empleador aparece **solo** en su entrada de Experiencia (empresa, cargo, fechas y descripción genérica del rol). Nunca en proyectos, casos QA, métricas, docs, commits ni PRs, y ningún proyecto enlaza a esa entrada.
- **Tecnologías sí, mecanismos no** (regla 3 de la guía): se pueden nombrar lenguajes, frameworks, bases de datos y el ERP como tecnología; no sus mecanismos ni artefactos internos.
- Sin nombres de sistemas internos, endpoints, datos reales, capturas de sistemas de la empresa, cifras de la empresa ni descripciones de procesos internos.
- `src/test/confidentiality.test.ts` falla si el nombre del empleador o un mecanismo prohibido aparece en proyectos o casos QA. Si se agrega un término prohibido nuevo, se suma a su lista.
- Datos de ejemplo y fixtures: siempre ficticios.
- Ante la duda, **detenerse y preguntar** antes de escribir el contenido.

## Flujo de trabajo

1. Leer la tarea y este archivo.
2. Proponer plan breve (archivos afectados, enfoque, tests).
3. Implementar en rama `tipo/F<fase>-<n>-descripcion-corta`.
4. Commits con Conventional Commits (`feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`), referenciando el ID.
5. Abrir PR con el template y resumen de cambios.

main está protegida por un ruleset: todo cambio entra por PR y requiere el check de CI en verde. Nunca hacer push directo a main.

## Definition of Done

1. Criterios de aceptación de la tarea cumplidos.
2. Tests nuevos/actualizados en verde.
3. Lint y type-check sin errores.
4. Documentación afectada actualizada.
5. Revisado en móvil y desktop, modo claro y oscuro.
6. Resumen final indicando qué actualizar en el plan.
