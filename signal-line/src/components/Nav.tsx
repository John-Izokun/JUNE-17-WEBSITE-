import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface NavProps {
  onBookCall: () => void
}

const LINKS = [
  { label: 'How It Works',  id: 'how-it-works'      },
  { label: 'Manufacturers', id: 'for-manufacturers' },
  { label: 'Co-packers',    id: 'for-manufacturers' },
  { label: 'Proof',         id: 'intelligence'      },
]

// Every industry routes to the brand-facing story.
const INDUSTRIES = [
  'Skincare',
  'Haircare',
  'Supplements & Nutraceutical',
  'Food & Beverage',
  'Cosmetics',
  'Pet & Personal Care',
]

export default function Nav({ onBookCall }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [indOpen, setIndOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const handler = () => { if (window.innerWidth > 768) setMenuOpen(false) }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    setIndOpen(false)
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="/" className="nav-logo">
            <div className="nav-logo-dot" />
            Signal & Line
          </a>

          <ul className="nav-links">
            {LINKS.map(l => (
              <li key={l.label}>
                <a href={`#${l.id}`} onClick={e => { e.preventDefault(); scrollTo(l.id) }}>
                  {l.label}
                </a>
              </li>
            ))}

            <li
              className="nav-dropdown"
              onMouseEnter={() => setIndOpen(true)}
              onMouseLeave={() => setIndOpen(false)}
            >
              <button
                className="nav-dropdown-trigger"
                onClick={() => setIndOpen(o => !o)}
                aria-expanded={indOpen}
                aria-haspopup="true"
              >
                Industries
                <svg className={`nav-caret ${indOpen ? 'open' : ''}`} width="10" height="10" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <AnimatePresence>
                {indOpen && (
                  <motion.div
                    className="nav-dropdown-menu"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.16, ease: [0.33, 0, 0.15, 1] }}
                  >
                    <span className="nav-dropdown-head">Built for your category</span>
                    {INDUSTRIES.map(n => (
                      <button key={n} onClick={() => scrollTo('for-brands')}>
                        {n}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          </ul>

          <div className="nav-cta nav-desktop-cta">
            <button
              className="btn btn-purple"
              style={{ fontSize: '0.8rem', padding: '0.6rem 1.2rem' }}
              onClick={onBookCall}
            >
              Run the OOS Radar
            </button>
          </div>

          <div className="nav-mobile-right">
            <button
              className="btn btn-purple"
              style={{ fontSize: '0.75rem', padding: '0.5rem 0.9rem' }}
              onClick={onBookCall}
            >
              Book a Call
            </button>
            <button
              className="hamburger"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
            >
              <span className={`ham-line ${menuOpen ? 'open' : ''}`} />
              <span className={`ham-line ${menuOpen ? 'open' : ''}`} />
              <span className={`ham-line ${menuOpen ? 'open' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          >
            <nav className="mobile-menu-links">
              {LINKS.map((l, i) => (
                <motion.button
                  key={l.label}
                  className="mobile-menu-link"
                  onClick={() => scrollTo(l.id)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {l.label}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </motion.button>
              ))}

              <motion.div
                className="mobile-menu-section-label"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: LINKS.length * 0.05 }}
              >
                <span className="label">Industries</span>
              </motion.div>
              <div className="mobile-menu-chips">
                {INDUSTRIES.map((n, i) => (
                  <motion.button
                    key={n}
                    className="mobile-menu-chip"
                    onClick={() => scrollTo('for-brands')}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: LINKS.length * 0.05 + i * 0.03 }}
                  >
                    {n}
                  </motion.button>
                ))}
              </div>

              <motion.button
                className="mobile-menu-link mobile-menu-cta"
                onClick={() => { setMenuOpen(false); onBookCall() }}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (LINKS.length + INDUSTRIES.length) * 0.04 }}
              >
                Run the OOS Radar for My Facility
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </motion.button>
            </nav>
            <div className="mobile-menu-footer">
              <span className="label">Signal & Line · Montreal, CA</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
