import type { FC, SVGProps } from 'react'
import { Mail } from 'lucide-react'
import type { SocialLink } from '../../types'

type GlyphProps = SVGProps<SVGSVGElement>

// lucide-react retiró los iconos de marca; usamos los glifos oficiales inline.
const GithubGlyph: FC<GlyphProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.28-.01-1.02-.02-2.01-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.29 0 .32.22.7.82.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
  </svg>
)

const LinkedinGlyph: FC<GlyphProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.8 0 0 .77 0 1.72v20.55C0 23.23.8 24 1.77 24h20.45C23.2 24 24 23.23 24 22.27V1.72C24 .77 23.2 0 22.22 0Z" />
  </svg>
)

const MailGlyph: FC<GlyphProps> = (props) => <Mail {...props} />

const GLYPHS: Record<SocialLink['icon'], FC<GlyphProps>> = {
  github: GithubGlyph,
  linkedin: LinkedinGlyph,
  mail: MailGlyph,
}

interface SocialLinksProps {
  links: SocialLink[]
  className?: string
}

export function SocialLinks({ links, className }: SocialLinksProps) {
  return (
    <ul className={className}>
      {links.map((link) => {
        const Glyph = GLYPHS[link.icon]
        const isExternal = link.href.startsWith('http')

        return (
          <li key={link.href}>
            <a
              href={link.href}
              aria-label={link.label}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noreferrer noopener' : undefined}
              className="inline-flex rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-900/5 hover:text-brand-primary dark:text-slate-400 dark:hover:bg-white/10"
            >
              <Glyph className="size-5" aria-hidden="true" />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
