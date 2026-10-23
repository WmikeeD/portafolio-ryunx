/**
 * Bus de eventos ligero para el cross-linking bidireccional entre la sección de
 * Proyectos y el QA Showcase, sin acoplar sus árboles de componentes.
 */

/** Proyectos ➜ QA Showcase: enfoca (expande + resalta) el grupo de un proyecto. */
export const FOCUS_QA_GROUP_EVENT = 'portfolio:focus-qa-group'

/** QA Showcase ➜ Proyectos: resalta temporalmente la tarjeta de un proyecto. */
export const HIGHLIGHT_PROJECT_CARD_EVENT = 'portfolio:highlight-project-card'

/** Duración del realce transitorio de confirmación visual del salto. */
export const HIGHLIGHT_MS = 1500

interface CrossLinkDetail {
  projectId: string
}

function dispatch(eventName: string, projectId: string): void {
  if (typeof window === 'undefined') {
    return
  }
  window.dispatchEvent(
    new CustomEvent<CrossLinkDetail>(eventName, { detail: { projectId } }),
  )
}

export const focusQaGroup = (projectId: string): void =>
  dispatch(FOCUS_QA_GROUP_EVENT, projectId)

export const highlightProjectCard = (projectId: string): void =>
  dispatch(HIGHLIGHT_PROJECT_CARD_EVENT, projectId)

/**
 * Suscribe un handler a un evento de cross-linking. Devuelve la función de
 * limpieza para usar directamente en el retorno de `useEffect`.
 */
export function onCrossLink(
  eventName: string,
  handler: (projectId: string) => void,
): () => void {
  if (typeof window === 'undefined') {
    return () => {}
  }

  const listener = (event: Event) => {
    const detail = (event as CustomEvent<CrossLinkDetail>).detail
    if (detail?.projectId) {
      handler(detail.projectId)
    }
  }

  window.addEventListener(eventName, listener)
  return () => window.removeEventListener(eventName, listener)
}

/** Scroll suave hacia un elemento por id; no-op silencioso fuera del navegador. */
export function smoothScrollToId(elementId: string): void {
  if (typeof document === 'undefined') {
    return
  }
  const element = document.getElementById(elementId)
  if (!element) {
    return
  }
  try {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' })
  } catch {
    /* jsdom u otros entornos sin layout: sin scroll real. */
  }
}
