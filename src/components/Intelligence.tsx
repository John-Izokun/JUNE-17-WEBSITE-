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
      <circle cx="12" cy="12" r="9" stroke="#10614A" strokeWidth="2"/>
      <circle cx="12" cy="12" r="4" stroke="#10614A" strokeWidth="2"/>
      <circle cx="12" cy="12" r="1.5" fill="#10614A"/>
    </svg>
  ),
  cyan: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="#17547F" strokeWidth="2"/>
      <path d="M9 22V12h6v10" stroke="#17547F" strokeWidth="2"/>
    </svg>
  ),
  amber: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#8F6A14" strokeWidth="2"/>
      <circle cx="9" cy="7" r="4" stroke="#8F6A14" strokeWidth="2"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#8F6A14" strokeWidth="2"/>
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
          <span className="label label-purple">05 · The Proof</span>
        </div>
        <h2 className="section-title">
          Three data sources. One routing system.
        </h2>
        <p className="section-sub">
          Every signal is verified against the live source before anything reaches
          your team — no stale lists, no guesswork, no bad-fit leads.
        </p>

        <motion.div
          className="intel-diagram"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="intel-diagram-title">Live routing map — three sources, one output</div>

          <svg viewBox="0 0 900 204" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram: Shopify storefronts, Amazon listings and decision-maker data flow into Signal and Line, which routes estimator-cleared RFQs to your quoting team.">
            {/* source nodes */}
            {[
              { y: 14,  l1: 'SHOPIFY STOREFRONTS', l2: '10,000+ monitored' },
              { y: 78,  l1: 'AMAZON LISTINGS',     l2: 'live availability' },
              { y: 142, l1: 'DECISION-MAKER DATA', l2: 'founder / COO verified' },
            ].map(n => (
              <g key={n.l1}>
                <rect x="8" y={n.y} width="196" height="48" rx="8"
                  fill="var(--paper)" stroke="var(--border-s)" strokeWidth="1" />
                <circle cx="28" cy={n.y + 24} r="3.5" fill="var(--accent)" opacity="0.85" />
                <text x="42" y={n.y + 21} fontFamily="var(--mono)" fontSize="10.5" letterSpacing="0.6" fill="var(--ink)">{n.l1}</text>
                <text x="42" y={n.y + 37} fontFamily="var(--mono)" fontSize="9.5" fill="var(--ink-3)">{n.l2}</text>
              </g>
            ))}

            {/* flow lines: sources → router */}
            <path className="flow-dash" d="M204 38 C 290 38, 300 96, 368 100" fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity="0.5" />
            <path className="flow-dash" d="M204 102 C 260 102, 300 102, 368 102" fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity="0.5" />
            <path className="flow-dash" d="M204 166 C 290 166, 300 108, 368 104" fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity="0.5" />

            {/* router */}
            <rect x="368" y="62" width="196" height="80" rx="10" fill="#0B1826" stroke="rgba(47,190,143,0.4)" strokeWidth="1.2" />
            <circle cx="394" cy="94" r="4" fill="#2FBE8F" />
            <text x="406" y="98" fontFamily="var(--mono)" fontSize="11" letterSpacing="0.8" fill="#E8EFF6">SIGNAL &amp; LINE</text>
            <text x="394" y="122" fontFamily="var(--mono)" fontSize="9.5" letterSpacing="0.6" fill="#6E87A0">QUALIFY · KILL · ROUTE</text>

            {/* router → output */}
            <path className="flow-dash" d="M564 102 C 630 102, 660 102, 700 102" fill="none" stroke="var(--accent)" strokeWidth="1.8" opacity="0.75" />

            {/* output node */}
            <rect x="700" y="70" width="192" height="64" rx="9" fill="var(--accent-tint)" stroke="var(--accent-border)" strokeWidth="1.2" />
            <text x="722" y="97" fontFamily="var(--mono)" fontSize="10.5" letterSpacing="0.6" fill="var(--accent-ink)">YOUR QUOTING TEAM</text>
            <text x="722" y="114" fontFamily="var(--mono)" fontSize="9.5" fill="var(--ink-2)">estimator-cleared RFQs</text>
          </svg>

          <div className="intel-diagram-mobile">
            <div className="intel-flow-row">Shopify storefronts — 10,000+ monitored</div>
            <div className="intel-flow-row">Amazon listings — live availability</div>
            <div className="intel-flow-row">Decision-maker data — verified</div>
            <div className="intel-flow-arrow">↓ &nbsp;Signal &amp; Line — qualify · kill bad fits · route</div>
            <div className="intel-flow-row" style={{ color: 'var(--accent-ink)' }}>Your quoting team — estimator-cleared RFQs</div>
          </div>
        </motion.div>

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
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
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
