import { useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { navLinks } from '../../data/portfolioData'
import { useTheme } from '../../hooks/useTheme'

const linkClass =
  'text-sm font-medium text-slate-600 transition-colors hover:text-brand-primary dark:text-slate-400'

const iconButtonClass =
  'rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-900/5 hover:text-brand-primary dark:text-slate-400 dark:hover:bg-white/10'

function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md transition-colors duration-300 dark:border-slate-800 dark:bg-brand-card/80">
      <nav
        aria-label="Principal"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
      >
        <a
          href="#inicio"
          className="text-lg font-bold tracking-tight text-slate-900 dark:text-white"
        >
          Mayckol<span className="text-brand-primary">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={linkClass}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
            className={iconButtonClass}
          >
            {isDark ? (
              <Sun className="size-5" aria-hidden="true" />
            ) : (
              <Moon className="size-5" aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className={`${iconButtonClass} md:hidden`}
          >
            {isMenuOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      <nav
        id="mobile-menu"
        aria-label="Navegación móvil"
        hidden={!isMenuOpen}
        className="border-t border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-brand-card/80 md:hidden"
      >
        <ul className="flex flex-col gap-1 px-6 py-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-900/5 hover:text-brand-primary dark:text-slate-400 dark:hover:bg-white/10"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
