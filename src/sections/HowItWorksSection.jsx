import { BookOpen, ClipboardList, Code2, MessageCircle } from 'lucide-react'
import SectionHeading from '../components/SectionHeading.jsx'
import './HowItWorksSection.css'

const steps = [
  {
    number: '01',
    label: 'EXPLORE PROGRAMS',
    title: 'Choose Your Program',
    description: 'Explore our short courses and internship opportunities to find a program that matches your interests and learning goals.',
    icon: BookOpen,
  },
  {
    number: '02',
    label: 'APPLY ONLINE',
    title: 'Submit Your Application',
    description: 'Select your preferred program and complete the relevant online enrollment form with accurate contact information.',
    icon: ClipboardList,
  },
  {
    number: '03',
    label: 'STAY CONNECTED',
    title: 'Receive Instructions',
    description: 'After submitting your form, keep your email and WhatsApp number accessible so you can receive any follow-up communication and program instructions.',
    icon: MessageCircle,
  },
  {
    number: '04',
    label: 'BUILD YOUR SKILLS',
    title: 'Start Learning',
    description: 'Follow the instructions provided for your selected program, work through the learning activities, and build your understanding of relevant digital skills.',
    icon: Code2,
  },
]

export default function HowItWorksSection() {
  return (
    <section className="section-pad how-it-works-section" id="how-it-works">
      <div className="container">
        <SectionHeading
          eyebrow="YOUR JOURNEY STARTS HERE"
          title="How It Works"
          description="Getting started with CodeTech is simple. Choose your learning path, complete your application, and take the next step toward developing practical digital skills."
        />

        <div className="how-works-stage">
          <svg className="how-works-connectors" viewBox="0 0 1160 500" preserveAspectRatio="none" aria-hidden="true">
            <path d="M350 116 C430 116 440 195 565 235" />
            <path d="M810 116 C730 116 720 195 595 235" />
            <path d="M350 384 C430 384 440 305 565 265" />
            <path d="M810 384 C730 384 720 305 595 265" />
          </svg>

          <div className="how-works-light" aria-hidden="true">
            <span className="how-works-halo" />
            <span className="how-works-orbit how-works-orbit-one" />
            <span className="how-works-orbit how-works-orbit-two" />
            <span className="how-works-core" />
            <span className="how-works-particle how-works-particle-one" />
            <span className="how-works-particle how-works-particle-two" />
            <span className="how-works-particle how-works-particle-three" />
          </div>

          <div className="how-works-steps">
            {steps.map(({ number, label, title, description, icon: Icon }) => (
              <article className="how-step" key={number}>
                <div className="how-step-topline">
                  <span className="how-step-number">{number}</span>
                  <span className="how-step-label">{label}</span>
                </div>
                <div className="how-step-content">
                  <div className="how-step-icon"><Icon size={20} strokeWidth={1.7} aria-hidden="true" /></div>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </div>
                <span className="how-step-streak" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>

       
      </div>
    </section>
  )
}
