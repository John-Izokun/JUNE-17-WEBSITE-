import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

function useCountUp(target: number, active: boolean, duration = 2000) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!active) return
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(ease * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, target, duration])
  return value
}

const CARDS = [
  {
    color: 'purple',
    label: 'Shopify Monitoring',
    countTarget: 10247,
    countSuffix: '',
    countLabel: 'Storefronts indexed',
    details: [
      'Live inventory tracking',
      'Variant-level stock detection',
      'Multi-product detection per brand',
      'False-positive filtering built in',
      'Continuous re-scan cadence',
    ],
  },
  {
    color: 'cyan',
    label: 'Amazon Detection',
    countTarget: 412,
    countSuffix: '',
    countLabel: 'Stock-outs flagged',
    details: [
      'Real-time availability checks',
      'Stock-status verification',
      'Brand-to-domain matching',
      'Confidence scoring on every signal',
      'Continuous coverage',
    ],
  },
  {
    color: 'amber',
    label: 'Decision-Maker Match',
    countTarget: 8340,
    countSuffix: '',
    countLabel: 'Decision-makers identified',
    details: [
      'Founder / COO / CEO targeting',
      'Verified work-email matching',
      'One decision-maker per brand',
      'No duplicate outreach',
      'Low-confidence routed to manual review',
    ],
  },
]

const ICON_SVG: Record<string, React.ReactElement> = {
  purple: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#B14A2A" strokeWidth="2"/>
      <circle cx="12" cy="12" r="4" stroke="#B14A2A" strokeWidth="2"/>
      <circle cx="12" cy="12" r="1.5" fill="#B14A2A"/>
    </svg>
  ),
  cyan: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="#275C4E" strokeWidth="2"/>
      <path d="M9 22V12h6v10" stroke="#275C4E" strokeWidth="2"/>
    </svg>
  ),
  amber: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#A8700F" strokeWidth="2"/>
      <circle cx="9" cy="7" r="4" stroke="#A8700F" strokeWidth="2"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#A8700F" strokeWidth="2"/>
    </svg>
  ),
}

export default function Intelligence() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section intel-section" ref={ref} id="intelligence">
      <div className="container">
        <div className="section-label">
          <span className="label label-purple">The Intelligence Layer</span>
        </div>
        <h2 className="section-title">
          Three data sources. One routing system.
        </h2>
        <p className="section-sub">
          Every signal is verified against the live source before anything reaches
          your team — no stale lists, no guesswork, no bad-fit leads.
        </p>

        <div className="intel-grid">
          {CARDS.map((card, idx) => {
            const count = useCountUp(card.countTarget, inView, 2200 + idx * 200)
            return (
              <motion.div
                key={card.label}
                className="intel-card"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
              >
                <div className="intel-card-header">
                  <div className={`intel-card-icon ${card.color}`}>
                    {ICON_SVG[card.color]}
                  </div>
                  <span className="intel-card-name">{card.label}</span>
                </div>
                <div className="intel-card-body">
                  <div className="intel-counter">
                    {count.toLocaleString()}{card.countSuffix}
                  </div>
                  <div className="intel-counter-label">{card.countLabel}</div>
                  <div className="intel-details">
                    {card.details.map(d => (
                      <div key={d} className="intel-detail">{d}</div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            marginTop: '2rem',
            padding: '1.25rem 1.5rem',
            background: 'var(--bg3)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--dim)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
              Pipeline
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
              Continuous monitoring → verified stock-out → decision-maker match → estimator-cleared RFQ routed to your team
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
            {['Live monitoring', 'Verified OOS', 'Decision-maker match', 'Estimator-cleared'].map(tag => (
              <span key={tag} style={{
                fontFamily: 'var(--mono)',
                fontSize: '10px',
                padding: '3px 8px',
                borderRadius: '20px',
                background: 'var(--purp-d)',
                color: 'var(--purp-l)',
                border: '1px solid var(--purp-b)',
              }}>{tag}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
