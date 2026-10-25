import { ArrowRight } from 'lucide-react'
import './FinalCtaSection.css'

export default function FinalCtaSection() {
  return (
    <section className="section-pad final-cta-section" id="get-started">
      <div className="container">
        <div className="final-cta-frame">
          <div className="final-cta-panel">
            <div className="final-cta-effects" aria-hidden="true">
              <span className="final-cta-arc final-cta-arc-left" />
              <span className="final-cta-arc final-cta-arc-right" />
            </div>
            <div className="final-cta-content">
              <p className="final-cta-eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
              <h2>Ready to Build Your Future with CodeTech?</h2>
              <p className="final-cta-description">
                Explore our short courses and internship opportunities, develop practical digital skills, and take your next step into the world of technology.
              </p>
              <div className="final-cta-actions">
                <a className="final-cta-button final-cta-button-primary" href="#courses">
                  Explore Short Courses
                  <ArrowRight size={17} strokeWidth={1.8} aria-hidden="true" />
                </a>
                <a className="final-cta-button final-cta-button-secondary" href="#internships">
                  Apply for an Internship
                </a>
              </div>
              <p className="final-cta-note">Your learning journey starts with one simple step.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
