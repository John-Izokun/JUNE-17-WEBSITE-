import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

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
              <span className="label label-cyan">For Brands</span>
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
      </div>
    </section>
  )
}
