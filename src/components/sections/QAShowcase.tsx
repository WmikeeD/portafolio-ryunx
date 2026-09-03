import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Loader2, Play, RotateCcw, Terminal, X } from 'lucide-react'
import { qaRunSummary, qaTestCases } from '../../data/portfolioData'
import type { TestCaseResult, TestStatus } from '../../types'

type RunState = 'idle' | 'running' | 'complete'

const BUTTON_LABEL: Record<RunState, string> = {
  idle: 'Ejecutar Suite de Testing',
  running: 'Ejecutando…',
  complete: 'Volver a ejecutar',
}

const STATUS_TAG: Record<TestStatus, { label: string; className: string }> = {
  idle: { label: 'PEND', className: 'text-slate-400 dark:text-slate-500' },
  running: { label: 'RUN', className: 'text-sky-700 dark:text-brand-primary' },
  passed: {
    label: 'PASS',
    className: 'text-emerald-600 dark:text-brand-secondary',
  },
  failed: { label: 'FAIL', className: 'text-red-500' },
}

/** Milisegundos de animación por transición de estado de cada caso. */
const STEP_TO_RUNNING = 260
const STEP_TO_PASSED = 200

function toIdleResults(): TestCaseResult[] {
  return qaTestCases.map((testCase) => ({ ...testCase, status: 'idle' as const }))
}

function RunButtonIcon({ runState }: { runState: RunState }) {
  if (runState === 'running') {
    return <Loader2 className="size-4 animate-spin" aria-hidden="true" />
  }
  if (runState === 'complete') {
    return <RotateCcw className="size-4" aria-hidden="true" />
  }
  return <Play className="size-4" aria-hidden="true" />
}

function StatusGlyph({ status }: { status: TestStatus }) {
  const className = 'size-4 shrink-0'

  switch (status) {
    case 'passed':
      return (
        <Check
          className={`${className} text-emerald-600 dark:text-brand-secondary`}
          aria-hidden="true"
        />
      )
    case 'failed':
      return <X className={`${className} text-red-500`} aria-hidden="true" />
    case 'running':
      return (
        <Loader2
          className={`${className} animate-spin text-sky-700 dark:text-brand-primary`}
          aria-hidden="true"
        />
      )
    default:
      return (
        <span
          className={`${className} rounded-full border border-dashed border-slate-400 dark:border-slate-600`}
          aria-hidden="true"
        />
      )
  }
}

function QAShowcase() {
  const [runState, setRunState] = useState<RunState>('idle')
  const [results, setResults] = useState<TestCaseResult[]>(toIdleResults)
  const timersRef = useRef<number[]>([])

  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout)
      timersRef.current = []
    }
  }, [])

  const completedCount = results.filter(
    (result) => result.status === 'passed' || result.status === 'failed',
  ).length
  const passedCount = results.filter(
    (result) => result.status === 'passed',
  ).length
  const failedCount = results.filter(
    (result) => result.status === 'failed',
  ).length
  const progress =
    results.length === 0
      ? 0
      : Math.round((completedCount / results.length) * 100)

  const runSuite = () => {
    if (runState === 'running') {
      return
    }

    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    setRunState('running')
    setResults(toIdleResults())

    let offset = 0

    for (let index = 0; index < qaTestCases.length; index += 1) {
      const isLast = index === qaTestCases.length - 1

      offset += STEP_TO_RUNNING
      timersRef.current.push(
        window.setTimeout(() => {
          setResults((prev) =>
            prev.map((result, position) =>
              position === index
                ? { ...result, status: 'running' as const }
                : result,
            ),
          )
        }, offset),
      )

      offset += STEP_TO_PASSED
      timersRef.current.push(
        window.setTimeout(() => {
          setResults((prev) =>
            prev.map((result, position) =>
              position === index
                ? { ...result, status: 'passed' as const }
                : result,
            ),
          )
          if (isLast) {
            setRunState('complete')
          }
        }, offset),
      )
    }
  }

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
          <p className="max-w-2xl text-slate-600 dark:text-slate-400">
            Shift-left testing y suites automatizadas que reducen las incidencias
            en producción antes de cada release.
          </p>
        </header>

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
            <div className="flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={runSuite}
                disabled={runState === 'running'}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-semibold text-brand-dark transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RunButtonIcon runState={runState} />
                {BUTTON_LABEL[runState]}
              </button>

              <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                {completedCount}/{results.length} casos · {progress}%
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

            <ol className="flex flex-col divide-y divide-slate-200 font-mono text-sm dark:divide-slate-800">
              {results.map((result) => {
                const tag = STATUS_TAG[result.status]

                return (
                  <li key={result.id} className="flex items-start gap-3 py-3">
                    <StatusGlyph status={result.status} />
                    <div className="flex flex-1 flex-col gap-0.5">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {result.testName}
                        </span>
                        <span className="flex flex-wrap items-center gap-x-1.5 text-xs text-slate-400 dark:text-slate-500">
                          <span className={`font-bold ${tag.className}`}>
                            {tag.label}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{result.suite}</span>
                          {result.status === 'passed' && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span>{result.durationMs} ms</span>
                            </>
                          )}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {result.assertion}
                      </span>
                    </div>
                  </li>
                )
              })}
            </ol>

            {runState === 'complete' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="flex flex-wrap gap-2 border-t border-slate-200 pt-4 dark:border-slate-800"
              >
                <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-brand-secondary">
                  Cobertura: {qaRunSummary.coverage}
                </span>
                <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-brand-secondary">
                  {failedCount} Fallos
                </span>
                <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-brand-secondary">
                  Status: {failedCount === 0 ? 'Passing' : 'Failing'}
                </span>
                <span className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
                  {passedCount}/{qaRunSummary.totalTests} tests ·{' '}
                  {qaRunSummary.executionTime}
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
