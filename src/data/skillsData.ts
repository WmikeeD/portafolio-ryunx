import {
  SiFlutter,
  SiGit,
  SiGithubactions,
  SiLaravel,
  SiMariadb,
  SiOpenjdk,
  SiReact,
  SiSap,
  SiTailwindcss,
  SiTestinglibrary,
  SiTypescript,
  SiVitest,
  SiVuedotjs,
} from 'react-icons/si'
import type { SkillCategory } from '../types'

/** Color neutro para los badges de iniciales (conceptos sin logo de marca). */
const NEUTRAL = '#38BDF8'

/**
 * Fuente única de verdad del stack técnico: 5 categorías, cada habilidad con su
 * logo oficial en SVG (`react-icons/si`, importes nombrados individuales para
 * preservar el tree-shaking) y su color de marca. Los conceptos de
 * arquitectura/metodología sin logo oficial usan `Icon: null` + `initials`.
 */
export const skillCategories: SkillCategory[] = [
  {
    category: 'Frontend & Mobile',
    skills: [
      { name: 'React', initials: 'Re', Icon: SiReact, color: '#61DAFB' },
      { name: 'Vue.js', initials: 'Vue', Icon: SiVuedotjs, color: '#42B883' },
      { name: 'TypeScript', initials: 'TS', Icon: SiTypescript, color: '#3178C6' },
      { name: 'Flutter', initials: 'Fl', Icon: SiFlutter, color: '#54C5F8' },
      {
        name: 'Tailwind CSS',
        initials: 'Tw',
        Icon: SiTailwindcss,
        color: '#38BDF8',
      },
    ],
  },
  {
    category: 'Backend & APIs',
    skills: [
      { name: 'Laravel', initials: 'Lv', Icon: SiLaravel, color: '#FF2D20' },
      { name: 'Java', initials: 'Jv', Icon: SiOpenjdk, color: '#E76F00' },
      { name: 'REST APIs', initials: 'API', Icon: null, color: NEUTRAL },
    ],
  },
  {
    category: 'Bases de Datos & ERP',
    skills: [
      { name: 'SAP HANA', initials: 'SAP', Icon: SiSap, color: '#0FAAFF' },
      { name: 'MariaDB', initials: 'Ma', Icon: SiMariadb, color: '#C0765A' },
      { name: 'Modelado SQL', initials: 'SQL', Icon: null, color: NEUTRAL },
    ],
  },
  {
    category: 'QA & Testing',
    skills: [
      { name: 'Vitest', initials: 'Vi', Icon: SiVitest, color: '#6E9F18' },
      {
        name: 'React Testing Library',
        initials: 'RTL',
        Icon: SiTestinglibrary,
        color: '#E33332',
      },
      { name: 'QA Testing', initials: 'QA', Icon: null, color: NEUTRAL },
    ],
  },
  {
    category: 'DevOps & AI Tools',
    skills: [
      { name: 'Git', initials: 'Git', Icon: SiGit, color: '#F05032' },
      {
        name: 'GitHub Actions',
        initials: 'CI',
        Icon: SiGithubactions,
        color: '#2088FF',
      },
      { name: 'CI/CD', initials: 'CD', Icon: null, color: NEUTRAL },
      {
        name: 'Claude Code / Agentes IA',
        initials: 'IA',
        Icon: null,
        color: NEUTRAL,
      },
    ],
  },
]
