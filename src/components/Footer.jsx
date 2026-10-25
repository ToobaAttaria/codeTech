import { Code2, Mail, Phone } from 'lucide-react'

const footerLinks = [
  ['Home', '#home'],
  ['Tech', '#technologies'],
  ['Explore', '#showcase'],
  ['About', '#about'],
  ['Courses', '#courses'],
  ['Internships', '#internships'],
  ['Process', '#how-it-works'],
  ['Reviews', '#reviews'],
  ['FAQ', '#faq'],
  ['Start', '#get-started'],
  ['Contact', '#contact'],
  // { label: 'Home', href: '#home' },
  // { label: 'Tech', href: '#technologies' },
  // { label: 'Explore', href: '#showcase' },
  // { label: 'Courses', href: '#courses' },
  // { label: 'Internships', href: '#internships' },
  // { label: 'Process', href: '#how-it-works' },
  // { label: 'Reviews', href: '#reviews' },
  // { label: 'FAQ', href: '#faq' },
  // { label: 'About', href: '#about' },
  // { label: 'Start', href: '#get-started' },
  // { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand-block">
          <a className="brand" href="#home">
            <span className="brand-mark"><Code2 size={21} strokeWidth={2.5} /></span>
            <span>Code<span className="brand-accent">Tech</span></span>
          </a>
          <p>Short technology courses and practical internship opportunities to help you explore digital skills and keep learning.</p>
        </div>
        <div className="footer-nav">
          <p className="footer-label">QUICK LINKS</p>
          {footerLinks.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </div>
        <div className="footer-nav footer-contact">
          <p className="footer-label">GET IN TOUCH</p>
          <a href="mailto:codetech4141@gmail.com"><Mail size={14} /> codetech4141@gmail.com</a>
          <a href="tel:03482278415"><Phone size={14} /> 03482278415</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} CodeTech. All rights reserved.</span>
        <span>Courses <a href="#courses">Explore courses</a> · Internships <a href="#internships">Explore internships</a></span>
      </div>
    </footer>
  )
}
