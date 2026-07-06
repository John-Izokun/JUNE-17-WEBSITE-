import { useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const CAL_LINK = 'https://cal.com/johnizokun-klyvo/production-review?overlayCalendar=true'

interface BookCallProps {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export default function BookCall({ isOpen, onOpen, onClose }: BookCallProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // Escape key closes modal
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOpen) onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  const FAQS: [string, string][] = [
    ['Is this a lead list?', 'No. Lists are stale contacts sold to whoever pays. We detect live stock-outs, verify the decision-maker, check the fit against your floor — and if it doesn\'t clear every check, you never see it.'],
    ['Who else sees my RFQs?', 'Nobody. One RFQ, one facility. We don\'t auction demand to your competitors and let you race to the phone.'],
    ['Do you take a cut of contracts I close?', 'No. $0 commission — the contract, the pricing, and the margin stay yours. We fill the line; you keep the relationship.'],
    ['How is this different from a directory?', 'Directories give you a profile and hope brands come searching. The radar actively finds brands already selling out — usually within 24 hours of the stock-out — and brings the fit to you.'],
    ['What actually happens on the call?', 'Twenty minutes. We map your formats, MOQ floors, certifications, and capacity window — then run the radar live for your profile. If the demand isn\'t there for your floor, you\'ll know before you\'ve spent a dollar.'],
    ['We run a specific format. Does that matter?', 'It\'s the whole point. Every signal is checked against your exact formats and floors before routing — a serum RFQ never reaches a gummy line. Bad fits get killed, not forwarded.'],
  ]

  return (
    <>
      <section className="section faq-section" id="faq">
        <div className="container">
          <div className="section-label">
            <span className="label label-purple">06 · Straight Answers</span>
          </div>
          <h2 className="section-title">
            The questions you&apos;re already asking.
          </h2>
          <p className="section-sub">
            You&apos;ve probably been burned by a lead seller before. Fair.
            Here&apos;s exactly how this one works — no follow-up call required.
          </p>
          <div className="faq-grid">
            {FAQS.map(([q, a]) => (
              <div key={q} className="faq-card">
                <div className="faq-q">{q}</div>
                <p className="faq-a">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section book-section" ref={ref} id="book-call">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="book-grid">
              <div>
                <div className="section-label" style={{ marginBottom: '1rem' }}>
                  <span className="label" style={{ color: 'var(--d-accent-l)' }}>07 · Get Started</span>
                </div>
                <h2 className="book-title" style={{ textAlign: 'left' }}>
                  Ready to run the radar for your facility?
                </h2>
                <p className="book-sub" style={{ textAlign: 'left' }}>
                  Book a 20-minute call. We'll map your floor specs — format, MOQ, certifications,
                  capacity — and run the radar live for your exact profile. The first look is free:
                  if the demand isn't there for your floor, you'll know in twenty minutes.
                </p>
                <div className="book-ctas" style={{ justifyContent: 'flex-start' }}>
                  <button className="btn btn-primary" onClick={onOpen}>
                    Run the OOS Radar for My Facility
                  </button>
                  <button className="btn btn-outline" onClick={onOpen}>
                    Watch the Demo First
                  </button>
                </div>
                <div className="book-trust" style={{ justifyContent: 'flex-start' }}>
                  <span className="book-trust-item">No raw lead lists</span>
                  <span className="book-trust-item">Estimator-cleared RFQs only</span>
                  <span className="book-trust-item">Built for co-packers</span>
                </div>
              </div>

              <div className="book-panel">
                <div className="book-panel-title">On the 20-minute call</div>
                {[
                  ['We map your floor', 'formats, MOQ floors, certifications, and open capacity windows.'],
                  ['You see the radar live', 'real stock-out signals filtered to your exact facility profile.'],
                  ['You leave with fit criteria', 'exactly what gets routed to you — and what gets killed. No obligation.'],
                ].map(([title, desc]) => (
                  <div key={title} className="book-check">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" stroke="#2FBE8F" strokeWidth="1.6" />
                      <path d="M8 12.2l2.6 2.6L16 9.5" stroke="#2FBE8F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span><strong>{title}</strong> — {desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(232,239,246,0.1)', textAlign: 'center' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--dim)', marginBottom: '0.5rem' }}>
                Brand with a stock-out?
              </p>
              <a href="mailto:john.izokun@klyvo.ca" style={{ fontSize: '0.875rem', color: 'var(--purp-l)', textDecoration: 'none', fontWeight: 500 }}>
                Submit your product need → john.izokun@klyvo.ca
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={e => { if (e.target === e.currentTarget) onClose() }}
          >
            <motion.div
              className="modal-box"
              role="dialog"
              aria-modal="true"
              aria-label="Book a call with Signal & Line"
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 32, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="modal-header">
                <span className="modal-header-title">Run the OOS Radar — Signal & Line</span>
                <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
              </div>
              <div className="modal-body">
                <iframe
                  src={CAL_LINK}
                  title="Book a call with Signal & Line"
                  allow="camera; microphone"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
