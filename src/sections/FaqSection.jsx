import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import SectionHeading from '../components/SectionHeading.jsx'
import './FaqSection.css'

const questions = [
  {
    question: 'What is CodeTech?',
    answer: 'CodeTech offers short courses and internship opportunities focused on developing digital, creative, and technology-related skills. Explore the available programs on our website to find the option that suits your interests.',
  },
  {
    question: 'What short courses does CodeTech offer?',
    answer: 'Our listed course topics include Python Programming, UI/UX Designing, AI Tools and Productivity, 3D Cartoons and Animation with AI, Video Editing, Microsoft Office Professional, Web Development, Web Designing, Mobile App Development, AI Automation, Prompt Engineering, and Freelancing.',
  },
  {
    question: 'What internship programs are available?',
    answer: 'Our website lists internship opportunities in areas such as Python, Web Development, Prompt Engineering, Agentic AI, AI Automation, Graphic Design, Frontend Development, Backend Development, and WordPress. Availability and program details should be confirmed through the relevant application process.',
  },
  {
    question: 'How can I enroll in a short course?',
    answer: <>Open the <a href="#courses">Short Courses</a> section, select your preferred course, and click its <strong>Enroll Now</strong> button. Complete and submit the linked Google Form with accurate information.</>,
  },
  {
    question: 'How can I apply for an internship?',
    answer: <>Visit the <a href="#internships">Internship Programs</a> section, choose your preferred internship, click <strong>Enroll Now</strong>, and complete the internship application form linked to that program.</>,
  }
 
]

export default function FaqSection() {
  const [expandedIndex, setExpandedIndex] = useState(null)

  return (
    <section className="section-pad faq-section" id="faq">
      <div className="faq-ambient" aria-hidden="true" />
      <div className="container faq-container">
        <SectionHeading
          eyebrow="GOT QUESTIONS?"
          title="Frequently Asked Questions"
          description="Find answers to common questions about CodeTech's short courses, internship programs, enrollment process, and learning experience."
        />

        <div className="faq-list">
          {questions.map(({ question, answer }, index) => {
            const isExpanded = expandedIndex === index
            const buttonId = `faq-question-${index + 1}`
            const answerId = `faq-answer-${index + 1}`

            return (
              <article className={`faq-item${isExpanded ? ' is-expanded' : ''}`} key={question}>
                <h3 className="faq-question-heading">
                  <button
                    className="faq-question"
                    id={buttonId}
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={answerId}
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  >
                    <span>{question}</span>
                    <span className="faq-toggle-icon" aria-hidden="true">
                      {isExpanded ? <Minus size={19} strokeWidth={1.8} /> : <Plus size={19} strokeWidth={1.8} />}
                    </span>
                  </button>
                </h3>
                <div
                  className="faq-answer"
                  id={answerId}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!isExpanded}
                  inert={!isExpanded}
                >
                  <div className="faq-answer-inner">
                    <p>{answer}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
