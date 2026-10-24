# Estado técnico al iniciar el repo (octubre 2026)

Foto fechada del proyecto al crear este repositorio. No se actualiza: los cambios posteriores se registran en sus PRs y, cuando corresponda, en `docs/adr/`.

---

## 1. Stack real

Versiones verificadas con `npm ls --depth=0`. Gestor: **npm** (`package-lock.json`). Node **24.x**, fijado en `engines` de `package.json`; CI (`node-version-file`) y Vercel lo leen de ahí.

| Capa | Librería | Versión instalada |
|---|---|---|
| Framework UI | React / React DOM | 19.2.8 |
| Lenguaje | TypeScript | 6.0.3 (`~6.0.2`) |
| Build / dev server | Vite (Rolldown) + `@vitejs/plugin-react` | 8.2.2 / 6.1.1 |
| Estilos | Tailwind CSS (fijado en v3 a propósito) + PostCSS + Autoprefixer | 3.4.19 |
| Utilidades de clases | `clsx`, `tailwind-merge` | 2.1.1 / 3.6.0 |
| Animación | `framer-motion` | 13.2.0 |
| Iconos | `lucide-react` (UI), `react-icons/si` (logos de marca) | 1.39.0 / 5.7.0 |
| Formularios | `react-hook-form` + `@hookform/resolvers` + `zod` v4 | 7.87.0 / 5.9.1 / 4.5.4 |
| Email (serverless) | `resend` | 6.26.0 |
| Telemetría | `@vercel/analytics` | 2.0.1 |
| Efectos | `canvas-confetti` | 1.9.4 |
| Tests | Vitest + jsdom + Testing Library (react, dom, jest-dom) | 4.1.11 / 30.0.1 / 16.3.3 |
| Lint | oxlint (plugins react, typescript, oxc) | 1.81.0 |
| Hosting | Vercel (SPA estática + función `api/contact.ts`) | — |

Es una SPA de una sola página, sin router: las secciones se navegan por anclas.

## 2. Estructura de carpetas

```
api/contact.ts            Función serverless Vercel (POST → Resend). Esquema zod duplicado a propósito.
api/tsconfig.json         tsconfig estricto de la función; Vercel lo toma por ser el más cercano al entrypoint.
public/favicon.svg
src/
  App.tsx, main.tsx       Composición de secciones; <Analytics/>.
  components/
    layout/               Navbar, Footer, GlobalBackground, SceneCanvas (canvas animado).
    sections/             Hero, BusinessServices, Experience, Skills, Projects, QAShowcase, Contact.
    interactive/          SocialLinks (SVG inline de marcas).
  data/
    portfolioData.ts      691 líneas: navLinks, heroData, businessServices, experienceSection,
                          corporateExperience, showcaseProjects (7), testCases (35), contactInfo.
    skillsData.ts         Categorías de skills con iconos.
  hooks/                  useTheme, useIsDark, usePrefersReducedMotion.
  lib/crossLink.ts        Bus de CustomEvent Projects ⇄ QAShowcase.
  types/index.ts          Interfaces de todo el contenido.
  types/contact.ts        Esquema zod del formulario y sanitizeFreeText.
  test/                   Tests por componente + confidentiality.test.ts + smoke.test.ts + setup.ts.
  App.test.tsx
docs/                     Esta foto y la guía de confidencialidad.
.github/workflows/ci.yml
```

No existen `docs/adr/`, `services/` ni `content/`.

### ¿Dónde vive el contenido?

| Contenido | Ubicación | Estado |
|---|---|---|
| Proyectos (7) | `src/data/portfolioData.ts` → `showcaseProjects` | En datos, tipado con TS |
| Experiencia (2 entradas) | `portfolioData.ts` → `experienceSection`, `corporateExperience` | En datos |
| Skills | `src/data/skillsData.ts` | En datos |
| Casos QA (35) | `portfolioData.ts` → `testCases` (agrupados por `proyecto_id`) | En datos |
| Hero, servicios, contacto, navegación | `portfolioData.ts` | En datos |
| Títulos y subtítulos de sección, botones, textos de ayuda | **Hardcodeados en los componentes** (`Projects.tsx`, `QAShowcase.tsx`, `BusinessServices.tsx`, `Contact.tsx`, `Hero.tsx`, `Skills.tsx`, `Footer.tsx`) | Mixto |
| Filtros de dominio de Projects | Constante `DOMAIN_FILTERS` en `Projects.tsx` | En el componente |
| Mapas de color por tipo de prueba | `QAShowcase.tsx` | En el componente (presentación; aceptable) |

El contenido **no se valida contra un esquema en runtime**: solo hay tipos TypeScript. Zod se usa únicamente en el formulario de contacto.

## 3. QA Showcase: demostración rotulada

El panel **no muestra resultados de una ejecución real de tests**, y lo dice:

- La suite se rotula como "Demostración", con un aviso en texto.
- Los casos terminados muestran "OK (demo)".
- No se muestran cobertura, cantidad de fallos ni duraciones.

La animación PEND → RUNNING → OK la produce un temporizador en `QAShowcase.tsx`, no Vitest. Mostrar resultados reales (un reporte JSON de Vitest generado en CI o en el build) queda para F3-01.

## 4. Tests, cobertura, CI/CD y lint

### Ejecuciones verificadas (local, Node 24)

| Comando | Resultado |
|---|---|
| `npm run lint` (oxlint) | ✅ exit 0, sin hallazgos |
| `npm run type-check` (`tsc -b --noEmit`) | ✅ exit 0 |
| `npm run test:run` (`vitest run`) | ✅ 13 archivos, **91 tests** en verde |
| `npm run build` (`tsc -b && vite build`) | ✅ exit 0, con aviso: bundle JS único de **529 kB** (168 kB gzip) > 500 kB, sin code-splitting |
| `npm audit --omit=dev` | ✅ 0 vulnerabilidades |
| `npx vitest run --coverage` | ❌ `@vitest/coverage-v8` no está instalado: no hay medición de cobertura |

### Cobertura aproximada

Es una estimación, porque no hay herramienta instalada. Se cruzaron los módulos con los imports de los tests.

| Módulo | ¿Tiene test? |
|---|---|
| 7 secciones, Navbar, Footer, GlobalBackground, App | ✅ test propio por componente |
| `lib/crossLink.ts` | ✅ importado por tests (Projects/QAShowcase) |
| Contenido de proyectos y casos QA vs. guía de confidencialidad | ✅ `confidentiality.test.ts` |
| `types/contact.ts` (esquema y sanitización) | ◐ indirecto vía `Contact.test.tsx` |
| Hooks (`useTheme`, `useIsDark`, `usePrefersReducedMotion`) | ◐ indirecto (Navbar/App); sin tests unitarios |
| `SceneCanvas`, `SocialLinks` | ◐ indirecto (canvas mockeado en `setup.ts`) |
| **`api/contact.ts`** (único backend: validación, 405/400/500, envío) | ❌ **sin tests** (resuelto en F3-07b: `tests/api/`) |
| Integridad de datos (ids únicos, todo `proyecto_id` existe, etc.) | ❌ sin tests de esquema |

Estimación: alta cobertura de render de componentes y nula del backend. Muchos tests verifican **copys literales** (`getByText('…')` sobre los textos de datos), así que cualquier cambio de redacción los rompe.

### CI/CD

`.github/workflows/ci.yml` se ejecuta en `push` y `pull_request` a `main`. Usa `permissions: contents: read`, concurrencia con cancelación en PR, la versión de Node de `package.json` y `npm ci`. Tiene tres gates:

1. `npm audit --omit=dev`
2. `npm run type-check`
3. `npm run test:run`

**No ejecuta `npm run lint` ni `npm run build`**: un PR puede romper el build de producción y pasar CI. El deploy lo hace la integración Git de Vercel; no hay workflow de deploy en el repo.

## 5. Modos Negocio / Técnico

- **Dónde:** solo en `src/components/sections/Projects.tsx`.
- **Cómo:** con un booleano local, `const [technicalMode, setTechnicalMode] = useState(false)`. Lo controlan dos botones con `aria-pressed`, "Modo: Negocio" y "Modo: Técnico Completo". El flag baja como prop a cada tarjeta.
- **Qué cambia:** cada tarjeta tiene una Capa 1 (negocio, siempre visible) y una Capa 2 (técnica: pipeline y QA gate). En modo Técnico, la Capa 2 se fuerza abierta (`showLayer2 = technicalMode || isLayer2Open`) y se oculta el botón de expandir. Los textos de ambas capas salen de los mismos campos (`benefitTitle`/`title`, `problem`, `solution`, `pipeline`, `qaGate`).
- **Limitaciones:**
  - No es un modo del sitio: Hero, Experiencia, Skills y QA no reaccionan.
  - No se persiste (ni URL ni `localStorage`).
  - Es un booleano, así que agregar "Creativo" obliga a modificar `Projects` y las tarjetas. Eso choca con el Open/Closed que pide `CLAUDE.md`.
  - No hay una abstracción de "modo" (estrategia o contexto) ni tipos dedicados.

## 6. Deuda técnica y riesgos (priorizados)

### Alto

| ID | Hallazgo | Evidencia | Sugerencia |
|---|---|---|---|
| R-01 | El QA Showcase es una demostración, no un resultado real | Sección 3 | Alimentar el panel con un reporte JSON real de Vitest generado en CI/build (F3-01) |
| R-02 | El backend `api/contact.ts` no tiene tests, rate limiting ni protección anti-bot (honeypot/captcha); está expuesto públicamente y envía correos | `api/contact.ts` | Tests del handler, rate limit (Vercel KV/Upstash o middleware) y honeypot. **F3-07b:** tests y honeypot hechos; el 429 lo produce la regla WAF de F3-07c |

### Medio

| ID | Hallazgo | Evidencia | Sugerencia |
|---|---|---|---|
| R-03 | CI no corre lint ni build | `ci.yml` | Agregar `npm run lint` y `npm run build` como gates |
| R-04 | Sin medición de cobertura | Falta `@vitest/coverage-v8` | Instalar el proveedor, definir umbrales y publicar el reporte (habilita R-01) |
| R-05 | Contenido sin validación por esquema; un `proyecto_id` mal escrito deja casos huérfanos en silencio | `types/index.ts`, `portfolioData.ts` | Esquemas zod para el contenido y un test que los valide |
| R-06 | Modos implementados como booleano local en una sola sección; no extensible a "Creativo" | Sección 5 | Contexto global de modo con estrategia por modo (OCP) y ADR |
| R-07 | Archivos grandes con varias responsabilidades: `portfolioData.ts` (691 l.), `QAShowcase.tsx` (611 l., motor de la demo + UI), `Projects.tsx` (557 l.) | `wc -l` | Separar contenido por dominio (`content/projects/*`, …) y extraer el motor de QA a un hook |
| R-08 | Textos de UI hardcodeados en componentes | Sección 2 | Moverlos a contenido tipado (prerrequisito de los modos) |
| R-09 | Tests acoplados a copys literales | `src/test/*` | Usar roles, `data-testid` o los datos importados en lugar de strings |
| R-10 | Esquema de contacto duplicado en `api/` y `src/types/contact.ts` (riesgo de divergencia) | `api/contact.ts` | Paquete compartido o build step; mientras tanto, un test que compare ambos esquemas. **F3-07b:** test de paridad en `tests/api/` |
| R-11 | Faltan cabeceras de seguridad: CSP, `Referrer-Policy`, `Permissions-Policy`, HSTS. `X-XSS-Protection` está obsoleta | `vercel.json` | Completar las cabeceras |
| R-12 | Protección de `main` por configurar en el repo | GitHub Settings | PR obligatorio, check de CI requerido, sin force-push ni borrado |

### Bajo

| ID | Hallazgo | Evidencia | Sugerencia |
|---|---|---|---|
| R-13 | Bundle único de 529 kB (framer-motion + react-icons + canvas) | Aviso del build | `React.lazy` por sección y revisar los imports de iconos |
| R-14 | Dos hooks de tema (`useTheme` y `useIsDark`) con fuentes de verdad distintas (estado vs. clase del DOM) | `src/hooks/` | Unificarlos en un contexto |

## 7. Supuestos y límites

- La cobertura es una estimación por inspección, no una medición.
- No incluye la configuración del proyecto en Vercel (variables, dominios, analytics).
