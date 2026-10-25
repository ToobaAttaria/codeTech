import { BookOpen, Braces, Brain, CircuitBoard, Code2, Laptop, Lightbulb } from 'lucide-react'
import SectionHeading from '../components/SectionHeading.jsx'

const principles = [
  {
    icon: BookOpen,
    title: 'Practical Learning',
    description: 'Explore new concepts with guided activities and useful exercises.',
  },
  {
    icon: Brain,
    title: 'Skill Development',
    description: 'Build your understanding of modern digital and technology skills.',
  },
  {
    icon: Code2,
    title: 'Project-Based Practice',
    description: 'Apply what you learn through practical projects and real-world tasks.',
  },
]

export default function AboutSection() {
  return (
    <section className="section-pad about-section" id="about">
      <div className="about-tech-backdrop" aria-hidden="true">
        <svg className="about-network-lines" viewBox="0 0 1440 680" preserveAspectRatio="none">
          <path d="M0 440 190 340 380 410 590 250 790 330 1010 170 1220 260 1440 110" />
          <path d="M130 120 310 230 520 160 720 280 920 210 1130 360 1320 300" />
          <circle cx="190" cy="340" r="3" />
          <circle cx="590" cy="250" r="3" />
          <circle cx="1010" cy="170" r="3" />
          <circle cx="310" cy="230" r="3" />
          <circle cx="920" cy="210" r="3" />
          <circle cx="1130" cy="360" r="3" />
        </svg>
        <Code2 className="about-float-icon about-float-code" size={35} strokeWidth={1.2} />
        <Laptop className="about-float-icon about-float-laptop" size={39} strokeWidth={1.2} />
        <CircuitBoard className="about-float-icon about-float-circuit" size={34} strokeWidth={1.2} />
        <Lightbulb className="about-float-icon about-float-bulb" size={31} strokeWidth={1.2} />
        <Braces className="about-float-icon about-float-braces" size={28} strokeWidth={1.2} />
        <span className="about-particle about-particle-one" />
        <span className="about-particle about-particle-two" />
        <span className="about-particle about-particle-three" />
        <span className="about-particle about-particle-four" />
      </div>
      <div className="container about-layout">
        <div className="about-copy">
          <SectionHeading
            align="left"
            eyebrow="ABOUT US"
            title="About CodeTech"
            description="CodeTech makes technology learning accessible through short courses and practical internships, helping learners develop digital skills and apply their knowledge."
          />
          <div className="principles-grid">
            {principles.map(({ icon: Icon, title, description }) => (
              <article className="principle-item" key={title}>
                <div className="principle-icon"><Icon size={19} /></div>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="about-visual">
          <video
            className="about-video"
            src="/videos/about_us.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Technology learning at CodeTech"
          />
        </div>
      </div>
    </section>
  )
}
