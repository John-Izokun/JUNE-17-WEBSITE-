import { motion } from 'framer-motion'
import ScannerFeed from './ScannerFeed'

interface HeroProps {
  onBookCall: () => void
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
            Your estimator only sees<br />
            <span className="hero-title-accent">brands your floor can run.</span>
          </h1>

          <p className="hero-sub-lead">
            Open capacity only pays when it&apos;s running. We fill idle co-packing and
            manufacturing lines with DTC brands that are actively selling out.
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
          <ScannerFeed />
        </motion.div>
      </div>
    </section>
  )
}
