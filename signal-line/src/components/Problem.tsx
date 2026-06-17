import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Tab = 'manufacturers' | 'brands'

function useCountUp(target: number, active: boolean, duration = 1800) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!active) { setValue(0); return }
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

const CHANNELS = [
  {
    name: 'Referrals',
    tag: 'Runs dry',
    good: false,
    desc: 'Great when they come — but you can\'t forecast a pipeline built on favors. The moment your network runs dry, so does your inbound, and there\'s no dial to turn it back up.',
  },
  {
    name: 'Trade shows',
    tag: '$8K–$50K / booth',
    good: false,
    desc: 'A single booth runs $8K–$50K plus travel and staffing — and you walk away with a stack of cards, most of them the wrong format, MOQ, or timeline for your floor.',
  },
  {
    name: 'Commission brokers',
    tag: '5–8% / deal',
    good: false,
    desc: 'They skim 5–8% of every contract — even the ones your team sourced, quoted, and closed. Your margin keeps paying for one introduction, contract after contract.',
  },
  {
    name: 'Signal & Line',
    tag: 'Estimator-cleared',
    good: true,
    desc: 'Format-matched, MOQ-verified RFQs from brands that are actively stocking out — routed straight to your quoting team. No cold lists, no commission, no wasted estimator time.',
  },
]

export default function Problem() {
  const [tab, setTab] = useState<Tab>('manufacturers')
  const [inView, setInView] = useState(false)
  const [gaugeWidth, setGaugeWidth] = useState(0)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setInView(true)
    }, { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (tab === 'manufacturers' && inView) {
      setTimeout(() => setGaugeWidth(60), 300)
    } else {
      setGaugeWidth(0)
    }
  }, [tab, inView])

  const revenueDay = useCountUp(4200, tab === 'brands' && inView)
  const revenueWeek = useCountUp(29400, tab === 'brands' && inView)

  return (
    <section className="section problem-section" ref={ref} id="problem">
      <div className="container">
        <div className="section-label">
          <span className="label label-purple">The Problem</span>
        </div>
        <h2 className="section-title">
          {tab === 'manufacturers'
            ? 'Your lines are running empty. Right now.'
            : 'Your products are out of stock. Right now.'
          }
        </h2>
        <p className="section-sub">
          {tab === 'manufacturers'
            ? 'You have open production capacity and no reliable stream of qualified demand. Every idle hour on the line is margin you will never earn back.'
            : 'While you\'re waiting months for your co-packer to have availability, you\'re hemorrhaging revenue and customers every single day.'
          }
        </p>

        <div className="problem-tabs">
          <button className={`problem-tab ${tab === 'manufacturers' ? 'active' : ''}`} onClick={() => setTab('manufacturers')}>
            For Manufacturers
          </button>
          <button className={`problem-tab ${tab === 'brands' ? 'active' : ''}`} onClick={() => setTab('brands')}>
            For Brands
          </button>
        </div>

        <AnimatePresence mode="wait">
          {tab === 'manufacturers' ? (
            <motion.div
              key="manufacturers"
              className="problem-content"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              <div>
                <div className="problem-stat-card problem-stat-card--alert">
                  <div className="problem-stat-label">
                    <span className="label">Average open capacity on a co-packing line</span>
                  </div>
                  <div className="problem-stat-num" style={{ color: 'var(--amber)' }}>
                    {gaugeWidth}%
                  </div>
                  <p className="problem-stat-bold">
                    Idle capacity loses money every single day it isn&apos;t booked — and you
                    can&apos;t bill back the hours you&apos;ve already lost.
                  </p>
                  <div className="capacity-gauge">
                    <div className="gauge-labels">
                      <span>Open / idle</span>
                      <span>Booked</span>
                    </div>
                    <div className="gauge-bar-bg">
                      <div className="gauge-bar-fill" style={{ width: `${gaugeWidth}%`, background: 'linear-gradient(90deg, var(--red), var(--amber))' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="channels">
                <div className="channels-head">
                  <span className="label">How most facilities fill it — and why it breaks</span>
                </div>
                {CHANNELS.map(ch => (
                  <div key={ch.name} className={`channel-card ${ch.good ? 'good' : ''}`}>
                    <div className="channel-top">
                      <span className="channel-name">{ch.name}</span>
                      <span className={`channel-tag ${ch.good ? 'good' : ''}`}>{ch.tag}</span>
                    </div>
                    <p className="channel-desc">{ch.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="brands"
              className="problem-content"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              <div>
                <div className="problem-stat-card">
                  <div className="problem-stat-label">
                    <span className="label">Daily revenue loss — OOS product</span>
                  </div>
                  <div className="problem-stat-num">
                    ${revenueDay.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--dim)', marginBottom: '1rem' }}>
                    per day · ${revenueWeek.toLocaleString()} this week
                  </div>
                  <div className="capacity-gauge">
                    <div className="gauge-labels">
                      <span>Revenue lost</span>
                      <span>Growing</span>
                    </div>
                    <div className="gauge-bar-bg">
                      <div className="gauge-bar-fill" style={{ width: inView ? '73%' : '0%', transition: 'width 1.8s cubic-bezier(0.4,0,0.2,1)' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="problem-points">
                <div className="problem-point">
                  <div className="problem-point-icon red" />
                  <p className="problem-point-text">
                    <strong>12-week lead times</strong> from your current co-packer mean the problem compounds before it's solved.
                  </p>
                </div>
                <div className="problem-point">
                  <div className="problem-point-icon amber" />
                  <p className="problem-point-text">
                    <strong>Back-order waitlists fill</strong> while you cold-call manufacturers who may not even run your format.
                  </p>
                </div>
                <div className="problem-point">
                  <div className="problem-point-icon purple" />
                  <p className="problem-point-text">
                    <strong>Signal & Line detects</strong> your stock-out within 24 hours and surfaces a verified manufacturer match — ready to quote.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
