import { useState } from 'react'
import { ArrowUpRight, Check, Sparkles } from 'lucide-react'
import { courses } from '../data/courses.js'
import { internships } from '../data/internships.js'
import { internshipApplicationFormUrl, shortCoursesFormUrl } from '../data/site.js'

const showcasePanels = [
  {
    eyebrow: 'SHORT COURSES',
    title: 'Learn modern technology',
    // description: 'Choose a practical learning path and build skills through focused, project-based courses.',
    image: courses[2].image,
    imageAlt: courses[2].imageAlt,
    icon: courses[2].icon,
    points: ['Python Programming', 'UI/UX Designing', 'AI Tools & Productivity'],
    link: shortCoursesFormUrl,
    action: 'Explore short courses',
  },
  {
    eyebrow: 'PROGRAMMING',
    title: courses[0].title,
    // description: courses[0].description,
    image: courses[0].image,
    imageAlt: courses[0].imageAlt,
    icon: courses[0].icon,
    points: courses[0].points.slice(0, 4),
    link: shortCoursesFormUrl,
    action: 'Enroll in this course',
  },
  {
    eyebrow: 'AI & AUTOMATION',
    title: 'Build with intelligent tools',
    // description: 'Explore prompting, AI tools and workflow automation through practical digital tasks.',
    image: courses[9].image,
    imageAlt: courses[9].imageAlt,
    icon: courses[9].icon,
    points: [courses[2].title, courses[10].title, courses[9].title, internships[3].title],
    link: shortCoursesFormUrl,
    action: 'Explore AI courses',
  },
  {
    eyebrow: 'WEB DEVELOPMENT',
    title: courses[6].title,
    // description: courses[6].description,
    image: courses[6].image,
    imageAlt: courses[6].imageAlt,
    icon: courses[6].icon,
    points: courses[6].points.slice(0, 4),
    link: shortCoursesFormUrl,
    action: 'Explore this course',
  },
  {
    eyebrow: 'CREATIVE DIGITAL SKILLS',
    title: 'Create, design and animate',
    // description: 'Develop creative skills across digital design, video and AI-assisted animation.',
    image: courses[1].image,
    imageAlt: courses[1].imageAlt,
    icon: courses[1].icon,
    points: [courses[1].title, courses[4].title, courses[3].title, internships[5].title],
    link: shortCoursesFormUrl,
    action: 'Explore creative courses',
  },
  {
    eyebrow: 'INTERNSHIP PROGRAMS',
    title: 'Put your skills into practice',
    // description: 'Explore practical internship tracks built around technology skills and project work.',
    image: internships[1].image,
    imageAlt: internships[1].imageAlt,
    icon: internships[1].icon,
    points: [internships[0].title, internships[1].title, internships[3].title],
    link: internshipApplicationFormUrl,
    action: 'Explore internships',
  },
]

function ShowcasePanel({ panel, index, decorative = false }) {
  const [imageFailed, setImageFailed] = useState(false)
  const Icon = panel.icon

  return (
    <article className={`showcase-panel${index % 2 ? ' showcase-panel-reversed' : ''}`}>
      <div className="showcase-panel-visual">
        {!imageFailed ? (
          <img
            className="showcase-panel-image"
            src={panel.image}
            alt={decorative ? '' : panel.imageAlt}
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="showcase-panel-image-fallback" aria-hidden="true">
            <Icon size={46} strokeWidth={1.2} />
            <span>CODETECH LEARNING</span>
          </div>
        )}
        <div className="showcase-visual-caption">
          <span className="showcase-caption-icon"><Icon size={16} strokeWidth={1.7} /></span>
          <span>{panel.eyebrow}</span>
          <Sparkles size={14} aria-hidden="true" />
        </div>
      </div>
      <div className="showcase-panel-copy">
        <p className="showcase-panel-eyebrow">{panel.eyebrow}</p>
        <h3>{panel.title}</h3>
        {/* <p className="showcase-panel-description">{panel.description}</p> */}
        <ul className="showcase-panel-points">
          {panel.points.map((point) => (
            <li key={point}>
              <Check size={13} strokeWidth={2} aria-hidden="true" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <a
          className="showcase-panel-link"
          href={panel.link}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={decorative ? -1 : undefined}
        >
          {panel.action}<ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </article>
  )
}

function ShowcaseLane({ decorative = false }) {
  return (
    <div className="showcase-lane" aria-hidden={decorative || undefined}>
      {showcasePanels.map((panel, index) => (
        <ShowcasePanel
          key={`${decorative ? 'duplicate-' : ''}${panel.eyebrow}`}
          panel={panel}
          index={index}
          decorative={decorative}
        />
      ))}
    </div>
  )
}

export default function ShowcaseSection() {
  return (
    <section className="showcase-section" id="showcase" aria-label="Explore CodeTech learning paths">
      <div className="showcase-heading">
        <p className="eyebrow">LEARN BY BUILDING</p>
        <h2 className="section-title">Explore what you can create</h2>
        {/* <p className="section-description">
          Practical courses and internship programs for your next digital skill.
        </p> */}
      </div>
      <div className="showcase-stage">
        <div className="showcase-track">
          <ShowcaseLane />
          <ShowcaseLane decorative />
        </div>
      </div>
      <p className="showcase-footnote" aria-hidden="true">CODETECH <span>•</span> LEARN <span>•</span> BUILD <span>•</span> GROW</p>
    </section>
  )
}
