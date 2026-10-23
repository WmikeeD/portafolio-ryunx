import { useEffect, useRef } from 'react'

interface SceneCanvasProps {
  isDark: boolean
  reducedMotion: boolean
}

/** Nodo flotante de la red. */
interface Node {
  x: number
  y: number
  vx: number
  vy: number
}

/** Estrella fugaz con origen y destino precalculados (solo modo oscuro). */
interface ShootingStar {
  startX: number
  startY: number
  endX: number
  endY: number
  life: number
  duration: number
}

const NODE_COUNT = 34
const LINK_DISTANCE = 150
const MAX_SPEED = 0.15
const STAR_MIN_GAP_MS = 4000
const STAR_MAX_GAP_MS = 9000

const PALETTE = {
  dark: {
    node: '94, 234, 212',
    nodeAlpha: 0.55,
    link: '56, 189, 248',
    linkAlpha: 0.25,
  },
  light: {
    node: '13, 148, 136',
    nodeAlpha: 0.45,
    link: '37, 99, 235',
    linkAlpha: 0.18,
  },
} as const

function driftVelocity(): number {
  return (Math.random() * 2 - 1) * MAX_SPEED
}

/**
 * Lienzo 2D a pantalla completa: red de nodos conectados (ambos temas) +
 * estrellas fugaces (exclusivas del modo oscuro). Una sola instancia de
 * `requestAnimationFrame`, cancelada junto con los listeners en el desmontaje.
 */
export function SceneCanvas({ isDark, reducedMotion }: SceneCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDarkRef = useRef(isDark)

  useEffect(() => {
    isDarkRef.current = isDark
  }, [isDark])

  useEffect(() => {
    if (reducedMotion) {
      return
    }

    const canvas = canvasRef.current
    if (!canvas) {
      return
    }
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return
    }

    let width = 0
    let height = 0
    let frameId = 0
    let starTimeoutId = 0
    let lastTime = performance.now()
    const nodes: Node[] = []
    let stars: ShootingStar[] = []

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      if (nodes.length === 0) {
        for (let i = 0; i < NODE_COUNT; i += 1) {
          nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: driftVelocity(),
            vy: driftVelocity(),
          })
        }
        return
      }

      // Reencaja las partículas dentro de los nuevos límites del viewport.
      for (const node of nodes) {
        if (node.x > width) node.x = Math.random() * width
        if (node.y > height) node.y = Math.random() * height
      }
    }

    const spawnStar = () => {
      const leftToRight = Math.random() < 0.5
      const startX = leftToRight ? -width * 0.1 : width * 1.1
      const endX = leftToRight ? width * 1.1 : -width * 0.1
      const startY = Math.random() * height * 0.7
      const endY = startY + (0.25 + Math.random() * 0.5) * height

      stars.push({
        startX,
        startY,
        endX,
        endY,
        life: 0,
        duration: 900 + Math.random() * 800,
      })
    }

    const scheduleStar = () => {
      const gap =
        STAR_MIN_GAP_MS + Math.random() * (STAR_MAX_GAP_MS - STAR_MIN_GAP_MS)
      starTimeoutId = window.setTimeout(() => {
        if (isDarkRef.current) {
          spawnStar()
        }
        scheduleStar()
      }, gap)
    }

    const drawNetwork = () => {
      const theme = isDarkRef.current ? PALETTE.dark : PALETTE.light

      for (const node of nodes) {
        node.x += node.vx
        node.y += node.vy
        if (node.x <= 0 || node.x >= width) {
          node.vx *= -1
          node.x = Math.max(0, Math.min(width, node.x))
        }
        if (node.y <= 0 || node.y >= height) {
          node.vy *= -1
          node.y = Math.max(0, Math.min(height, node.y))
        }
      }

      ctx.lineWidth = 1
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.hypot(dx, dy)
          if (distance >= LINK_DISTANCE) {
            continue
          }
          const strength = (1 - distance / LINK_DISTANCE) * theme.linkAlpha
          ctx.strokeStyle = `rgba(${theme.link}, ${strength})`
          ctx.beginPath()
          ctx.moveTo(nodes[i].x, nodes[i].y)
          ctx.lineTo(nodes[j].x, nodes[j].y)
          ctx.stroke()
        }
      }

      ctx.fillStyle = `rgba(${theme.node}, ${theme.nodeAlpha})`
      for (const node of nodes) {
        ctx.beginPath()
        ctx.arc(node.x, node.y, 1.6, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const drawStars = (delta: number) => {
      if (!isDarkRef.current) {
        stars = []
        return
      }

      stars = stars.filter((star) => {
        star.life += delta
        const progress = star.life / star.duration
        if (progress >= 1) {
          return false
        }

        // Seno sobre el ciclo de vida ⇒ fade in / fade out suave.
        const fade = Math.sin(progress * Math.PI)
        const headX = star.startX + (star.endX - star.startX) * progress
        const headY = star.startY + (star.endY - star.startY) * progress
        const tailProgress = Math.max(0, progress - 0.12)
        const tailX = star.startX + (star.endX - star.startX) * tailProgress
        const tailY = star.startY + (star.endY - star.startY) * tailProgress

        const gradient = ctx.createLinearGradient(tailX, tailY, headX, headY)
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
        gradient.addColorStop(1, `rgba(255, 255, 255, ${0.85 * fade})`)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(headX, headY)
        ctx.stroke()

        ctx.fillStyle = `rgba(255, 255, 255, ${fade})`
        ctx.beginPath()
        ctx.arc(headX, headY, 1.8, 0, Math.PI * 2)
        ctx.fill()
        return true
      })
    }

    const render = (time: number) => {
      const delta = time - lastTime
      lastTime = time

      ctx.clearRect(0, 0, width, height)
      drawNetwork()
      drawStars(delta)
      frameId = window.requestAnimationFrame(render)
    }

    resize()
    window.addEventListener('resize', resize)
    scheduleStar()
    frameId = window.requestAnimationFrame(render)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.clearTimeout(starTimeoutId)
      window.removeEventListener('resize', resize)
    }
  }, [reducedMotion])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full transition-opacity duration-500"
      style={{ opacity: reducedMotion ? 0 : 1 }}
    />
  )
}
