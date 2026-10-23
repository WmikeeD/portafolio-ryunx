import { useEffect, useRef } from 'react'
import { useIsDark } from '../../hooks/useIsDark'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { SceneCanvas } from './SceneCanvas'

/** Color base del lienzo por tema (bajo el canvas y los glows). */
const BASE_BG = {
  dark: '#0a0e17',
  light: '#f8fafc',
}

/** Glow central que "respira" detrás del contenido (animación CSS `breathe`). */
const BREATHING_GLOW = {
  dark: 'radial-gradient(circle, rgba(56,189,248,0.20) 0%, rgba(94,234,212,0.10) 35%, transparent 70%)',
  light:
    'radial-gradient(circle, rgba(37,99,235,0.14) 0%, rgba(13,148,136,0.09) 35%, transparent 70%)',
}

/** Halo radial que sigue al cursor a nivel de ventana. */
const MOUSE_GLOW = {
  dark: 'radial-gradient(circle, rgba(56,189,248,0.18) 0%, rgba(56,189,248,0.05) 45%, transparent 70%)',
  light:
    'radial-gradient(circle, rgba(37,99,235,0.22) 0%, rgba(37,99,235,0.08) 45%, transparent 72%)',
}

/**
 * Fondo continuo global: se monta una sola vez en la raíz de la app y cubre
 * todo el viewport (`fixed inset-0`) por detrás del contenido `z-10`. Incluye la
 * red de nodos + estrellas fugaces (`SceneCanvas`), el glow central respirando y
 * el halo que sigue al cursor. Todo es decorativo (`aria-hidden`), no captura el
 * puntero y respeta `prefers-reduced-motion: reduce`.
 */
function GlobalBackground() {
  const isDark = useIsDark()
  const reducedMotion = usePrefersReducedMotion()
  const mouseGlowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reducedMotion) {
      return
    }

    // Actualiza el halo por `ref.style` a nivel de window: cero re-renders.
    const moveGlow = (event: MouseEvent) => {
      const glow = mouseGlowRef.current
      if (!glow) {
        return
      }
      glow.style.left = `${event.clientX}px`
      glow.style.top = `${event.clientY}px`
      glow.style.opacity = '1'
    }

    const hideGlow = () => {
      const glow = mouseGlowRef.current
      if (glow) {
        glow.style.opacity = '0'
      }
    }

    window.addEventListener('mousemove', moveGlow, { passive: true })
    document.addEventListener('mouseleave', hideGlow)
    return () => {
      window.removeEventListener('mousemove', moveGlow)
      document.removeEventListener('mouseleave', hideGlow)
    }
  }, [reducedMotion])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: isDark ? BASE_BG.dark : BASE_BG.light }}
    >
      <SceneCanvas isDark={isDark} reducedMotion={reducedMotion} />

      <div
        className={`absolute left-1/2 top-1/2 size-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform${
          reducedMotion ? '' : ' animate-breathe'
        }`}
        style={{
          background: isDark ? BREATHING_GLOW.dark : BREATHING_GLOW.light,
          filter: 'blur(10px)',
        }}
      />

      {!reducedMotion && (
        <div
          ref={mouseGlowRef}
          className="absolute left-1/2 top-1/2 size-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-300"
          style={{ background: isDark ? MOUSE_GLOW.dark : MOUSE_GLOW.light }}
        />
      )}
    </div>
  )
}

export default GlobalBackground
