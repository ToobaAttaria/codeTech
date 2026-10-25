import { useEffect, useRef } from 'react'
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react'

export default function HeroSection() {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!video) return undefined

    const updatePlayback = () => {
      if (motionPreference.matches) {
        video.pause()
      } else if (video.paused && video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
        video.play().catch((error) => {
          if (error.name !== 'NotAllowedError' && error.name !== 'AbortError') {
            console.error('Hero background video playback failed.', error)
          }
        })
      }
    }
    updatePlayback()
    video.addEventListener('canplay', updatePlayback)
    motionPreference.addEventListener('change', updatePlayback)
    return () => {
      video.removeEventListener('canplay', updatePlayback)
      motionPreference.removeEventListener('change', updatePlayback)
    }
  }, [])

  return (
    <section className="hero-section" id="home">
      <div className="hero-backdrop" aria-hidden="true">
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/videos/hero-tech.mp4" type="video/mp4" />
        </video>
        <svg className="hero-constellation" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="hero-core">
              <stop offset="0" stopColor="#a9e7f5" stopOpacity=".75" />
              <stop offset=".23" stopColor="#6ccde5" stopOpacity=".28" />
              <stop offset="1" stopColor="#6ccde5" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="hero-ribbon" x1="0" x2="1" y1="0" y2="1">
              <stop stopColor="#a9e7f5" stopOpacity="0" />
              <stop offset=".5" stopColor="#a9e7f5" stopOpacity=".55" />
              <stop offset="1" stopColor="#6ccde5" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle className="hero-core-glow" cx="720" cy="410" r="300" fill="url(#hero-core)" />
          <g className="hero-orbit-lines" fill="none" stroke="#a9e7f5">
            <ellipse cx="720" cy="418" rx="510" ry="150" transform="rotate(-14 720 418)" />
            <ellipse cx="720" cy="418" rx="420" ry="215" transform="rotate(18 720 418)" />
            <ellipse cx="720" cy="418" rx="590" ry="270" transform="rotate(-27 720 418)" />
            <path d="M55 610C250 454 337 550 490 424S745 254 889 373s274 194 494-31" stroke="url(#hero-ribbon)" />
            <path d="M113 287c177 101 291 20 435 128s200 287 369 195 279-40 410 8" stroke="url(#hero-ribbon)" />
          </g>
          <g className="hero-points" fill="#a9e7f5">
            <circle cx="209" cy="491" r="3" />
            <circle cx="397" cy="341" r="2.5" />
            <circle cx="510" cy="531" r="3" />
            <circle cx="719" cy="265" r="3" />
            <circle cx="920" cy="510" r="2.5" />
            <circle cx="1089" cy="334" r="3" />
            <circle cx="1240" cy="495" r="2" />
          </g>
        </svg>
      </div>
      <div className="container hero-content">
        <div className="hero-copy">
          <div className="hero-badge"><Sparkles size={14} /> LEARN <span>•</span> BUILD <span>•</span> GROW</div>
          <h1>Build Your Future with <span>CodeTech</span></h1>
          <p className="hero-description">
            Explore practical technology courses and internship opportunities designed to help you develop skills, work on projects, and take the next step in your learning journey.
          </p>
          <div className="hero-actions">
            <a className="button button-primary button-large" href="#courses">Explore Courses <ArrowRight size={17} /></a>
            <a className="button button-quiet button-large" href="#internships">Explore Internships</a>
          </div>
        </div>
      </div>
      <a href="#about" className="scroll-cue" aria-label="Scroll to learn about CodeTech"><ArrowDown size={17} /></a>
    </section>
  )
}
