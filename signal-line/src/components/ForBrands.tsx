import type { ReactNode } from 'react'
import { FORMATS, INDUSTRIES, indId, type Format } from './Nav'

const STROKE = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

const FORMAT_CARDS: Record<Format, { sub: string; icon: ReactNode }> = {
  'Capsules & tablets': {
    sub: 'Supplements, nutraceuticals',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true" {...STROKE}>
        <rect x="8.2" y="2.6" width="7.6" height="18.8" rx="3.8" transform="rotate(45 12 12)" />
        <path d="M8.6 8.6l6.8 6.8" />
      </svg>
    ),
  },
  'Gummies & soft chews': {
    sub: 'Vitamins, supplements, pet chews',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true" {...STROKE}>
        <rect x="3.6" y="9.4" width="10.6" height="10.6" rx="3.4" />
        <path d="M9.8 9.4V7.6a3.4 3.4 0 013.4-3.4h3.8a3.4 3.4 0 013.4 3.4v3.8a3.4 3.4 0 01-3.4 3.4h-2.8" />
        <path d="M6.6 13.2c.6-.9 1.4-1.4 2.3-1.4" />
      </svg>
    ),
  },
  'Powders & blends': {
    sub: 'Protein, greens, drink mixes',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true" {...STROKE}>
        <path d="M8 9h8l1.5 11a1.6 1.6 0 01-1.6 1.8H8.1A1.6 1.6 0 016.5 20L8 9z" />
        <rect x="8.6" y="4.4" width="6.8" height="4.6" rx="1" />
        <path d="M9.4 15h5.2" />
      </svg>
    ),
  },
  'Liquids & serums': {
    sub: 'Skincare, haircare, drops',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true" {...STROKE}>
        <path d="M12 3v2.4" />
        <rect x="9.4" y="5.4" width="5.2" height="3" rx="1" />
        <path d="M10 8.4L9.2 19a2.8 2.8 0 005.6 0L14 8.4" />
        <path d="M10.2 15.4h3.6" />
      </svg>
    ),
  },
  'Creams & lotions': {
    sub: 'Skincare, cosmetics, body care',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true" {...STROKE}>
        <rect x="5" y="9.4" width="14" height="11" rx="2.4" />
        <path d="M6.4 6.6h11.2v2.8H6.4z" />
        <path d="M5 13.6h14" />
      </svg>
    ),
  },
  'Drinks & shots': {
    sub: 'Functional drinks, wellness shots',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true" {...STROKE}>
        <rect x="7" y="6.6" width="10" height="14.4" rx="2.2" />
        <path d="M9 3.4h6l1 3.2H8l1-3.2z" />
        <path d="M7 11h10" />
      </svg>
    ),
  },
}

export default function ForBrands() {
  return (
    <section className="sheet sheet--paper" id="industries">
      <div className="wrap">
        <header className="sheet-head">
          <span className="no">06</span><span>Formats &amp; industries</span><span className="rule" />
        </header>
        <h2 className="h2">Built for the formats you already run.</h2>
        <p className="lede">
          We introduce brands across consumer categories, matched by format first — because a
          brand is only worth your estimator’s time if your line can make it.
        </p>

        <div className="formats">
          {FORMATS.map(f => (
            <div key={f} className="format">
              {FORMAT_CARDS[f].icon}
              <div>
                <b>{f}</b>
                <span>{FORMAT_CARDS[f].sub}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="industries">
          <span className="k">Industries</span>
          {INDUSTRIES.map(n => <span key={n} id={indId(n)} className="ind">{n}</span>)}
        </div>
      </div>
    </section>
  )
}
