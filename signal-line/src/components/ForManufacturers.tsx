import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const COMPARE_ROWS = [
  { feature: 'Lead source',            old: 'Cold lists / directories',   fresh: 'Live OOS detection' },
  { feature: 'Who else gets the lead', old: 'Sold to 3–5 shops',          fresh: 'One facility — yours' },
  { feature: 'Contact quality',        old: 'Unverified titles',          fresh: 'Founder / COO verified'  },
  { feature: 'Format pre-check',       old: 'None — you find out after',  fresh: 'Matched before routing'  },
  { feature: 'MOQ alignment',          old: 'Random volume',              fresh: 'Checked against your floor' },
  { feature: 'Cert match',             old: 'Unknown',                    fresh: 'NSF / GMP / FDA filtered' },
  { feature: 'Estimator time wasted',  old: '80% of quotes',              fresh: 'Near zero'               },
]

export default function ForManufacturers() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section for-mfr" ref={ref} id="for-manufacturers" style={{ paddingTop: 0 }}>
      <div className="stat-band">
        <div className="container stat-band-grid">
          {[
            { num: '10,000+', label: 'Storefronts monitored' },
            { num: '<24h', label: 'Detection to routing' },
            { num: '6/6', label: 'Checks before routing' },
            { num: '$0', label: 'Commission on closes' },
          ].map(({ num, label }) => (
            <div key={label} className="stat-band-item">
              <div className="stat-band-num">{num}</div>
              <div className="stat-band-label">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="for-mfr-grid">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label">
              <span className="label label-purple">03 · For Manufacturers &amp; Co-packers</span>
            </div>
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>
              Your quoting team only sees the ones that fit.
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.75, marginBottom: '2rem' }}>
              Every RFQ that reaches your desk has already been cross-referenced against
              your facility profile — format, MOQ, certifications, and open capacity.
              Bad-fit conversations become impossible.
            </p>

            <div className="rfq-card tilt-l" style={{ marginBottom: '2rem' }}>
              <div className="rfq-card-header">
                <span className="rfq-card-title">Estimator-Cleared RFQ</span>
                <span className="rfq-routed-badge">● ROUTED</span>
              </div>
              <div className="rfq-card-body">
                {[
                  ['Brand',          'Neon Nutra (neonnutra.com)'],
                  ['Contact',        'Sarah Chen — Founder'],
                  ['Product needed', 'Ashwagandha Gummies 60ct'],
                  ['Volume',         '75,000 units'],
                  ['Format',         'Gummy'],
                  ['Certifications', 'NSF, GMP required'],
                  ['Timeline',       'Q2 — urgent'],
                ].map(([k, v]) => (
                  <div key={k} className="rfq-row">
                    <span className="rfq-key">{k}</span>
                    <span className="rfq-val">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {[
                { num: '6/6', label: 'filters passed per RFQ' },
                { num: '<24h', label: 'detection to routing' },
                { num: '0', label: 'commission on closes' },
              ].map(({ num, label }) => (
                <div key={label} style={{
                  flex: 1, minWidth: 110,
                  background: 'var(--bg4)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '1rem',
                  textAlign: 'center',
                }}>
                  <div style={{ fontFamily: 'var(--display)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--purp-l)', lineHeight: 1, marginBottom: '0.25rem' }}>{num}</div>
                  <div style={{ fontSize: '0.75rem', lineHeight: 1.4 }}>{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="compare-header">
              <span>What changes</span>
              <span>Before</span>
              <span>Signal & Line</span>
            </div>
            <div className="compare-table">
              {COMPARE_ROWS.map(({ feature, old, fresh }) => (
                <div key={feature} className="compare-row">
                  <span className="compare-feature">{feature}</span>
                  <span className="compare-old">✗ {old}</span>
                  <span className="compare-new">✓ {fresh}</span>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: '2rem',
              padding: '1.25rem',
              background: 'var(--purp-d)',
              border: '1px solid var(--purp-b)',
              borderRadius: '10px',
              fontSize: '0.9rem',
              lineHeight: 1.7,
              color: 'var(--muted)',
            }}>
              <span style={{ color: 'var(--purp-l)', fontWeight: 600 }}>You quote. We route.</span><br />
              Every lead that reaches you has a verified contact, a confirmed stock-out signal,
              and has been checked against your exact floor specs before you see it.
            </div>
          </motion.div>
        </div>

        <motion.div
          className="standard"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="section-label">
            <span className="label label-purple">The Standard</span>
          </div>
          <h2 className="section-title" style={{ maxWidth: 640 }}>
            One RFQ. One facility. <em className="std-em">Yours.</em>
          </h2>
          <p className="section-sub">
            Most lead sellers route the same &ldquo;opportunity&rdquo; to three, four, five shops
            and let you race to the phone. That&apos;s not a lead — that&apos;s an auction.
            Every RFQ we clear moves down one line, to one facility.
          </p>

          <div className="conveyor">
            <svg viewBox="0 0 900 132" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Production line diagram: an RFQ moves through detection, verification and spec-matching, then is routed exclusively to one facility.">
              <line x1="24" y1="96" x2="876" y2="96" stroke="var(--border-s)" strokeWidth="2" />
              <path className="flow-dash" d="M24 96 H876" fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity="0.45" />
              {[
                { x: 60,  l1: 'DETECTED',    l2: 'live stock-out' },
                { x: 280, l1: 'VERIFIED',    l2: 'decision-maker' },
                { x: 500, l1: 'SPEC-MATCHED',l2: 'your floor' },
              ].map(s => (
                <g key={s.l1}>
                  <line x1={s.x + 60} y1="76" x2={s.x + 60} y2="96" stroke="var(--border-s)" strokeWidth="1.5" />
                  <rect x={s.x} y="26" width="120" height="50" rx="7" fill="var(--card)" stroke="var(--border-s)" strokeWidth="1" />
                  <text x={s.x + 60} y="47" textAnchor="middle" fontFamily="var(--mono)" fontSize="10.5" letterSpacing="0.8" fill="var(--ink)">{s.l1}</text>
                  <text x={s.x + 60} y="63" textAnchor="middle" fontFamily="var(--mono)" fontSize="9" fill="var(--ink-3)">{s.l2}</text>
                </g>
              ))}
              <line x1="790" y1="76" x2="790" y2="96" stroke="var(--accent)" strokeWidth="1.5" />
              <rect x="712" y="20" width="156" height="56" rx="8" fill="#0B1826" stroke="rgba(47,190,143,0.5)" strokeWidth="1.4" />
              <text x="790" y="43" textAnchor="middle" fontFamily="var(--mono)" fontSize="10.5" letterSpacing="0.8" fill="#E8EFF6">ROUTED TO YOU</text>
              <text x="790" y="60" textAnchor="middle" fontFamily="var(--mono)" fontSize="9" fill="#2FBE8F">— and only you —</text>
              <rect className="conveyor-ticket" x="-14" y="88" width="28" height="16" rx="3" fill="var(--accent)" />
            </svg>

            <div className="conveyor-mobile">
              <div className="intel-flow-row">Detected — live stock-out</div>
              <div className="intel-flow-row">Verified — decision-maker</div>
              <div className="intel-flow-row">Spec-matched — your floor</div>
              <div className="intel-flow-row" style={{ color: 'var(--accent-ink)' }}>Routed to you — and only you</div>
            </div>
          </div>

          <div className="std-grid">
            <div className="std-card">
              <div className="std-card-title">Exclusive by default</div>
              <p className="std-card-desc">
                Every RFQ routes to one facility. No shared lists, no lead auctions,
                no racing four competitors to the same phone call.
              </p>
            </div>
            <div className="std-card">
              <div className="std-card-title">Transparent sourcing</div>
              <p className="std-card-desc">
                You watch the demand get found — live stock-out feed, named products,
                verified contacts. No black box, no mystery lists.
              </p>
            </div>
            <div className="std-card">
              <div className="std-card-title">Your contracts stay yours</div>
              <p className="std-card-desc">
                $0 commission on anything you close. We fill the line —
                the relationship, the pricing, and the margin belong to you.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
