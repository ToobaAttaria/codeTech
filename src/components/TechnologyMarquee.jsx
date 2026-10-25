import { Bot } from 'lucide-react'
import {
  siCss,
  siFastapi,
  siFirebase,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siWordpress,
} from 'simple-icons'

const technologies = [
  { name: 'React', icon: siReact },
  { name: 'Next.js', icon: siNextdotjs, color: '#f5f5f0' },
  { name: 'JavaScript', icon: siJavascript },
  { name: 'TypeScript', icon: siTypescript },
  { name: 'HTML5', icon: siHtml5 },
  { name: 'CSS3', icon: siCss },
  { name: 'Tailwind CSS', icon: siTailwindcss },
  { name: 'Python', icon: siPython },
  { name: 'FastAPI', icon: siFastapi },
  { name: 'Node.js', icon: siNodedotjs },
  { name: 'PostgreSQL', icon: siPostgresql },
  { name: 'MongoDB', icon: siMongodb },
  { name: 'Supabase', icon: siSupabase },
  { name: 'Firebase', icon: siFirebase },
  { name: 'Git', icon: siGit },
  { name: 'GitHub', icon: siGithub, color: '#f5f5f0' },
  { name: 'WordPress', icon: siWordpress },
  { name: 'AI Automation', icon: Bot },
]

function TechnologyList({ decorative = false }) {
  return (
    <ul className="technology-marquee-list" aria-hidden={decorative || undefined}>
      {technologies.map(({ name, icon, color }) => {
        const Icon = icon
        return (
          <li className="technology-marquee-item" key={name}>
            {icon.path ? (
              <svg
                className="technology-icon"
                viewBox="0 0 24 24"
                fill={color || `#${icon.hex}`}
                aria-hidden="true"
                focusable="false"
              >
                <path d={icon.path} />
              </svg>
            ) : (
              <Icon className="technology-icon technology-icon-generic" size={21} strokeWidth={1.7} aria-hidden="true" />
            )}
            <span>{name}</span>
          </li>
        )
      })}
    </ul>
  )
}

export default function TechnologyMarquee() {
  return (
    <section className="technology-marquee" id="technologies" aria-label="Technologies">
      <div className="technology-marquee-track">
        <TechnologyList />
        <TechnologyList decorative />
      </div>
    </section>
  )
}
