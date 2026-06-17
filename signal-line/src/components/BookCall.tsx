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

  return (
    <>
      <section className="section book-section" ref={ref} id="book-call">
        <div className="container">
          <motion.div
            className="book-inner"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label" style={{ justifyContent: 'center', display: 'flex', marginBottom: '1rem' }}>
              <span className="label label-purple">Get Started</span>
            </div>
            <h2 className="book-title">
              Ready to run the radar<br />for your facility?
            </h2>
            <p className="book-sub">
              Book a 20-minute call. We'll map your floor specs — format, MOQ, certifications,
              capacity — and show you what the OOS Radar surfaces for your exact profile.
            </p>
            <div className="book-ctas">
              <button className="btn btn-primary" onClick={onOpen}>
                Run the OOS Radar for My Facility
              </button>
              <button className="btn btn-outline" onClick={onOpen}>
                Watch the Demo First
              </button>
            </div>
            <div className="book-trust">
              <span className="book-trust-item">No raw lead lists</span>
              <span className="book-trust-item">Estimator-cleared RFQs only</span>
              <span className="book-trust-item">Facility-fit before routing</span>
              <span className="book-trust-item">Built for co-packers</span>
            </div>

            <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
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
