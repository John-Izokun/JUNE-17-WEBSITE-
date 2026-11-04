import React, { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { LucideProvider, ExternalLink, X } from 'lucide-react'
import { CAL_EMBED, CAL_LINK } from '../site'
import '../styles.css'

// Renders a page with the providers every page shares.
export function mount(page: ReactNode) {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <MotionConfig reducedMotion="user">
        <LucideProvider strokeWidth={1.75} absoluteStrokeWidth>
          {page}
        </LucideProvider>
      </MotionConfig>
    </React.StrictMode>,
  )
}

// Booking and memo overlays, with the page scroll locked while one is open.
export function useOverlays() {
  const [booking, setBooking] = useState(false)
  const [memo, setMemo] = useState(false)
  const lock = (on: boolean) => { document.body.style.overflow = on ? 'hidden' : '' }

  const openBooking = useCallback(() => { setMemo(false); setBooking(true); lock(true) }, [])
  const closeBooking = useCallback(() => { setBooking(false); lock(false) }, [])
  const openMemo = useCallback(() => { setMemo(true); lock(true) }, [])
  const closeMemo = useCallback(() => { setMemo(false); lock(false) }, [])

  return { booking, memo, openBooking, closeBooking, openMemo, closeMemo }
}

export function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={e => { if (e.target === e.currentTarget) onClose() }}
        >
          <motion.div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="book-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <div className="modal-head">
              <b id="book-title">Book an intro call with John</b>
              <div className="modal-actions">
                <a className="q-tool" href={CAL_LINK} target="_blank" rel="noopener">
                  <ExternalLink size={15} aria-hidden="true" /> <span className="hide-sm">Open in a new tab</span>
                </a>
                <button ref={closeRef} type="button" className="modal-x" onClick={onClose} aria-label="Close booking">
                  <X size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="modal-body">
              <iframe src={CAL_EMBED} title="Book an intro call with Signal & Line" allow="camera; microphone" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// One numbered section label, used at the top of every section.
export function SheetHead({ no, children }: { no: string; children: ReactNode }) {
  return (
    <header className="sheet-head">
      <span className="no">{no}</span><span>{children}</span><span className="rule" />
    </header>
  )
}
