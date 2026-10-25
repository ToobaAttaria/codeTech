import { ArrowUpRight, Mail, MessageCircle, Phone, Send } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'

export default function ContactSection() {
  function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = formData.get('name')
    const email = formData.get('email')
    const message = formData.get('message')
    const subject = encodeURIComponent(`Website enquiry from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)

    window.location.href = `mailto:codetech4141@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <section className="contact-section section-pad" id="contact">
      <div className="container">
        <SectionHeading
          eyebrow="CONTACT"
          title="Get in Touch"
          description="Have a question about our courses or internship programs? Contact CodeTech for more information."
        />
        <div className="contact-layout">
          <div className="contact-panel">
            <p className="contact-intro">Let’s build something great together. Reach out through your preferred channel and our team will be happy to help.</p>
            <a className="contact-method" href="mailto:codetech4141@gmail.com" aria-label="Email CodeTech at codetech4141@gmail.com">
              <span className="contact-method-icon"><Mail size={20} /></span>
              <span><small>Email</small><strong>codetech4141@gmail.com</strong></span>
            </a>
            <a className="contact-method" href="tel:03482278415" aria-label="Call CodeTech at 03482278415">
              <span className="contact-method-icon"><Phone size={20} /></span>
              <span><small>Phone</small><strong>03482278415</strong></span>
            </a>
            <a className="contact-method" href="https://wa.me/923482278415" target="_blank" rel="noopener noreferrer" aria-label="Message CodeTech on WhatsApp">
              <span className="contact-method-icon"><MessageCircle size={20} /></span>
              <span><small>WhatsApp</small><strong>Message CodeTech</strong></span>
            </a>
            <a className="button button-primary contact-cta" href="#courses">
              Explore Programs <ArrowUpRight size={16} />
            </a>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form-heading">
              <span className="contact-form-kicker">START A CONVERSATION</span>
              <h3>Send us a message</h3>
              <p>Tell us a little about what you’re looking for.</p>
            </div>
            <div className="contact-form-row">
              <label className="contact-field">
                <span>Your name</span>
                <input type="text" name="name" placeholder="Alex Morgan" autoComplete="name" required />
              </label>
              <label className="contact-field">
                <span>Email address</span>
                <input type="email" name="email" placeholder="alex@example.com" autoComplete="email" required />
              </label>
            </div>
            <label className="contact-field">
              <span>Your message</span>
              <textarea name="message" rows="5" placeholder="How can we help you?" required />
            </label>
            <button className="button button-primary contact-submit" type="submit">
              Send message <Send size={16} />
            </button>
            <p className="contact-form-note">Your email app will open to send your message.</p>
          </form>
        </div>
      </div>
    </section>
  )
}
