import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const COMPARE_ROWS = [
  { feature: 'Lead source',            old: 'Cold lists / directories',   fresh: 'Live OOS detection' },
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
    <section className="section for-mfr" ref={ref} id="for-manufacturers">
      <div className="container">
        <div className="for-mfr-grid">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label">
              <span className="label label-purple">For Manufacturers &amp; Co-packers</span>
            </div>
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>
              Your quoting team only sees the ones that fit.
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.75, marginBottom: '2rem' }}>
              Every RFQ that reaches your desk has already been cross-referenced against
              your facility profile — format, MOQ, certifications, and open capacity.
              Bad-fit conversations become impossible.
            </p>

            <div className="rfq-card" style={{ marginBottom: '2rem' }}>
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
      </div>
    </section>
  )
}
