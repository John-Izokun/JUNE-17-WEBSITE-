import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

function TerminalMockup() {
  return (
    <div className="hiw-mockup">
      <div className="hiw-mockup-header">
        <div className="traffic-lights"><span /><span /><span /></div>
        <span className="hiw-mockup-title">signal-line — demand-radar</span>
      </div>
      <div className="hiw-mockup-body">
        <div className="terminal-line"><span className="t-g">✓</span> Loaded <span className="t-w">412</span> Shopify domains</div>
        <div className="terminal-line"><span className="t-g">✓</span> products.json fast path · concurrency=20</div>
        <div className="terminal-line">&nbsp;</div>
        <div className="terminal-line"><span className="t-g">[PASS]</span> gainful.com — inventory OK</div>
        <div className="terminal-line"><span className="t-g">[PASS]</span> ritual.com — inventory OK</div>
        <div className="terminal-line"><span className="t-y">[ALERT]</span> <span className="t-w">neonnutra.com</span></div>
        <div className="terminal-line">&nbsp; product: <span className="t-c">"Ashwagandha Gummies 60ct"</span></div>
        <div className="terminal-line">&nbsp; status:  <span className="t-r">OUT_OF_STOCK</span></div>
        <div className="terminal-line">&nbsp; signal:  <span className="t-y">Shopify .js API verified</span></div>
        <div className="terminal-line"><span className="t-y">[ALERT]</span> <span className="t-w">vitalrootslabs.com</span></div>
        <div className="terminal-line">&nbsp; product: <span className="t-c">"Creatine Gummies 90ct"</span></div>
        <div className="terminal-line">&nbsp; status:  <span className="t-r">OUT_OF_STOCK · day 9</span></div>
        <div className="terminal-line">&nbsp;</div>
        <div className="terminal-line"><span className="t-g">Scan complete · 17 signals / 412 domains</span></div>
      </div>
    </div>
  )
}

function MatrixMockup() {
  return (
    <div className="hiw-mockup">
      <div className="hiw-mockup-header">
        <div className="traffic-lights"><span /><span /><span /></div>
        <span className="hiw-mockup-title">qualification-matrix — neonnutra.com</span>
      </div>
      <div className="hiw-mockup-body">
        {/* Passed brand */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--green)', letterSpacing: '0.08em', marginBottom: '6px' }}>
            ● NEON NUTRA — CHECKING
          </div>
          {[
            ['Product format', 'Gummy',          true,  'Match'],
            ['Requested MOQ',  '75,000 units',   true,  'Meets floor'],
            ['Certifications', 'NSF, GMP',       true,  'Match'],
            ['Capacity window','Q2 open',         true,  'Available'],
            ['Contact',        'Sarah Chen · Founder', true, 'Verified'],
          ].map(([k, v, ok, badge]) => (
            <div key={String(k)} className="matrix-row">
              <span className="matrix-label">{k}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="matrix-val">{String(v)}</span>
                <span className={`matrix-badge ${ok ? 'ok' : 'no'}`}>{String(badge)}</span>
              </div>
            </div>
          ))}
          <div style={{ paddingTop: '8px', fontSize: '11px', fontWeight: 600, color: 'var(--green)' }}>
            ✓ 5/5 passed — cleared for routing
          </div>
        </div>

        {/* Killed brand */}
        <div style={{
          background: 'var(--red-d)',
          border: '1px solid rgba(248,113,113,0.2)',
          borderRadius: '7px',
          padding: '10px',
          marginTop: '6px',
        }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--red)', letterSpacing: '0.08em', marginBottom: '6px' }}>
            ✕ CLEARDERM CO — KILLED
          </div>
          {[
            ['Product format', 'Liquid serum',   false, 'Mismatch'],
            ['Requested MOQ',  '20,000 units',   false, 'Below floor'],
          ].map(([k, v, ok, badge]) => (
            <div key={String(k)} className="matrix-row" style={{ borderColor: 'rgba(248,113,113,0.15)' }}>
              <span className="matrix-label">{k}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="matrix-val">{String(v)}</span>
                <span className={`matrix-badge ${ok ? 'ok' : 'no'}`}>{String(badge)}</span>
              </div>
            </div>
          ))}
          <div style={{ paddingTop: '8px', fontSize: '11px', color: 'var(--red)' }}>
            ✕ Not routed — estimator never sees this
          </div>
        </div>
      </div>
    </div>
  )
}

function EmailMockup() {
  return (
    <div className="hiw-mockup">
      <div className="hiw-mockup-header">
        <div className="traffic-lights"><span /><span /><span /></div>
        <span className="hiw-mockup-title">outreach — sarah@neonnutra.com</span>
      </div>
      <div className="hiw-mockup-body">
        <div className="email-mock-header">
          From · john@signalandline.co<br />
          To · sarah@neonnutra.com (Founder — verified)<br />
          Subject · fulfillment for Neon Nutra
        </div>
        <div className="email-mock-body">
          Hi Sarah,<br /><br />
          Noticed your Ashwagandha Gummies are currently out of stock.<br /><br />
          I work with a US-based gummy co-packer — NSF and GMP certified,
          75k unit MOQ, open Q2 capacity. Their line matches your exact spec.<br /><br />
          Worth 10 minutes to see if it's a fit?<br /><br />
          — John, Signal & Line
        </div>
        <div className="email-reply">
          ✓ Reply: "Yes — send me the specs, we need this fast"
        </div>

        <div style={{
          marginTop: '10px',
          padding: '8px 10px',
          background: 'var(--purp-d)',
          border: '1px solid var(--purp-b)',
          borderRadius: '6px',
          fontSize: '11px',
          color: 'var(--purp-l)',
          fontWeight: 500,
        }}>
          ● RFQ routed to your quoting team · estimator-cleared
        </div>
      </div>
    </div>
  )
}

const PHASES = [
  {
    num: '01 / DETECT',
    title: 'The radar finds brands bleeding revenue',
    desc: 'Our engine hits the Shopify products.json API across 10,000+ DTC storefronts. When every variant of a product shows available: false, we log it. Live inventory data — no guesswork, no scraping.',
    tags: ['Shopify API', 'Amazon signals', 'Verified OOS', '~0.5s per domain'],
    Mockup: TerminalMockup,
  },
  {
    num: '02 / QUALIFY (+ KILL)',
    title: 'The matrix passes fits — and kills everything else',
    desc: "Each signal runs against your floor: format, MOQ, certifications, capacity. Anything that doesn't clear all checks is killed. Your estimator never sees a bad-fit lead. That's the product.",
    tags: ['Format match', 'MOQ verified', 'Cert check', 'Bad fits killed'],
    Mockup: MatrixMockup,
  },
  {
    num: '03 / CONNECT',
    title: 'Only cleared RFQs reach your team',
    desc: 'A personal email names the exact product that\'s out of stock and your facility\'s capabilities. When the brand replies yes, that\'s your RFQ. You never chase. It comes to you.',
    tags: ['Named product', 'Personalised', 'RFQ routed', 'Ready to quote'],
    Mockup: EmailMockup,
  },
]

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', '-200vw'])

  return (
    <section id="how-it-works">
      <div ref={containerRef} style={{ height: '300vh', position: 'relative' }}>
        <div className="hiw-sticky">
          <motion.div className="hiw-track" style={{ x }}>
            {PHASES.map((phase, idx) => (
              <div
                key={idx}
                className="hiw-phase"
                style={{
                  maxWidth: '100vw',
                  width: '100vw',
                  padding: '0 max(2rem, calc((100vw - 1160px)/2))',
                }}
              >
                <div className="hiw-phase-left">
                  <div className="hiw-phase-num">{phase.num}</div>
                  <h2 className="hiw-phase-title">{phase.title}</h2>
                  <p className="hiw-phase-desc">{phase.desc}</p>
                  <div className="hiw-phase-tags">
                    {phase.tags.map(t => (
                      <span key={t} className="hiw-tag">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="hiw-phase-right">
                  <phase.Mockup />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
