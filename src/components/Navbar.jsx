
import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X, ChevronDown } from 'lucide-react'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Tech', href: '#technologies' },
  { label: 'Explore', href: '#showcase' },
  { label: 'Courses', href: '#courses' },
  { label: 'Internships', href: '#internships' },
  { label: 'Process', href: '#how-it-works' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'About', href: '#about' },
  { label: 'Start', href: '#get-started' },
  { label: 'Contact', href: '#contact' },
]

const dropdowns = [
  {
    label: 'Discover',
    items: [
      { label: 'Technologies', href: '#technologies' },
      { label: 'Explore Projects', href: '#showcase' },
    ],
  },
  {
    label: 'Programs',
    items: [
      { label: 'Courses', href: '#courses' },
      { label: 'Internships', href: '#internships' },
    ],
  },
  {
    label: 'More',
    items: [
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Reviews', href: '#reviews' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [activeHref, setActiveHref] = useState(
    links.some(({ href }) => href === window.location.hash)
      ? window.location.hash
      : '#home',
  )

  function closeMenu() {
    setMenuOpen(false)
    setActiveDropdown(null)
  }

  function handleSectionLinkClick(href) {
    closeMenu()
    setActiveHref(href)

    if (href === '#courses' || href === '#internships') {
      window.dispatchEvent(
        new CustomEvent('codetech:select-program', {
          detail: {
            category: href === '#courses' ? 'courses' : 'internships',
          },
        }),
      )
    }
  }

  useEffect(() => {
    function updateScrollState() {
      setIsScrolled(window.scrollY > 12)
    }

function handleOutsideClick(event) {
  if (!event.target.closest('.nav-dropdown')) {
    setActiveDropdown(null)
  }
}

    function updateFromHash() {
      if (links.some(({ href }) => href === window.location.hash)) {
        setActiveHref(window.location.hash)
      }
    }

    updateScrollState()
    document.addEventListener('click', handleOutsideClick)
    window.addEventListener('scroll', updateScrollState, {
      passive: true,
    })
    window.addEventListener('hashchange', updateFromHash)

    const sections = [
      'home',
      'technologies',
      'showcase',
      'about',
      'courses',
      'internships',
      'how-it-works',
      'reviews',
      'faq',
      'get-started',
      'contact',
    ]
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver(
          (entries) => {
            const visibleSection = entries
              .filter((entry) => entry.isIntersecting)
              .sort(
                (a, b) => b.intersectionRatio - a.intersectionRatio,
              )[0]

            if (visibleSection) {
              const sectionHref = `#${visibleSection.target.id}`
              setActiveHref(sectionHref)
            }
          },
          {
            rootMargin: '-18% 0px -68% 0px',
            threshold: [0, 0.2, 0.5, 1],
          },
        )
      : null

    sections.forEach((section) => observer?.observe(section))

    return () => {
      window.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('hashchange', updateFromHash)
      document.removeEventListener('click', handleOutsideClick)
      observer?.disconnect()
    }
  }, [])

  return (
    <header className={`site-header${isScrolled ? ' is-scrolled' : ''}`}>
      <nav
        className="container nav-wrap"
        aria-label="Main navigation"
        onKeyDown={(event) => {
          if (event.key === 'Escape') closeMenu()
        }}
      >
        <a className="brand" href="#home" onClick={closeMenu}>
          <img src="/images/codeTech.png" alt="CodeTech Logo" />
        </a>

        <button
          className="mobile-menu-button"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div
          className={`nav-content${menuOpen ? ' is-open' : ''}`}
          id="primary-navigation"
        >
          <div className="nav-links">
            <a
              href="#home"
              className={activeHref === '#home' ? 'is-active' : undefined}
              onClick={() => handleSectionLinkClick('#home')}
            >
              Home
            </a>

            {dropdowns.slice(0, 1).map((dropdown) => (
              <div className="nav-dropdown" key={dropdown.label}>
                <button
                  type="button"
                  className={`nav-dropdown-trigger${
                    dropdown.items.some((item) => item.href === activeHref)
                      ? ' is-active'
                      : ''
                  }`}
                  aria-expanded={activeDropdown === dropdown.label}
                  onClick={() =>
                    setActiveDropdown((current) =>
                      current === dropdown.label ? null : dropdown.label,
                    )
                  }
                >
                  {dropdown.label}
                  <ChevronDown size={15} />
                </button>

                <div
                  className={`nav-dropdown-menu${
                    activeDropdown === dropdown.label ? ' is-open' : ''
                  }`}
                >
                  {dropdown.items.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className={activeHref === item.href ? 'is-active' : undefined}
                      onClick={() => handleSectionLinkClick(item.href)}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}

            {dropdowns.slice(1, 2).map((dropdown) => (
              <div className="nav-dropdown" key={dropdown.label}>
                <button
                  type="button"
                  className={`nav-dropdown-trigger${
                    dropdown.items.some((item) => item.href === activeHref)
                      ? ' is-active'
                      : ''
                  }`}
                  aria-expanded={activeDropdown === dropdown.label}
                  onClick={() =>
                    setActiveDropdown((current) =>
                      current === dropdown.label ? null : dropdown.label,
                    )
                  }
                >
                  {dropdown.label}
                  <ChevronDown size={15} />
                </button>

                <div
                  className={`nav-dropdown-menu${
                    activeDropdown === dropdown.label ? ' is-open' : ''
                  }`}
                >
                  {dropdown.items.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className={activeHref === item.href ? 'is-active' : undefined}
                      onClick={() => handleSectionLinkClick(item.href)}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}

            <a
              href="#about"
              className={activeHref === '#about' ? 'is-active' : undefined}
              onClick={() => handleSectionLinkClick('#about')}
            >
              About
            </a>

            {dropdowns.slice(2).map((dropdown) => (
              <div className="nav-dropdown" key={dropdown.label}>
                <button
                  type="button"
                  className={`nav-dropdown-trigger${
                    dropdown.items.some((item) => item.href === activeHref)
                      ? ' is-active'
                      : ''
                  }`}
                  aria-expanded={activeDropdown === dropdown.label}
                  onClick={() =>
                    setActiveDropdown((current) =>
                      current === dropdown.label ? null : dropdown.label,
                    )
                  }
                >
                  {dropdown.label}
                  <ChevronDown size={15} />
                </button>

                <div
                  className={`nav-dropdown-menu${
                    activeDropdown === dropdown.label ? ' is-open' : ''
                  }`}
                >
                  {dropdown.items.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className={activeHref === item.href ? 'is-active' : undefined}
                      onClick={() => handleSectionLinkClick(item.href)}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}

            <a
              href="#contact"
              className={activeHref === '#contact' ? 'is-active' : undefined}
              onClick={() => handleSectionLinkClick('#contact')}
            >
              Contact
            </a>
          </div>

          <a
            className="button button-primary nav-cta"
            href="#get-started"
            onClick={() => handleSectionLinkClick('#get-started')}
          >
            Get Started <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </nav>
    </header>
  )
}
