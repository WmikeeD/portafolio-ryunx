import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function getSnapshot(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false
  }
  return window.matchMedia(QUERY).matches
}

/**
 * `true` cuando el sistema pide reducir el movimiento. Reacciona en vivo si el
 * usuario cambia la preferencia del SO durante la sesión.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(getSnapshot)

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function'
    ) {
      return
    }

    const media = window.matchMedia(QUERY)
    const sync = () => setReduced(media.matches)

    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  return reduced
}
