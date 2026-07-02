import { motion } from 'framer-motion'
import ScannerFeed from './ScannerFeed'

interface HeroProps {
  onBookCall: () => void
}

const TICKER_ITEMS = [
  'Supplements', 'Skincare', 'Haircare', 'Food & Beverage',
  'Cosmetics', 'Nutraceuticals', 'Pet Care', 'Personal Care',
]

function TickerRow() {
  return (
    <>
      {TICKER_ITEMS.map(item => (
        <span key={item} className="ticker-item">{item}</span>
      ))}
    </>
  )
}

export default function Hero({ onBookCall }: HeroProps) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="hero-bg" />
      <div className="hero-grid-bg" />

      <div className="hero">
        <motion.div
          className="hero-left"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="hero-eyebrow">
            <div className="hero-eyebrow-line" />
            <span className="label label-purple">Manufacturing-Fit Demand Intelligence</span>
          </div>

          <h1 className="hero-title">
            We fill your open{' '}<br className="hero-br" />capacity with<br />
            <span className="hero-title-accent">brands that need{' '}<br className="hero-br" />production now.</span>
          </h1>

          <p className="hero-sub-lead">
            Open capacity only pays when it&apos;s running — and a brand that&apos;s already
            stocking out is proven demand, ready to move now.
          </p>

          <p className="hero-sub">
            Signal &amp; Line scans a live index of 10,000+ DTC storefronts for stock-out
            signals, filters every opportunity against your MOQ, format, certifications,
            and capacity window — then routes only estimator-cleared RFQs to your team.
          </p>

          <div className="hero-ctas">
            <button className="btn btn-primary" onClick={onBookCall}>
              Run the OOS Radar for My Facility
            </button>
            <button
              className="btn btn-outline"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See How It Works
            </button>
          </div>

          <div className="hero-trust">
            <div>
              <div className="hero-trust-num">10,000+</div>
              <div className="hero-trust-label">Storefronts monitored</div>
            </div>
            <div>
              <div className="hero-trust-num">&lt;24h</div>
              <div className="hero-trust-label">Detection to routing</div>
            </div>
            <div>
              <div className="hero-trust-num">$0</div>
              <div className="hero-trust-label">Commission, ever</div>
            </div>
          </div>

          <div className="hero-brand-nudge">
            Brand with a stock-out?{' '}
            <a href="mailto:john.izokun@klyvo.ca" className="hero-brand-link">
              Submit your product need →
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero-right"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="hero-rings" aria-hidden="true" />
          <div className="panel-stack tilt-l">
            <ScannerFeed />
          </div>
          <p className="hero-scan-caption">
            <strong>What you&apos;re seeing:</strong> a live feed of consumer brands whose
            products just sold out. Every red row is a company that needs manufacturing
            capacity — the demand we route to facilities like yours.
          </p>
        </motion.div>
      </div>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          <TickerRow />
          <TickerRow />
        </div>
      </div>
    </section>
  )
}
