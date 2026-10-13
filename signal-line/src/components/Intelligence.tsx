import { useEffect, useMemo, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, FileText, Printer, X } from 'lucide-react'
import { printOnly } from './BookCall'

interface Props {
  onOpenMemo: () => void
}

function filedDate() {
  const d = new Date()
  d.setDate(d.getDate() - 9)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function Intelligence({ onOpenMemo }: Props) {
  const filed = useMemo(filedDate, [])

  return (
    <section className="sheet" id="source">
      <div className="wrap">
        <header className="sheet-head">
          <span className="no">02</span><span>Where the brands come from</span><span className="rule" />
        </header>

        <h2 className="h2">Many brands exist on paper before they exist on a&nbsp;shelf.</h2>
        <p className="lede">
          A trademark application is public the day it’s filed — often before the brand has made
          anything, and before it has chosen who will make it. Here is how one of them reaches
          your desk.
        </p>

        <div className="trio">
          <article className="doc rec" aria-label="Example trademark application">
            <div className="doc-head"><b>Trademark application</b><span className="tag">Example</span></div>
            <dl>
              <div className="rec-row"><dt>Mark</dt><dd className="mark-strong">MARIGOLD BOTANICALS</dd></div>
              <div className="rec-row"><dt>Filed</dt><dd>{filed}</dd></div>
              <div className="rec-row"><dt>Class</dt><dd>003 — Cosmetics: serums, creams</dd></div>
              <div className="rec-row"><dt>Owner</dt><dd>Marigold Botanicals LLC</dd></div>
              <div className="rec-row"><dt>Status</dt><dd>New application</dd></div>
              <div className="rec-row flag"><dt>Filing basis</dt><dd>Intent to use — not yet sold</dd></div>
            </dl>
            <div className="rec-foot">
              <span className="stamp stamp-public">Public record</span>
              <small>Applied for · nothing made yet</small>
            </div>
          </article>

          <div className="joint" aria-hidden="true">
            <ArrowRight size={20} />
            <span>We call</span>
          </div>

          <article className="doc rec" aria-label="Example call notes">
            <div className="doc-head"><b>Call notes</b><span className="tag">Example</span></div>
            <dl>
              <div className="rec-row"><dt>Spoken to</dt><dd>Yes — the founder</dd></div>
              <div className="rec-row"><dt>Looking</dt><dd>For a facility, now</dd></div>
              <div className="rec-row"><dt>Making</dt><dd>30 ml facial serum, dropper</dd></div>
              <div className="rec-row"><dt>First run</dt><dd>10,000 units</dd></div>
              <div className="rec-row"><dt>Needs</dt><dd>cGMP facility</dd></div>
              <div className="rec-row"><dt>Timing</dt><dd>First run within three months</dd></div>
            </dl>
            <div className="rec-foot">
              <span className="stamp stamp-call">Brand-confirmed</span>
              <small>Before you hear the name</small>
            </div>
          </article>

          <div className="joint" aria-hidden="true">
            <ArrowRight size={20} />
            <span>We check</span>
          </div>

          <article className="doc rec" aria-label="Example introduction">
            <div className="doc-head"><b>Introduction</b><span className="tag">Example</span></div>
            <dl>
              <div className="rec-row"><dt>To</dt><dd>Your quoting team — nobody else</dd></div>
              <div className="rec-row pass"><dt>Format</dt><dd><Check size={15} aria-hidden="true" />Serum — you run it</dd></div>
              <div className="rec-row pass"><dt>Run size</dt><dd><Check size={15} aria-hidden="true" />Clears your minimum</dd></div>
              <div className="rec-row pass"><dt>Certs</dt><dd><Check size={15} aria-hidden="true" />cGMP — you hold it</dd></div>
              <div className="rec-row pass"><dt>Timing</dt><dd><Check size={15} aria-hidden="true" />You have room</dd></div>
            </dl>
            <div className="rec-foot">
              <span className="stamp stamp-intro">Introduced</span>
              <button type="button" className="text-link" onClick={onOpenMemo}>
                See the memo <ArrowRight size={15} aria-hidden="true" />
              </button>
            </div>
          </article>
        </div>

        <div className="also">
          <span className="tag">Also tracked</span>
          <p>
            <b>Brands that have sold out and need another run.</b> Proven sellers who already know
            their run size. A supporting source — new filings are the main one.
          </p>
        </div>

        <p className="pull">No cold lists. <span>No guesswork.</span></p>
      </div>
    </section>
  )
}

const MEMO_FIELDS: [string, string, string][] = [
  ['Brand / company', 'Public description of the business. The name can be held back until the brand approves sharing it.', 'public'],
  ['Who buys', 'Name or role, their authority to decide, and how that was checked.', 'brand'],
  ['Why now', 'What changed, and whether it is confirmed or was seen once. Dated, with a recheck date.', 'public'],
  ['What they are sourcing', 'A new launch, a second source, a switch from their current facility — or unknown.', 'brand'],
  ['Product & format', 'Product, category, dosage or fill form, size, process and variants.', 'brand'],
  ['Volume & minimum', 'Confirmed range and whether they accept your minimum. Otherwise marked unknown — never estimated.', 'brand'],
  ['Certifications', 'What the product has to carry, and where that requirement comes from.', 'brand'],
  ['Formula & allergens', 'Who owns the formula, readiness to transfer, allergens and material exclusions.', 'brand'],
  ['Packaging', 'Primary and secondary format, who sources components, artwork and label status.', 'brand'],
  ['Where it ships', 'Selling markets, ship-to, import or export, warehousing.', 'brand'],
  ['Timing', 'Quote, sample, validation, launch or first-run window — and the source for it.', 'brand'],
  ['Why it fits your floor', 'The match against the format, minimum, certifications and capacity window you confirmed.', 'facility'],
  ['Open questions', 'What your estimator should resolve first.', 'unknown'],
  ['Who approved it', 'Who authorized the introduction, when, and to which contact at your facility.', 'brand'],
]

const EVIDENCE: Record<string, string> = {
  public: 'Public record',
  brand: 'Brand-confirmed',
  facility: 'Facility-confirmed',
  unknown: 'Unknown',
}

const LEFT_OUT = [
  'A brand that sold out once, presented as a confirmed reorder.',
  'Guessed volume, minimums, budget, project value or run frequency.',
  'Unchecked formulas, packaging, certifications, allergens, timing or capacity.',
  'Private formulas, supplier relationships or contacts the brand hasn’t approved sharing.',
  'Anything announced but not yet done, presented as done.',
]

export function MemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
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
            className="modal memo"
            role="dialog"
            aria-modal="true"
            aria-labelledby="memo-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <div className="modal-head">
              <b id="memo-title"><FileText size={17} aria-hidden="true" style={{ display: 'inline', verticalAlign: '-3px', marginRight: '0.5rem' }} />Pre-introduction memo — sample</b>
              <div className="modal-actions">
                <button type="button" className="q-tool" onClick={() => printOnly('print-memo')}>
                  <Printer size={16} aria-hidden="true" /> Print
                </button>
                <button ref={closeRef} type="button" className="modal-x" onClick={onClose} aria-label="Close memo">
                  <X size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="memo-body">
              <p className="memo-kicker">The blank memo that comes with every introduction</p>
              <dl className="memo-meta">
                <div><dt>Prepared for</dt><dd>Your quoting team and estimator</dd></div>
                <div><dt>Purpose</dt><dd>Enough checked context to assign the right estimator and prepare for the first conversation — without sharing more about the brand than it has approved.</dd></div>
              </dl>
              <p className="memo-rule">
                Only facts that can be supported go in. Every line carries one of four labels.
                A good story is never a substitute for evidence.
              </p>
              <div className="memo-key" aria-label="Evidence labels">
                {Object.entries(EVIDENCE).map(([k, v]) => <span key={k} className={`ev ev-${k}`}>{v}</span>)}
              </div>
              <table className="memo-table">
                <thead>
                  <tr><th scope="col">Field</th><th scope="col">What goes here</th><th scope="col">Typical label</th></tr>
                </thead>
                <tbody>
                  {MEMO_FIELDS.map(([f, d, e]) => (
                    <tr key={f}>
                      <td>{f}</td>
                      <td>{d}</td>
                      <td><span className={`ev ev-${e}`}>{EVIDENCE[e]}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="memo-out">
                <h3>Deliberately left out</h3>
                <ul>
                  {LEFT_OUT.map(x => <li key={x}><X size={15} aria-hidden="true" />{x}</li>)}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
