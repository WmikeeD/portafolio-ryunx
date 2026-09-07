import { useEffect, useState } from 'react'

function getSnapshot(): boolean {
  if (typeof document === 'undefined') {
    return false
  }
  return document.documentElement.classList.contains('dark')
}

/**
 * Refleja el modo de color activo leyendo la clase `dark` de `<html>` — la
 * fuente de verdad que aplica `useTheme`. Un `MutationObserver` mantiene el
 * valor sincronizado cuando el usuario alterna el tema desde el Navbar, sin
 * acoplar este árbol al estado interno del hook ni exigir un recargado.
 */
export function useIsDark(): boolean {
  const [isDark, setIsDark] = useState(getSnapshot)

  useEffect(() => {
    const root = document.documentElement
    const sync = () => setIsDark(root.classList.contains('dark'))

    sync()
    const observer = new MutationObserver(sync)
    observer.observe(root, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  return isDark
}
