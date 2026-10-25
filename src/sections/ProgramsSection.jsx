import { useEffect, useRef, useState } from 'react'
import { BookOpen, BriefcaseBusiness, ChevronDown } from 'lucide-react'
import CourseCard from '../components/CourseCard.jsx'
import InternshipCard from '../components/InternshipCard.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { courses } from '../data/courses.js'
import { internships } from '../data/internships.js'

const initialProgramCount = 4

const categories = [
  {
    id: 'courses',
    label: 'Courses',
    eyebrow: 'SHORT COURSES',
    title: 'Explore Our Short Courses',
    description: 'Discover learning opportunities across technology, design, productivity and digital skills.',
    icon: BookOpen,
    programs: courses,
  },
  {
    id: 'internships',
    label: 'Internships',
    eyebrow: 'INTERNSHIP PROGRAMS',
    title: 'Explore Our Internship Programs',
    description: 'Explore internship tracks designed around technology skills, practical assignments and project-based learning.',
    icon: BriefcaseBusiness,
    programs: internships,
  },
]

export default function ProgramsSection() {
  const [activeCategory, setActiveCategory] = useState('courses')
  const [showAll, setShowAll] = useState(false)
  const tabRefs = useRef([])
  const activeIndex = categories.findIndex(({ id }) => id === activeCategory)
  const category = categories[activeIndex]
  const visiblePrograms = showAll
    ? category.programs
    : category.programs.slice(0, initialProgramCount)

  useEffect(() => {
    function handleProgramNavigation(event) {
      selectCategory(event.detail.category)
    }
    window.addEventListener('codetech:select-program', handleProgramNavigation)
    if (window.location.hash === '#internships') selectCategory('internships')
    return () => window.removeEventListener('codetech:select-program', handleProgramNavigation)
  }, [])

  function selectCategory(id) {
    setActiveCategory(id)
    setShowAll(false)
  }

  function handleTabKeyDown(event, index) {
    let nextIndex
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % categories.length
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + categories.length) % categories.length
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = categories.length - 1
    else return

    event.preventDefault()
    selectCategory(categories[nextIndex].id)
    tabRefs.current[nextIndex]?.focus()
  }

 
return (
  <section className="section-pad programs-section" id="courses">
    <div className="container">
      <div
        className="program-tabs"
        role="tablist"
        aria-label="Program categories"
      >
        {categories.map(({ id, label, icon: Icon }, index) => (
          <button
            className={`program-tab${activeCategory === id ? ' is-active' : ''}`}
            id={`program-tab-${id}`}
            key={id}
            ref={(element) => {
              tabRefs.current[index] = element
            }}
            type="button"
            role="tab"
            aria-selected={activeCategory === id}
            aria-controls="program-panel"
            tabIndex={activeCategory === id ? 0 : -1}
            onClick={() => selectCategory(id)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
          >
            <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      <SectionHeading
        eyebrow={category.eyebrow}
        title={category.title}
        description={category.description}
      />

      <div
        className={`cards-grid programs-grid${activeCategory === 'courses' ? ' courses-grid' : ' internships-grid'}`}
        id="program-panel"
        role="tabpanel"
        aria-labelledby={`program-tab-${activeCategory}`}
        tabIndex={0}
        key={activeCategory}
      >
        {visiblePrograms.map((program) =>
          activeCategory === 'courses' ? (
            <CourseCard key={program.title} course={program} />
          ) : (
            <InternshipCard key={program.title} internship={program} />
          )
        )}
      </div>

      {category.programs.length > initialProgramCount && (
        <button
          className="button button-secondary programs-toggle"
          type="button"
          aria-expanded={showAll}
          aria-controls="program-panel"
          onClick={() => setShowAll((expanded) => !expanded)}
        >
          {showAll ? 'Show Less' : 'Show More'}
          <ChevronDown
            className={showAll ? 'is-rotated' : ''}
            size={16}
            aria-hidden="true"
          />
        </button>
      )}
    </div>
  </section>
)

  
}
