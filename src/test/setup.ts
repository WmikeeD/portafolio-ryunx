import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

afterEach(() => {
  cleanup()
})

// Vercel Web Analytics inyecta un <script> en document.head y globals `window.va*`
// al montarse. En jsdom no aporta nada y solo ensucia el entorno, así que lo
// neutralizamos: <App/> se monta sin efectos colaterales ni advertencias.
vi.mock('@vercel/analytics/react', () => ({
  Analytics: () => null,
}))

// jsdom no implementa matchMedia; framer-motion lo consulta (prefers-reduced-motion).
if (!('matchMedia' in window)) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: vi.fn((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
}

// jsdom no implementa el contexto 2D de <canvas>; el fondo animado del Hero lo
// consulta y debe degradar sin ruido cuando no está disponible.
if (typeof HTMLCanvasElement !== 'undefined') {
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    writable: true,
    configurable: true,
    value: vi.fn(() => null),
  })
}

// jsdom no implementa IntersectionObserver; framer-motion lo usa para `whileInView`.
if (!('IntersectionObserver' in window)) {
  class MockIntersectionObserver {
    readonly root: Element | null = null
    readonly rootMargin: string = '0px'
    readonly thresholds: readonly number[] = [0]

    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
    takeRecords(): IntersectionObserverEntry[] {
      return []
    }
  }

  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  })
  Object.defineProperty(globalThis, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  })
}
