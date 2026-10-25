import { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ContactSection from './components/ContactSection.jsx'
import HeroSection from './sections/HeroSection.jsx'
import AboutSection from './sections/AboutSection.jsx'
import ProgramsSection from './sections/ProgramsSection.jsx'
import ReviewsSection from './sections/ReviewsSection.jsx'
import ShowcaseSection from './sections/ShowcaseSection.jsx'
import HowItWorksSection from './sections/HowItWorksSection.jsx'
import TechnologyMarquee from './components/TechnologyMarquee.jsx'
import FaqSection from './sections/FaqSection.jsx'
import FinalCtaSection from './sections/FinalCtaSection.jsx'

export default function App() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduceMotion.matches || !('IntersectionObserver' in window)) return undefined

    const sections = document.querySelectorAll(
      'main > .technology-marquee, main > .showcase-section, main > .about-section, main > .programs-section, main > .how-it-works-section, main > .reviews-section, main > .faq-section, main > .final-cta-section, main > .contact-section, .site-footer',
    )
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -35px 0px' })

    sections.forEach((section) => {
      section.classList.add('scroll-reveal')
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
        <TechnologyMarquee />
        <ShowcaseSection />
        <AboutSection />
        <ProgramsSection />
        <HowItWorksSection />
        <ReviewsSection />
        <FaqSection />
        <FinalCtaSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
