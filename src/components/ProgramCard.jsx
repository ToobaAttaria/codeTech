import { ArrowUpRight, Check } from 'lucide-react'
import { useState } from 'react'

export default function ProgramCard({ program, type, formUrl }) {
  const Icon = program.icon
  const isCourse = type === 'course'
  const [imageFailed, setImageFailed] = useState(false)
  const hasImage = program.image && !imageFailed

  return (
    <article className="program-card">
      <div
        className={`program-artwork artwork-${program.iconStyle || 'blue'}`}
        role={hasImage ? undefined : 'img'}
        aria-label={hasImage ? undefined : program.imageAlt || `${program.title} themed illustration`}
      >
        {hasImage ? (
          <img
            className="program-artwork-image"
            src={program.image}
            alt={program.imageAlt}
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <>
            <span className="artwork-orbit artwork-orbit-one" />
            <span className="artwork-orbit artwork-orbit-two" />
            <span className="artwork-grid" />
            <span className="artwork-icon"><Icon size={36} strokeWidth={1.45} aria-hidden="true" /></span>
            <span className="artwork-caption">{isCourse ? 'LEARNING PATH' : 'PRACTICAL TRACK'}</span>
          </>
        )}
      </div>
      <div className="program-card-content">
        <div className="program-category">
          <Icon size={13} strokeWidth={1.8} aria-hidden="true" />
          <span>{isCourse ? 'SHORT COURSE' : 'INTERNSHIP'}</span>
        </div>
        <h3>{program.title}</h3>
        {/* <p className="card-description">{program.description}</p> */}
        <ul className="program-points">
          {program.points.map((point) => (
            <li key={point}>
              <Check size={13} strokeWidth={2.1} aria-hidden="true" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <a
          className="button button-primary card-action"
          href={formUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${isCourse ? 'Enroll in' : 'Apply for'} ${program.title} using the Google Form`}
        >
          {isCourse ? 'Enroll Now' : 'Apply for Internship'} <ArrowUpRight size={16} />
        </a>
      </div>
    </article>
  )
}
