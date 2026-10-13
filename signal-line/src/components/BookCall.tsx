import { useEffect, useMemo, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, BadgeCheck, FileText, Mail, Plus, Printer, X } from 'lucide-react'

const CAL_LINK = 'https://cal.com/johnizokun-klyvo/production-review?overlayCalendar=true'

const today = () => new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

export function printOnly(cls: 'print-quote' | 'print-memo') {
  const root = document.documentElement
  const done = () => {
    root.classList.remove(cls)
    window.removeEventListener('afterprint', done)
  }
  root.classList.add(cls)
  window.addEventListener('afterprint', done)
  window.print()
}

const SHARE_BODY = [
  'Terms from Signal & Line (www.klyvo.ca):',
  '',
  '- Five qualified brand introductions in 60 days',
  '- Qualified = actively sourcing, volume clears our minimum, a format our floor runs',
  '- Each brand goes to us and nobody else; any miss is replaced free',
  '- Fewer than five in 60 days: full refund',
  '- No commission on any run. The fee is agreed on a short call.',
  '- Our time: 30 minutes at onboarding',
  '',
  'https://www.klyvo.ca/#offer',
].join('\n')

const SHARE_HREF = `mailto:?subject=${encodeURIComponent('Signal & Line — terms for new brand introductions')}&body=${encodeURIComponent(SHARE_BODY)}`

const LINE_ITEMS: { no: string; title: string; detail: string; qty: string; zero?: boolean; memo?: boolean }[] = [
  { no: '01', title: 'Qualified brand introductions', detail: 'Actively sourcing · volume clears your minimum · a format your floor runs · each with a written memo', qty: '5', memo: true },
  { no: '02', title: 'Engagement period', detail: 'Counted from onboarding', qty: '60 days' },
  { no: '03', title: 'Exclusivity', detail: 'Each brand goes to your facility and nobody else — no racing other shops to the phone', qty: 'Included' },
  { no: '04', title: 'Replacement', detail: 'Any introduction that misses the definition above is replaced free', qty: 'Included' },
  { no: '05', title: 'Onboarding', detail: 'Thirty minutes of your time to map your floor — nothing after that', qty: '30 min' },
  { no: '06', title: 'Commission on any run you win', detail: 'We are not a broker', qty: 'None', zero: true },
]

const EXCLUSIONS: [string, string][] = [
  ['Not a broker.', 'We take no cut of any run — not the first one, not the tenth.'],
  ['Not your pricing.', 'We never touch your pricing or your margin. That conversation is yours.'],
  ['Not a list.', 'We don’t sell lists. Every brand has been spoken to before you hear about it.'],
  ['Not your clients.', 'We never contact your existing clients. They’re excluded at onboarding.'],
  ['Not a guarantee of work.', 'We don’t guarantee a production run. We control who reaches your inbox — not whether two businesses do a deal.'],
]

export function Offer({ onBook, onOpenMemo }: { onBook: () => void; onOpenMemo: () => void }) {
  const date = useMemo(today, [])

  return (
    <section className="sheet sheet--ground-2" id="offer">
      <div className="wrap">
        <header className="sheet-head">
          <span className="no">05</span><span>The offer</span><span className="rule" />
        </header>
        <h2 className="h2"><span className="h2-l">Every term, written&nbsp;down.</span> <span className="h2-l">No cut of the&nbsp;run.</span></h2>
        <p className="lede">
          You read quotes all day, so here are our terms — what you get, the guarantee and the
          exclusions — before you ever get on a call. The fee is agreed on the call.
        </p>

        <article className="quote" aria-labelledby="quote-title">
          <div className="q-top">
            <div>
              <div className="q-title" id="quote-title">TERMS</div>
              <div className="q-sub">Standard engagement · new brand introductions</div>
            </div>
            <dl className="q-meta">
              <dt>Ref.</dt><dd>SL-STD-01</dd>
              <dt>Prepared for</dt><dd>Your facility</dd>
              <dt>Issued by</dt><dd>Signal &amp; Line, Montreal</dd>
              <dt>Date</dt><dd>{date}</dd>
            </dl>
          </div>

          <table className="q-table">
            <thead>
              <tr><th scope="col">Item</th><th scope="col">Description</th><th scope="col">Terms</th></tr>
            </thead>
            <tbody>
              {LINE_ITEMS.map(li => (
                <tr key={li.no}>
                  <td className="q-no">{li.no}</td>
                  <td className="q-desc">
                    <b>{li.title}</b>
                    <span>
                      {li.detail}
                      {li.memo && (
                        <>
                          {' — '}
                          <button type="button" className="text-link" onClick={onOpenMemo} style={{ fontSize: 'inherit' }}>
                            see the sample
                          </button>
                        </>
                      )}
                    </span>
                  </td>
                  <td className={`q-qty ${li.zero ? 'zero' : ''}`}>{li.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="q-total">
            <span className="lbl">Fee</span>
            <span className="amt amt-text">Agreed on the call</span>
            <span className="once">No retainer · no commission</span>
          </div>

          <div className="q-guarantee">
            <BadgeCheck size={24} aria-hidden="true" />
            <div>
              <b>Guarantee: fewer than five qualified introductions in 60 days — full refund.</b>
              <span>Qualified means actively sourcing, volume that clears your minimum, and a format your floor can run.</span>
            </div>
          </div>

          <div className="q-excl">
            <h3>Exclusions — what we are not</h3>
            <ol>
              {EXCLUSIONS.map(([t, d]) => (
                <li key={t}><span><b>{t}</b> {d}</span></li>
              ))}
            </ol>
            <p className="fine">Certifications, lead times, pricing and final terms are between you and the brand.</p>
          </div>

          <p className="q-printnote">www.klyvo.ca · john.izokun@klyvo.ca · Signal &amp; Line, Montreal</p>

          <div className="q-foot">
            <p>To proceed, book a production review. If your floor isn’t a fit, we’ll tell you on the call.</p>
            <button type="button" className="btn btn-primary" onClick={onBook}>
              Book a production review
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <div className="q-tools">
              <button type="button" className="q-tool" onClick={() => printOnly('print-quote')}>
                <Printer size={16} aria-hidden="true" /> Print or save as PDF
              </button>
              <a className="q-tool" href={SHARE_HREF}>
                <Mail size={16} aria-hidden="true" /> Email these terms to a colleague
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

const FAQS: [string, string, boolean?][] = [
  ['Aren’t brand-new brands mostly tire-kickers?', 'Some are. None reaches you until it has told us what it’s making, how many units and when — and that run clears your minimum. If it can’t answer those, you never hear the name.'],
  ['Where do these brands come from?', 'Mostly from new trademark applications, which are public record — often filed before a brand has made anything or chosen a manufacturer. We also track brands that have sold out and need another run.'],
  ['Is this a list?', 'No. We don’t sell lists. Every brand has been spoken to before you hear the name, and has confirmed it is actually looking for a production partner.'],
  ['Why would a brand that sold out switch manufacturers?', 'Often it doesn’t — and then we don’t introduce it. We only bring you a reorder brand that has told us it’s looking: for example, because its current maker can’t fit the run in time, or it wants a second source.'],
  ['What does “qualified” actually mean?', 'Three things: the brand is actively sourcing, the volume clears your minimum, and the format is one your floor can run. If an introduction misses any of those, we replace it free.'],
  ['What do I actually receive with an introduction?', 'A written memo: who the brand is, who buys, what they are making, volume, certifications, timing and why it fits your floor — every line labeled with how it was confirmed, and unknowns marked as unknown.', true],
  ['Are you guaranteeing I win the work?', 'No — and be careful of anyone who does. We control who reaches your inbox, not whether two businesses agree on terms. Certifications, lead times and pricing are between you and the brand.'],
  ['What happens to my client list?', 'You list your current clients at onboarding so we can exclude them. We never contact a brand you already make product for.'],
  ['What is the production review?', 'A short call with John Izokun, the founder. You walk us through what your floor runs — formats, run sizes, minimums, certifications — and we tell you whether the brands we’re seeing fit it. If they don’t, we say so.'],
]

export function Questions({ onOpenMemo }: { onOpenMemo: () => void }) {
  return (
    <section className="sheet" id="questions">
      <div className="wrap">
        <header className="sheet-head">
          <span className="no">07</span><span>Straight answers</span><span className="rule" />
        </header>
        <h2 className="h2">The questions you’re already asking.</h2>
        <p className="lede">
          You have probably been sold a list before. Fair. Here are straight answers — no
          follow-up call required.
        </p>

        <div className="faq">
          {FAQS.map(([q, a, memo], i) => (
            <details key={q}>
              <summary>
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <span>{q}</span>
                <Plus size={20} className="pm" aria-hidden="true" />
              </summary>
              <div className="a">
                <p>{a}</p>
                {memo && (
                  <button type="button" className="text-link" onClick={onOpenMemo} style={{ marginTop: '0.75rem' }}>
                    <FileText size={15} aria-hidden="true" /> Open the sample memo
                  </button>
                )}
              </div>
            </details>
          ))}
        </div>

        <figure className="founder">
          <div className="founder-mono" aria-hidden="true">JI</div>
          <div>
            <blockquote>
              I run Signal &amp; Line from Montreal, and I put my name on these terms. If anything
              on this page isn’t clear, email me — I’ll answer it myself.
            </blockquote>
            <figcaption><cite>John Izokun · Founder · john.izokun@klyvo.ca</cite></figcaption>
          </div>
        </figure>
      </div>
    </section>
  )
}

interface BookCallProps {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  onOpenMemo: () => void
}

export default function BookCall({ isOpen, onOpen, onClose, onOpenMemo }: BookCallProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  return (
    <>
      <section className="close" id="book">
        <div className="wrap">
          <header className="sheet-head">
            <span className="no">08</span><span>Get started</span><span className="rule" />
          </header>
          <div className="close-grid">
            <div>
              <h2>Want brands that fit your floor?</h2>
              <p>
                Book a production review. We map your floor — formats, run sizes, minimums,
                certifications — and tell you straight whether the brands we’re seeing fit it.
                If they don’t, we say so on the call.
              </p>
            </div>
            <div className="close-actions">
              <div className="row">
                <button type="button" className="btn btn-light" onClick={onOpen}>
                  Book a production review
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
                <button type="button" className="btn btn-line-light" onClick={onOpenMemo}>
                  <FileText size={17} aria-hidden="true" />
                  See the sample memo
                </button>
              </div>
              <p className="close-mail">
                Prefer email? <a href="mailto:john.izokun@klyvo.ca">john.izokun@klyvo.ca</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isOpen && (
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
                <b id="book-title">Book a production review</b>
                <button ref={closeRef} type="button" className="modal-x" onClick={onClose} aria-label="Close booking">
                  <X size={18} aria-hidden="true" />
                </button>
              </div>
              <div className="modal-body">
                <iframe src={CAL_LINK} title="Book a production review with Signal & Line" allow="camera; microphone" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
