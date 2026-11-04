// One template for every market page except manufacturing. The words live in src/sectors.ts.
import { ArrowRight, Check } from 'lucide-react'
import type { Doc, Sector as SectorData } from '../sectors'
import { mailto } from '../site'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { BookingModal, SheetHead, useOverlays } from '../components/Shell'
import { Close, Faq, FreeSide, Terms } from '../components/Blocks'

function SourceDoc({ doc }: { doc: Doc }) {
  return (
    <article className="doc rec" aria-label={doc.label}>
      <div className="doc-head"><b>{doc.title}</b><span className="tag">Example</span></div>
      <dl>
        {doc.rows.map(r => (
          <div key={r.dt} className={`rec-row ${r.kind === 'flag' ? 'flag' : ''} ${r.kind === 'pass' ? 'pass' : ''}`}>
            <dt>{r.dt}</dt>
            <dd className={r.kind === 'strong' ? 'mark-strong' : undefined}>
              {r.kind === 'pass' && <Check size={15} aria-hidden="true" />}
              {r.dd}
            </dd>
          </div>
        ))}
      </dl>
      <div className="rec-foot">
        <span className={`stamp stamp-${doc.stampKind}`}>{doc.stamp}</span>
        <small>{doc.foot}</small>
      </div>
    </article>
  )
}

export default function Sector({ s }: { s: SectorData }) {
  const { booking, openBooking, closeBooking } = useOverlays()
  const freeHref = mailto(s.freeSide.subject)

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Nav current={s.slug} onBook={openBooking} />
      <main id="main">
        <section className="hero hero--sector" id="top">
          <div className="wrap">
            <div className="hero-top">
              <div>
                <p className="eyebrow"><span className="dot" />{s.hero.eyebrow}</p>
                <h1 className="h1">
                  {s.hero.setup}
                  <span className="payoff">{s.hero.payoff}</span>
                </h1>
              </div>
              <div className="hero-aside">
                <p className="lead">{s.hero.lead}</p>
                <div className="hero-ctas">
                  <button type="button" className="btn btn-primary" onClick={openBooking}>
                    Book an intro call
                    <ArrowRight size={18} aria-hidden="true" />
                  </button>
                  <a className="btn btn-ghost" href="#terms">See the terms</a>
                </div>
                <p className="hero-call">{s.hero.note}</p>
              </div>
            </div>

            <dl className="sides" aria-label="Both sides of this market">
              {s.sides.map(x => (
                <div key={x.k} className="side">
                  <dt>{x.k}</dt>
                  <dd>{x.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="sheet" id="source">
          <div className="wrap">
            <SheetHead no="01">Where the need comes from</SheetHead>
            <h2 className="h2">{s.source.h2}</h2>
            <p className="lede">{s.source.lede}</p>

            <div className="trio">
              <SourceDoc doc={s.source.docs[0]} />
              <div className="joint" aria-hidden="true">
                <ArrowRight size={20} />
                <span>{s.source.joints[0]}</span>
              </div>
              <SourceDoc doc={s.source.docs[1]} />
              <div className="joint" aria-hidden="true">
                <ArrowRight size={20} />
                <span>{s.source.joints[1]}</span>
              </div>
              <SourceDoc doc={s.source.docs[2]} />
            </div>

            <div className="also">
              <span className="tag">{s.source.also.tag}</span>
              <p>{s.source.also.text}</p>
            </div>

            <p className="pull">No cold lists. <span>No guesswork.</span></p>
          </div>
        </section>

        <section className="sheet sheet--paper" id="how-it-works">
          <div className="wrap">
            <SheetHead no="02">How it works</SheetHead>
            <div className="travel">
              <div className="travel-side">
                <h2 className="h2"><span className="h2-l">{s.steps.h2a}</span> <span className="h2-l">{s.steps.h2b}</span></h2>
                <p className="lede">{s.steps.lede}</p>
                <div className="who-key" aria-hidden="true">
                  <span className="who who-you">You</span>
                  <span className="who who-us">Us</span>
                </div>
              </div>
              <ol className="stations">
                {s.steps.items.map((st, i) => (
                  <li key={st.title} className="station">
                    <span className="st-dot" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <span className={`who who-${st.who}`}>{st.whoLabel}</span>
                    <h3>{st.title}</h3>
                    <p>{st.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <Terms
          id="terms"
          no="03"
          h2a={s.terms.h2a}
          h2b={s.terms.h2b}
          lede={s.terms.lede}
          doc={s.terms.doc}
          onBook={openBooking}
        />

        <FreeSide k={s.freeSide.k} b={s.freeSide.b} p={s.freeSide.p} cta={s.freeSide.cta} href={freeHref} id="free-side" />

        <Faq
          no="04"
          h2="The questions you’re already asking."
          lede="Straight answers, before any call."
          items={s.faqs}
          founder="I run Signal & Line from Montreal, and I put my name on these terms. If anything on this page isn’t clear, email me — I’ll answer it myself."
        />

        <Close no="05" h2={s.close.h2} p={s.close.p} onBook={openBooking} />
      </main>
      <Footer onBook={openBooking} />
      <BookingModal open={booking} onClose={closeBooking} />
    </>
  )
}
