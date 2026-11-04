import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react'
import { GROUPS, MARKETS } from '../site'

interface NavProps {
  current: string // 'home' or a market slug
  onBook: () => void
}

export function Wordmark() {
  return <>Signal <span className="amp">&amp;</span> Line</>
}

export default function Nav({ current, onBook }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [ddOpen, setDdOpen] = useState(false)
  const ddRef = useRef<HTMLLIElement>(null)
  const home = current === 'home'

  // Section links point at this page's own sections; Partner results lives on the home page.
  const links = [
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Partner results', href: home ? '#results' : '/#results' },
    { label: 'Questions', href: '#questions' },
  ]

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
    if (menuOpen) document.body.style.overflow = 'hidden'
    else if (!document.querySelector('.modal-overlay')) document.body.style.overflow = ''
    const onResize = () => { if (window.innerWidth > 1080) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [menuOpen])

  return (
    <>
      <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="wrap nav-inner">
          <a href="/" className="brand" aria-label="Signal & Line — home">
            <Wordmark />
          </a>

          <ul className="nav-links">
            <li
              className="dd"
              ref={ddRef}
              onMouseEnter={() => setDdOpen(true)}
              onMouseLeave={() => setDdOpen(false)}
            >
              <button
                type="button"
                aria-expanded={ddOpen}
                aria-controls="markets-menu"
                onClick={() => setDdOpen(o => !o)}
              >
                Markets
                <ChevronDown size={14} className={`caret ${ddOpen ? 'open' : ''}`} aria-hidden="true" />
              </button>
              <AnimatePresence>
                {ddOpen && (
                  <motion.div
                    id="markets-menu"
                    className="dd-menu"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.16 }}
                  >
                    <span className="dd-head">Where we make introductions</span>
                    <div className="dd-groups">
                      {GROUPS.map(g => (
                        <div key={g} className="dd-group">
                          <span className="dd-group-k">{g}</span>
                          {MARKETS.filter(m => m.group === g).map(m => (
                            <a
                              key={m.slug}
                              href={m.href}
                              aria-current={current === m.slug ? 'page' : undefined}
                              onClick={() => setDdOpen(false)}
                            >
                              <b>{m.name}</b>
                              <span>{m.provides}</span>
                            </a>
                          ))}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
            {links.map(l => (
              <li key={l.label}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>

          <div className="nav-right">
            <button type="button" className="btn btn-primary btn-sm nav-cta" onClick={onBook}>
              <span className="cta-long">Book an intro call</span>
              <span className="cta-short">Book a call</span>
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
            {!home && (
              <a className="m-link" href="/" onClick={() => setMenuOpen(false)}>
                Home
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            )}
            {GROUPS.map(g => (
              <div key={g}>
                <div className="m-label">{g}</div>
                {MARKETS.filter(m => m.group === g).map(m => (
                  <a
                    key={m.slug}
                    className="m-link m-market"
                    href={m.href}
                    aria-current={current === m.slug ? 'page' : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {m.name}
                    <ArrowRight size={18} aria-hidden="true" />
                  </a>
                ))}
              </div>
            ))}
            <div className="m-label">On this page</div>
            {links.map(l => (
              <a key={l.label} className="m-link" href={l.href} onClick={() => setMenuOpen(false)}>
                {l.label}
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            ))}
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => { setMenuOpen(false); onBook() }}
            >
              Book an intro call
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
