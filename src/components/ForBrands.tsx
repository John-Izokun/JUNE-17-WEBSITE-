import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ICON_STROKE = { fill: 'none', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

const FORMATS = [
  {
    label: 'Gummies & capsules',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" {...ICON_STROKE}>
        <rect x="8.2" y="2.6" width="7.6" height="18.8" rx="3.8" transform="rotate(45 12 12)" />
        <path d="M8.6 8.6l6.8 6.8" />
      </svg>
    ),
  },
  {
    label: 'Powders & blends',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" {...ICON_STROKE}>
        <path d="M8 9h8l1.5 11a1.6 1.6 0 01-1.6 1.8H8.1A1.6 1.6 0 016.5 20L8 9z" />
        <rect x="8.6" y="4.4" width="6.8" height="4.6" rx="1" />
        <path d="M9.4 15h5.2" />
      </svg>
    ),
  },
  {
    label: 'Serums & droppers',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" {...ICON_STROKE}>
        <path d="M12 3v2.4" />
        <rect x="9.4" y="5.4" width="5.2" height="3" rx="1" />
        <path d="M10 8.4L9.2 19a2.8 2.8 0 005.6 0L14 8.4" />
        <path d="M10.2 15.4h3.6" />
      </svg>
    ),
  },
  {
    label: 'Creams & jars',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" {...ICON_STROKE}>
        <rect x="5" y="9.4" width="14" height="11" rx="2.4" />
        <path d="M6.4 6.6h11.2v2.8H6.4z" />
        <path d="M5 13.6h14" />
      </svg>
    ),
  },
  {
    label: 'Sachets & pouches',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" {...ICON_STROKE}>
        <path d="M7.4 4.6h9.2l1.8 13.2a2.4 2.4 0 01-2.4 2.7H8a2.4 2.4 0 01-2.4-2.7L7.4 4.6z" />
        <path d="M7 7.4h10" />
        <path d="M9.6 13.2c.8 1 1.6 1.5 2.4 1.5s1.6-.5 2.4-1.5" />
      </svg>
    ),
  },
  {
    label: 'Beverages & shots',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" {...ICON_STROKE}>
        <rect x="7" y="6.6" width="10" height="14.4" rx="2.2" />
        <path d="M9 3.4h6l1 3.2H8l1-3.2z" />
        <path d="M7 11h10" />
      </svg>
    ),
  },
]

const STEPS = [
  {
    num: '01',
    label: 'Detection',
    title: 'Stock-out confirmed',
    desc: 'Our radar detects your product going out of stock the moment it happens — verified live, within hours, not days.',
    time: 'Within 24 hours of stock-out',
    active: true,
  },
  {
    num: '02',
    label: 'Qualification',
    title: 'Manufacturer matched',
    desc: 'Your product format, volume, and certifications are checked against our network of co-packers with open capacity.',
    time: 'Within 48 hours',
    active: true,
  },
  {
    num: '03',
    label: 'Introduction',
    title: 'Personal intro sent',
    desc: 'A personalised email goes to your team referencing the exact product that\'s out of stock and the manufacturer who can run it.',
    time: 'Within 48–72 hours',
    active: true,
  },
  {
    num: '04',
    label: 'RFQ',
    title: 'You\'re quoting',
    desc: 'The manufacturer receives your specs. You receive their quote. The gap closes.',
    time: 'Week 1',
    active: false,
  },
]

export default function ForBrands() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section" ref={ref} id="for-brands">
      <div className="container">
        <div className="for-brands-grid">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label">
              <span className="label label-cyan">04 · For Brands</span>
            </div>
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>
              From stock-out to quoted in under a week.
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.75, marginBottom: '2.5rem' }}>
              Signal & Line monitors your storefront continuously. The moment a product goes
              out of stock, the engine starts working to connect you with a verified co-packer
              who can run your exact format — without you making a single cold call.
            </p>

            <div className="timeline">
              {STEPS.map((step, i) => (
                <div key={step.num} className="timeline-item">
                  <div className="timeline-left">
                    <div className={`timeline-dot ${step.active ? 'active' : ''}`}>
                      {step.num}
                    </div>
                    {i < STEPS.length - 1 && <div className="timeline-line" />}
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-step-label">
                      <span className="label" style={{ color: step.active ? 'var(--cyan)' : 'var(--dim)' }}>
                        {step.label}
                      </span>
                    </div>
                    <div className="timeline-step-title">{step.title}</div>
                    <div className="timeline-step-desc">{step.desc}</div>
                    <div className="timeline-step-time">{step.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="brands-stats">
              {[
                { num: '10K+', label: 'Shopify storefronts monitored weekly' },
                { num: '<24h', label: 'Detection to first manufacturer contact' },
                { num: '3+', label: 'OOS products detected per scan per brand' },
                { num: '6/6', label: 'Qualification checks before routing' },
              ].map(({ num, label }) => (
                <div key={label} className="brands-stat-card">
                  <div className="brands-stat-num">{num}</div>
                  <div className="brands-stat-label">{label}</div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: '1.5rem',
              padding: '1.5rem',
              background: 'var(--bg3)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
            }}>
              <div style={{ marginBottom: '0.75rem' }}>
                <span className="label label-cyan">What you don't have to do</span>
              </div>
              {[
                'Cold-call manufacturers with no context',
                'Wait for your current co-packer\'s next slot',
                'Research which facilities run your format',
                'Vet MOQ compatibility yourself',
                'Send a hundred emails hoping someone responds',
              ].map(item => (
                <div key={item} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid var(--border)',
                  fontSize: '0.875rem',
                  color: 'var(--muted)',
                }}>
                  <span style={{ color: 'var(--cyan)', fontSize: '0.75rem' }}>✓</span>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ marginTop: '4.5rem' }}
        >
          <div className="section-label">
            <span className="label label-cyan">Formats we route every week</span>
          </div>
          <div className="formats" style={{ marginBottom: 0 }}>
            {FORMATS.map(f => (
              <div key={f.label} className="format-card">
                {f.icon}
                <div className="format-card-label">{f.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
