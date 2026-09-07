import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ChevronDown, Loader2, Play, RotateCcw, Terminal } from 'lucide-react'
import { QA_COVERAGE, showcaseProjects, testCases } from '../../data/portfolioData'
import type {
  GlobalSuiteState,
  ProjectRunState,
  ProjectRunStateMap,
  ShowcaseProject,
  TestCase,
  TestStatus,
  TestType,
} from '../../types'
import {
  FOCUS_QA_GROUP_EVENT,
  HIGHLIGHT_MS,
  highlightProjectCard,
  onCrossLink,
  smoothScrollToId,
} from '../../lib/crossLink'

type SuiteTab = 'featured' | 'all'

/** Resultado en vivo de un caso durante la simulación. */
interface CaseResult {
  estado: TestStatus
  /** Duración real generada en la última ejecución (ms). */
  ms: number
}

/** Índice de casos por `proyecto_id`, preservando el orden de `testCases`. */
const CASES_BY_PROJECT = new Map<string, TestCase[]>()
for (const testCase of testCases) {
  const bucket = CASES_BY_PROJECT.get(testCase.proyecto_id)
  if (bucket) {
    bucket.push(testCase)
  } else {
    CASES_BY_PROJECT.set(testCase.proyecto_id, [testCase])
  }
}

const FEATURED_ID_SET = new Set(
  showcaseProjects.filter((project) => project.isFeatured).map((p) => p.id),
)
const PROJECT_IDS = new Set(showcaseProjects.map((project) => project.id))

/** Ventana aleatoria por caso: 150–900 ms. */
const MIN_DELAY_MS = 150
const MAX_DELAY_MS = 900
/** Escalonado de arranque entre casos de un proyecto (se ejecutan en paralelo). */
const CASE_STAGGER_MS = 25
/** Pausa de traspaso entre proyectos (colapso del anterior ➔ expansión del siguiente). */
const HANDOFF_MS = 360

const GLOBAL_BUTTON_LABEL: Record<GlobalSuiteState, string> = {
  IDLE: 'Ejecutar Suite de Testing',
  RUNNING_SUITE: 'Ejecutando…',
  COMPLETED_SUITE: 'Volver a ejecutar',
}

const PROJECT_RUN_LABEL: Record<ProjectRunState, string> = {
  IDLE: 'Ejecutar',
  QUEUED: 'En cola',
  RUNNING: 'Ejecutando…',
  PASSED: 'Passed',
}

const STATUS_CLASS: Record<TestStatus, string> = {
  PEND: 'text-slate-400 dark:text-slate-500',
  RUNNING: 'text-sky-700 dark:text-brand-primary',
  PASS: 'text-emerald-600 dark:text-brand-secondary',
}

/** Paleta armónica de tags por tipo de prueba. */
const TYPE_TAG_CLASS: Record<TestType, string> = {
  Unit: 'border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400',
  Integración:
    'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  Concurrencia:
    'border-purple-500/20 bg-purple-500/10 text-purple-600 dark:text-purple-400',
  Seguridad:
    'border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400',
  Performance: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
  Robustez:
    'border-slate-400/20 bg-slate-400/10 text-slate-600 dark:text-slate-300',
  Sincronización:
    'border-cyan-500/20 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
}

const activeTabClass =
  'inline-flex items-center gap-2 rounded-full border border-brand-primary bg-brand-primary/10 px-4 py-2 text-sm font-semibold text-sky-700 transition-colors dark:text-brand-primary'

const idleTabClass =
  'inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-600 backdrop-blur-md transition-colors hover:border-brand-primary/50 hover:text-brand-primary dark:border-slate-800 dark:bg-brand-card/80 dark:text-slate-400'

const summaryBadgeClass =
  'rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-brand-secondary'

const pillCountClass =
  'rounded-full bg-slate-100 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-slate-500 dark:bg-slate-800 dark:text-slate-400'

function randomDelay(): number {
  return Math.round(MIN_DELAY_MS + Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS))
}

/** Casos visibles bajo el filtro activo. */
function casesForTab(tab: SuiteTab): TestCase[] {
  return tab === 'featured'
    ? testCases.filter((testCase) => FEATURED_ID_SET.has(testCase.proyecto_id))
    : testCases
}

/** Lista ordenada de proyectos del filtro activo que tienen casos asociados. */
function projectsForTab(tab: SuiteTab): ShowcaseProject[] {
  return showcaseProjects.filter((project) => {
    if (!CASES_BY_PROJECT.has(project.id)) {
      return false
    }
    return tab === 'all' || project.isFeatured
  })
}

function buildPendingResults(
  cases: readonly TestCase[],
): Record<string, CaseResult> {
  const results: Record<string, CaseResult> = {}
  for (const testCase of cases) {
    results[testCase.id] = { estado: 'PEND', ms: testCase.tiempo_simulado_ms }
  }
  return results
}

function buildProjectStates(
  projects: readonly ShowcaseProject[],
  resolve: (index: number) => ProjectRunState,
): ProjectRunStateMap {
  const map: ProjectRunStateMap = {}
  projects.forEach((project, index) => {
    map[project.id] = resolve(index)
  })
  return map
}

function GlobalRunIcon({ state }: { state: GlobalSuiteState }) {
  if (state === 'RUNNING_SUITE') {
    return <Loader2 className="size-4 animate-spin" aria-hidden="true" />
  }
  if (state === 'COMPLETED_SUITE') {
    return <RotateCcw className="size-4" aria-hidden="true" />
  }
  return <Play className="size-4" aria-hidden="true" />
}

function ProjectRunIcon({ state }: { state: ProjectRunState }) {
  if (state === 'RUNNING') {
    return <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
  }
  if (state === 'PASSED') {
    return <Check className="size-3.5" aria-hidden="true" />
  }
  return (
    <Play
      className={state === 'QUEUED' ? 'size-3.5 opacity-40' : 'size-3.5'}
      aria-hidden="true"
    />
  )
}

function QAShowcase() {
  const [tab, setTab] = useState<SuiteTab>('featured')
  const [globalState, setGlobalState] = useState<GlobalSuiteState>('IDLE')
  const [projectStates, setProjectStates] = useState<ProjectRunStateMap>(() =>
    buildProjectStates(projectsForTab('featured'), () => 'IDLE'),
  )
  const [expandedProjects, setExpandedProjects] = useState<
    Record<string, boolean>
  >({})
  const [caseResults, setCaseResults] = useState<Record<string, CaseResult>>(
    () => buildPendingResults(casesForTab('featured')),
  )
  const [projectDurations, setProjectDurations] = useState<
    Record<string, number>
  >({})
  const [runningIndex, setRunningIndex] = useState(-1)
  const [highlightedGroup, setHighlightedGroup] = useState<string | null>(null)
  const timersRef = useRef<number[]>([])

  const clearTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id))
    timersRef.current = []
  }
  const pushTimer = (fn: () => void, at: number) => {
    timersRef.current.push(window.setTimeout(fn, at))
  }

  useEffect(() => clearTimers, [])

  const orderedProjects = useMemo(() => projectsForTab(tab), [tab])
  const activeCases = useMemo(() => casesForTab(tab), [tab])
  const groups = useMemo(
    () =>
      orderedProjects.map((project) => ({
        project,
        cases: CASES_BY_PROJECT.get(project.id) ?? [],
      })),
    [orderedProjects],
  )

  const completedCount = activeCases.reduce(
    (acc, testCase) =>
      acc + (caseResults[testCase.id]?.estado === 'PASS' ? 1 : 0),
    0,
  )
  const total = activeCases.length
  const progress = total === 0 ? 0 : Math.round((completedCount / total) * 100)
  const summaryMs = orderedProjects.reduce(
    (acc, project) => acc + (projectDurations[project.id] ?? 0),
    0,
  )
  const suiteRunning = globalState === 'RUNNING_SUITE'
  const runningProject =
    runningIndex >= 0 ? orderedProjects[runningIndex] : undefined

  const resetSuite = (next: SuiteTab, opened: Record<string, boolean> = {}) => {
    clearTimers()
    setTab(next)
    setGlobalState('IDLE')
    setRunningIndex(-1)
    setProjectStates(buildProjectStates(projectsForTab(next), () => 'IDLE'))
    setExpandedProjects(opened)
    setCaseResults(buildPendingResults(casesForTab(next)))
    setProjectDurations({})
  }

  const changeTab = (next: SuiteTab) => {
    if (next !== tab) {
      resetSuite(next)
    }
  }

  const toggleGroup = (projectId: string) => {
    setExpandedProjects((prev) => ({ ...prev, [projectId]: !prev[projectId] }))
  }

  /** Programa la simulación de un proyecto a partir de `offset` ms. */
  const scheduleProject = (projectId: string, offset: number): number => {
    const projectCases = CASES_BY_PROJECT.get(projectId) ?? []
    const delays = projectCases.map(() => randomDelay())
    const finishAt = (caseIndex: number) =>
      caseIndex * CASE_STAGGER_MS + delays[caseIndex]
    const windowMs = projectCases.length
      ? Math.max(...projectCases.map((_, caseIndex) => finishAt(caseIndex)))
      : 0

    projectCases.forEach((testCase, caseIndex) => {
      const ms = delays[caseIndex]
      pushTimer(() => {
        setCaseResults((prev) => ({
          ...prev,
          [testCase.id]: { estado: 'RUNNING', ms },
        }))
      }, offset + caseIndex * CASE_STAGGER_MS)
      pushTimer(() => {
        setCaseResults((prev) => ({
          ...prev,
          [testCase.id]: { estado: 'PASS', ms },
        }))
      }, offset + finishAt(caseIndex))
    })

    return windowMs
  }

  /** Ejecución global: itera los proyectos del filtro activo en secuencia estricta. */
  const runSuite = () => {
    clearTimers()
    const projects = orderedProjects
    if (projects.length === 0) {
      return
    }

    setGlobalState('RUNNING_SUITE')
    setRunningIndex(0)
    setProjectStates(
      buildProjectStates(projects, (index) =>
        index === 0 ? 'RUNNING' : 'QUEUED',
      ),
    )
    setExpandedProjects({ [projects[0].id]: true })
    setCaseResults(buildPendingResults(activeCases))
    setProjectDurations({})

    let clock = 0
    projects.forEach((project, index) => {
      const startAt = clock
      const isLast = index === projects.length - 1

      if (index > 0) {
        pushTimer(() => {
          setProjectStates((prev) => ({ ...prev, [project.id]: 'RUNNING' }))
          setExpandedProjects((prev) => ({ ...prev, [project.id]: true }))
          setRunningIndex(index)
        }, startAt)
      }

      const windowMs = scheduleProject(project.id, startAt)

      pushTimer(() => {
        setProjectStates((prev) => ({ ...prev, [project.id]: 'PASSED' }))
        setProjectDurations((prev) => ({ ...prev, [project.id]: windowMs }))
        setExpandedProjects((prev) => ({ ...prev, [project.id]: false }))
        if (isLast) {
          setGlobalState('COMPLETED_SUITE')
          setRunningIndex(-1)
        }
      }, startAt + windowMs)

      clock = startAt + windowMs + HANDOFF_MS
    })
  }

  /**
   * Ejecución individual aislada: solo el proyecto indicado corre, sin tocar la
   * suite ni interrumpir otras ejecuciones individuales en vuelo.
   */
  const runProject = (projectId: string) => {
    if (suiteRunning || projectStates[projectId] === 'RUNNING') {
      return
    }

    const projectCases = CASES_BY_PROJECT.get(projectId) ?? []

    setProjectStates((prev) => ({ ...prev, [projectId]: 'RUNNING' }))
    setExpandedProjects((prev) => ({ ...prev, [projectId]: true }))
    setCaseResults((prev) => {
      const next = { ...prev }
      for (const testCase of projectCases) {
        next[testCase.id] = { estado: 'PEND', ms: testCase.tiempo_simulado_ms }
      }
      return next
    })

    const windowMs = scheduleProject(projectId, 0)

    pushTimer(() => {
      setProjectStates((prev) => ({ ...prev, [projectId]: 'PASSED' }))
      setProjectDurations((prev) => ({ ...prev, [projectId]: windowMs }))
    }, windowMs)
  }

  useEffect(() => {
    return onCrossLink(FOCUS_QA_GROUP_EVENT, (projectId) => {
      if (!PROJECT_IDS.has(projectId)) {
        return
      }
      if (tab === 'featured' && !FEATURED_ID_SET.has(projectId)) {
        resetSuite('all', { [projectId]: true })
      } else {
        setExpandedProjects((prev) => ({ ...prev, [projectId]: true }))
      }
      setHighlightedGroup(projectId)
      smoothScrollToId(`qa-group-${projectId}`)
      pushTimer(() => setHighlightedGroup(null), HIGHLIGHT_MS)
    })
    // `tab` en deps: el handler decide el reseteo con el filtro vigente.
  }, [tab])

  return (
    <section id="qa" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-700 dark:text-brand-primary">
            QA &amp; Testing Showcase
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Gobernanza de Calidad &amp; QA Automation
          </h2>
          <p className="max-w-3xl text-slate-600 dark:text-slate-400">
            Antes de cada entrega, verifico que el sistema no falle en los
            momentos críticos: 28 casos de prueba cubren consistencia de datos,
            seguridad, concurrencia y rendimiento a lo largo de mis proyectos
            principales, con 0 fallos en la última ejecución. Explora la suite
            completa abajo o revisa un proyecto puntual.
          </p>
        </header>

        <div
          role="group"
          aria-label="Alcance de la suite de pruebas"
          className="mb-6 flex flex-wrap gap-2"
        >
          <button
            type="button"
            aria-pressed={tab === 'featured'}
            onClick={() => changeTab('featured')}
            className={tab === 'featured' ? activeTabClass : idleTabClass}
          >
            Destacados
            <span className={pillCountClass}>{casesForTab('featured').length}</span>
          </button>
          <button
            type="button"
            aria-pressed={tab === 'all'}
            onClick={() => changeTab('all')}
            className={tab === 'all' ? activeTabClass : idleTabClass}
          >
            Todos los proyectos
            <span className={pillCountClass}>{testCases.length}</span>
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-brand-card/90">
          <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/50">
            <span aria-hidden="true" className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-red-400/70" />
              <span className="size-2.5 rounded-full bg-amber-400/70" />
              <span className="size-2.5 rounded-full bg-emerald-400/70" />
            </span>
            <span className="flex items-center gap-2 font-mono text-xs text-slate-500 dark:text-slate-400">
              <Terminal className="size-3.5" aria-hidden="true" />
              qa-suite · mayckol@portfolio
            </span>
          </div>

          <div className="flex flex-col gap-5 p-4 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={runSuite}
                  disabled={suiteRunning}
                  aria-busy={suiteRunning}
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-semibold text-brand-dark transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <GlobalRunIcon state={globalState} />
                  {GLOBAL_BUTTON_LABEL[globalState]}
                </button>

                {suiteRunning && runningProject && (
                  <p
                    role="status"
                    aria-live="polite"
                    className="animate-pulse font-mono text-xs text-amber-700 dark:text-brand-accent"
                  >
                    Ejecutando proyecto {runningIndex + 1} de{' '}
                    {orderedProjects.length}: {runningProject.title}
                  </p>
                )}
              </div>

              <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                {completedCount}/{total} casos · {progress}%
              </span>
            </div>

            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
              aria-label="Progreso de la ejecución de la suite"
              className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
            >
              <motion.div
                className="h-full rounded-full bg-brand-primary"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>

            <div className="flex flex-col gap-3">
              {groups.map(({ project, cases }) => {
                const open = Boolean(expandedProjects[project.id])
                const bodyId = `qa-group-body-${project.id}`
                const isHighlighted = highlightedGroup === project.id
                const runState = projectStates[project.id] ?? 'IDLE'
                const runDisabled =
                  suiteRunning ||
                  runState === 'RUNNING' ||
                  runState === 'QUEUED'

                return (
                  <div
                    key={project.id}
                    id={`qa-group-${project.id}`}
                    className={
                      isHighlighted
                        ? 'rounded-xl border border-emerald-400 ring-2 ring-emerald-400/50 transition-colors dark:border-brand-secondary'
                        : 'rounded-xl border border-slate-200 transition-colors dark:border-slate-800'
                    }
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        <a
                          href="#proyectos"
                          onClick={() => highlightProjectCard(project.id)}
                          className="text-sm font-semibold text-sky-700 transition-colors hover:text-brand-primary dark:text-brand-primary"
                        >
                          {project.title}
                        </a>
                        <button
                          type="button"
                          onClick={() => runProject(project.id)}
                          disabled={runDisabled}
                          aria-label={`Probar proyecto ${project.title}`}
                          className={
                            runState === 'PASSED'
                              ? 'inline-flex items-center gap-1.5 rounded-md border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-700 transition-colors disabled:cursor-not-allowed dark:text-brand-secondary'
                              : 'inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600 transition-colors hover:border-brand-primary/50 hover:text-brand-primary disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300'
                          }
                        >
                          <ProjectRunIcon state={runState} />
                          {PROJECT_RUN_LABEL[runState]}
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleGroup(project.id)}
                        aria-expanded={open}
                        aria-controls={bodyId}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:border-brand-primary/50 hover:text-brand-primary dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300"
                      >
                        {cases.length} casos
                        <ChevronDown
                          className={
                            open
                              ? 'size-4 rotate-180 transition-transform'
                              : 'size-4 transition-transform'
                          }
                          aria-hidden="true"
                        />
                      </button>
                    </div>

                    <div id={bodyId}>
                      {open && (
                        <motion.ol
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25 }}
                          className="flex flex-col divide-y divide-slate-200 border-t border-slate-200 font-mono text-sm dark:divide-slate-800 dark:border-slate-800"
                        >
                          {cases.map((testCase) => {
                            const result = caseResults[testCase.id] ?? {
                              estado: 'PEND' as TestStatus,
                              ms: testCase.tiempo_simulado_ms,
                            }

                            return (
                              <li
                                key={testCase.id}
                                className="flex flex-col gap-1 px-4 py-3"
                              >
                                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                                    {testCase.titulo}
                                  </span>
                                  <span className="flex flex-wrap items-center gap-x-1.5 text-xs">
                                    <span
                                      className={`font-bold ${STATUS_CLASS[result.estado]}`}
                                    >
                                      {result.estado}
                                    </span>
                                    <span
                                      aria-hidden="true"
                                      className="text-slate-300 dark:text-slate-600"
                                    >
                                      ·
                                    </span>
                                    <span className="text-slate-500 dark:text-slate-400">
                                      {project.badge}
                                    </span>
                                    <span
                                      aria-hidden="true"
                                      className="text-slate-300 dark:text-slate-600"
                                    >
                                      ·
                                    </span>
                                    <span
                                      className={`rounded border px-1.5 py-0.5 text-[0.7rem] font-semibold ${TYPE_TAG_CLASS[testCase.tipo_prueba]}`}
                                    >
                                      {testCase.tipo_prueba}
                                    </span>
                                    {result.estado === 'PASS' && (
                                      <>
                                        <span
                                          aria-hidden="true"
                                          className="text-slate-300 dark:text-slate-600"
                                        >
                                          ·
                                        </span>
                                        <span className="text-slate-500 dark:text-slate-400">
                                          {result.ms} ms
                                        </span>
                                      </>
                                    )}
                                  </span>
                                </div>
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                  {testCase.descripcion}
                                </span>
                              </li>
                            )
                          })}
                        </motion.ol>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {globalState === 'COMPLETED_SUITE' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="flex flex-wrap gap-2 border-t border-slate-200 pt-4 dark:border-slate-800"
              >
                <span className={summaryBadgeClass}>Cobertura: {QA_COVERAGE}</span>
                <span className={summaryBadgeClass}>0 Fallos</span>
                <span className={summaryBadgeClass}>Status: Passing</span>
                <span className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
                  {completedCount}/{total} tests · {(summaryMs / 1000).toFixed(2)}s
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default QAShowcase
