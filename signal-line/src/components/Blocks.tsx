// Content blocks shared by every page: terms, questions, founder note, closing call.
import { ArrowRight, BadgeCheck, FileText, Mail, Plus, Printer } from 'lucide-react'
import { useMemo, type ReactNode } from 'react'
import type { TermsDoc } from '../sectors'
import { EMAIL } from '../site'
import { SheetHead } from './Shell'
import { printOnly } from './print'

const today = () => new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

interface TermsProps {
  id: string
  no: string
  h2a: string
  h2b: string
  lede: string
  doc: TermsDoc
  onBook: () => void
  onOpenMemo?: () => void
  memoRow?: number // index of the row that links to the sample memo
  share?: { subject: string; body: string }
}

export function Terms({ id, no, h2a, h2b, lede, doc, onBook, onOpenMemo, memoRow, share }: TermsProps) {
  const date = useMemo(today, [])
  const shareHref = share
    ? `mailto:?subject=${encodeURIComponent(share.subject)}&body=${encodeURIComponent(share.body)}`
    : null

  return (
    <section className="sheet sheet--ground-2 terms-sheet" id={id}>
      <div className="wrap">
        <SheetHead no={no}>The terms</SheetHead>
        <h2 className="h2"><span className="h2-l">{h2a}</span> <span className="h2-l">{h2b}</span></h2>
        <p className="lede">{lede}</p>

        <article className="quote" aria-labelledby={`${id}-title`}>
          <div className="q-top">
            <div>
              <div className="q-title" id={`${id}-title`}>TERMS</div>
              <div className="q-sub">{doc.sub}</div>
            </div>
            <dl className="q-meta">
              <dt>Ref.</dt><dd>{doc.ref}</dd>
              <dt>Prepared for</dt><dd>{doc.preparedFor}</dd>
              <dt>Issued by</dt><dd>Signal &amp; Line, Montreal</dd>
              <dt>Date</dt><dd>{date}</dd>
            </dl>
          </div>

          <table className="q-table">
            <thead>
              <tr><th scope="col">Item</th><th scope="col">Description</th><th scope="col">Terms</th></tr>
            </thead>
            <tbody>
              {doc.rows.map((r, i) => (
                <tr key={r.title}>
                  <td className="q-no">{String(i + 1).padStart(2, '0')}</td>
                  <td className="q-desc">
                    <b>{r.title}</b>
                    <span>
                      {r.detail}
                      {memoRow === i && onOpenMemo && (
                        <>
                          {' — '}
                          <button type="button" className="text-link" onClick={onOpenMemo} style={{ fontSize: 'inherit' }}>
                            see the sample
                          </button>
                        </>
                      )}
                    </span>
                  </td>
                  <td className="q-qty">{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="q-total">
            <span className="lbl">Fee</span>
            <span className="amt amt-text">{doc.fee}</span>
            <span className="once">{doc.feeNote}</span>
          </div>

          {doc.guarantee && (
            <div className="q-guarantee">
              <BadgeCheck size={24} aria-hidden="true" />
              <div>
                <b>{doc.guarantee.b}</b>
                <span>{doc.guarantee.span}</span>
              </div>
            </div>
          )}

          <div className="q-excl">
            <h3>Exclusions — what we are not</h3>
            <ol>
              {doc.exclusions.map(([t, d]) => (
                <li key={t}><span><b>{t}</b> {d}</span></li>
              ))}
            </ol>
            <p className="fine">{doc.fine}</p>
          </div>

          <p className="q-printnote">www.klyvo.ca · {EMAIL} · Signal &amp; Line, Montreal</p>

          <div className="q-foot">
            <p>To go ahead, book an intro call. If it isn’t a fit, we’ll tell you on the call.</p>
            <button type="button" className="btn btn-primary" onClick={onBook}>
              Book an intro call
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <div className="q-tools">
              <button type="button" className="q-tool" onClick={() => printOnly('print-quote')}>
                <Printer size={16} aria-hidden="true" /> Print or save as PDF
              </button>
              {shareHref && (
                <a className="q-tool" href={shareHref}>
                  <Mail size={16} aria-hidden="true" /> Email these terms to a colleague
                </a>
              )}
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

export type Qa = [question: string, answer: string, memo?: boolean]

interface FaqProps {
  no: string
  h2: string
  lede: string
  items: Qa[]
  onOpenMemo?: () => void
  founder: string
}

export function Faq({ no, h2, lede, items, onOpenMemo, founder }: FaqProps) {
  return (
    <section className="sheet" id="questions">
      <div className="wrap">
        <SheetHead no={no}>Straight answers</SheetHead>
        <h2 className="h2">{h2}</h2>
        <p className="lede">{lede}</p>

        <div className="faq">
          {items.map(([q, a, memo], i) => (
            <details key={q}>
              <summary>
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <span>{q}</span>
                <Plus size={20} className="pm" aria-hidden="true" />
              </summary>
              <div className="a">
                <p>{a}</p>
                {memo && onOpenMemo && (
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
            <blockquote>{founder}</blockquote>
            <figcaption><cite>John Izokun · Founder · {EMAIL}</cite></figcaption>
          </div>
        </figure>
      </div>
    </section>
  )
}

interface CloseProps {
  no: string
  label?: string
  h2: string
  p: string
  onBook: () => void
  secondary?: ReactNode
}

export function Close({ no, label = 'Get started', h2, p, onBook, secondary }: CloseProps) {
  return (
    <section className="close" id="book">
      <div className="wrap">
        <SheetHead no={no}>{label}</SheetHead>
        <div className="close-grid">
          <div>
            <h2>{h2}</h2>
            <p>{p}</p>
          </div>
          <div className="close-actions">
            <div className="row">
              <button type="button" className="btn btn-light" onClick={onBook}>
                Book an intro call
                <ArrowRight size={18} aria-hidden="true" />
              </button>
              {secondary}
            </div>
            <p className="close-mail">
              Prefer email? <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// The free side of a market: one strip, one email button.
export function FreeSide({ k, b, p, cta, href, id }: { k: string; b: string; p: string; cta: string; href: string; id?: string }) {
  return (
    <section className="free-side-band" id={id}>
      <div className="wrap">
        <div className="for-brands">
          <span className="k">{k}</span>
          <p><b>{b}</b> {p}</p>
          <a className="btn btn-ghost btn-sm" href={href}>
            {cta}
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
