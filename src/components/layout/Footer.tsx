import { ArrowUp } from 'lucide-react'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 px-6 py-10 dark:border-slate-800">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            © {year} Mayckol Rodríguez Sánchez
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500">
            Desarrollado con React, Vite, TypeScript &amp; Tailwind CSS
          </p>
        </div>

        <a
          href="#inicio"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-700 transition-colors hover:text-brand-primary dark:text-brand-primary dark:hover:text-white"
        >
          Volver al inicio
          <ArrowUp className="size-4" aria-hidden="true" />
        </a>
      </div>
    </footer>
  )
}

export default Footer
