import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react'

interface NavProps {
  onBook: () => void
}

export const INDUSTRIES = [
  'Supplements & nutraceuticals',
  'Skincare',
  'Haircare',
  'Cosmetics',
  'Personal care',
  'Food & beverage',
  'Pet care',
]

// Each industry chip in section 06 carries this id, so every menu item lands on its own chip.
export const indId = (name: string) =>
  `ind-${name.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-')}`

// One list of formats, shared by the floor check (04) and the formats grid (06).
export const FORMATS = [
  'Capsules & tablets',
  'Gummies & soft chews',
  'Powders & blends',
  'Liquids & serums',
  'Creams & lotions',
  'Drinks & shots',
] as const
export type Format = typeof FORMATS[number]

const LINKS = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Where brands come from', href: '#source' },
  { label: 'The offer', href: '#offer' },
  { label: 'Questions', href: '#questions' },
]

export function BrandMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#0B1622" />
      <path d="M5 12h14" stroke="#E6EEF5" strokeWidth="2" strokeLinecap="round" />
      <circle cx="15.5" cy="12" r="3.3" fill="#3CC98F" />
    </svg>
  )
}

export default function Nav({ onBook }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [ddOpen, setDdOpen] = useState(false)
  const ddRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setDdOpen(false); setMenuOpen(false) }
    }
    const onClick = (e: MouseEvent) => {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) setDdOpen(false)
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClick)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    const onResize = () => { if (window.innerWidth > 1080) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [menuOpen])

  return (
    <>
      <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="wrap nav-inner">
          <a href="#top" className="brand" aria-label="Signal & Line — back to top">
            <BrandMark />
            Signal &amp; Line
          </a>

          <ul className="nav-links">
            {LINKS.map(l => (
              <li key={l.href}><a href={l.href}>{l.label}</a></li>
            ))}
            <li
              className="dd"
              ref={ddRef}
              onMouseEnter={() => setDdOpen(true)}
              onMouseLeave={() => setDdOpen(false)}
            >
              <button
                type="button"
                aria-expanded={ddOpen}
                aria-controls="industries-menu"
                onClick={() => setDdOpen(o => !o)}
              >
                Industries
                <ChevronDown size={15} className={`caret ${ddOpen ? 'open' : ''}`} aria-hidden="true" />
              </button>
              <AnimatePresence>
                {ddOpen && (
                  <motion.div
                    id="industries-menu"
                    className="dd-menu"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.16 }}
                  >
                    <span className="dd-head">Brands by category</span>
                    {INDUSTRIES.map(n => (
                      <a key={n} href={`#${indId(n)}`} onClick={() => setDdOpen(false)}>{n}</a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          </ul>

          <div className="nav-right">
            <a className="nav-quiet" href="#for-brands">For brands</a>
            <button type="button" className="btn btn-primary btn-sm nav-cta" onClick={onBook}>
              <span className="cta-long">Book a production review</span>
              <span className="cta-short">Book a review</span>
            </button>
            <button
              type="button"
              className="menu-btn"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(o => !o)}
            >
              {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="sheet-menu"
            aria-label="Site"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {LINKS.map(l => (
              <a key={l.href} className="m-link" href={l.href} onClick={() => setMenuOpen(false)}>
                {l.label}
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            ))}
            <a className="m-link" href="#for-brands" onClick={() => setMenuOpen(false)}>
              For brands
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <div className="m-label">Industries</div>
            <div className="m-chips">
              {INDUSTRIES.map(n => (
                <a key={n} href={`#${indId(n)}`} onClick={() => setMenuOpen(false)}>{n}</a>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => { setMenuOpen(false); onBook() }}
            >
              Book a production review
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
