import { ArrowRight } from 'lucide-react'
import ScheduleBoard from './ScannerFeed'

interface HeroProps {
  onBook: () => void
}

const FACTS = [
  { v: 'Brief first', l: 'you see what a brand needs before you hear its name' },
  { v: 'You pick', l: 'pay only for the brands you choose to meet' },
  { v: '30 min', l: 'of your time, once, to map your floor' },
  { v: '0', l: 'brands forwarded that miss your format or minimum' },
]

export default function Hero({ onBook }: HeroProps) {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero-top">
          <div>
            <p className="eyebrow"><span className="dot" />Manufacturing desk · for contract manufacturers &amp; co-packers</p>
            <h1 className="h1">
              We fill your open{' '}<br className="lock" />capacity with<br />
              <span className="payoff">brands that need{' '}<br className="lock" />production now.</span>
            </h1>
          </div>

          <div className="hero-aside">
            <p className="lead">
              We find brands that have just applied for a trademark and haven’t chosen where to
              produce yet — plus brands that have sold out and need to reorder — qualify them
              against your floor on format, run size and minimums, and introduce only the ones that fit.
            </p>
            <div className="hero-ctas">
              <button type="button" className="btn btn-primary" onClick={onBook}>
                Book an intro call
                <ArrowRight size={18} aria-hidden="true" />
              </button>
              <a className="btn btn-ghost" href="#offer">See the terms</a>
            </div>
            <p className="hero-call">
              A short call with John Izokun, the founder. You tell us what your floor runs; we tell
              you whether the brands we’re seeing fit it.
            </p>
          </div>
        </div>

        <div className="board-zone">
          <ScheduleBoard />
        </div>

        <dl className="facts">
          {FACTS.map(f => (
            <div key={f.l} className="fact">
              <dt className="fact-v">{f.v}</dt>
              <dd className="fact-l">{f.l}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
