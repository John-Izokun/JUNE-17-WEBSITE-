import { ArrowRight } from 'lucide-react'
import { BrandMark } from './Nav'

export default function Footer({ onBook }: { onBook: () => void }) {
  const year = new Date().getFullYear()

  return (
    <footer className="foot">
      <div className="wrap">
        <div className="for-brands" id="for-brands">
          <span className="k">For brands</span>
          <p>
            <b>Building a brand and need someone to make it?</b> Tell us the format, roughly how
            much you need and any certifications it must carry. We’ll tell you whether we can
            introduce you to a facility that runs it — at no cost to you.
          </p>
          <a className="btn btn-ghost btn-sm" href="mailto:john.izokun@klyvo.ca?subject=Looking%20for%20a%20manufacturer">
            Tell us what you’re making
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>

        <div className="tblock">
          <div className="tb tb-brand">
            <div className="tb-k">Signal &amp; Line</div>
            <div className="tb-v"><BrandMark />New brands for contract manufacturers</div>
          </div>
          <div className="tb">
            <div className="tb-k">Drawn for</div>
            <div className="tb-v">Contract manufacturers &amp; co-packers</div>
          </div>
          <div className="tb">
            <div className="tb-k">Location</div>
            <div className="tb-v">Montreal, Canada</div>
          </div>
          <div className="tb">
            <div className="tb-k">Contact</div>
            <div className="tb-v"><a href="mailto:john.izokun@klyvo.ca">john.izokun@klyvo.ca</a></div>
          </div>

          <div className="tb">
            <div className="tb-k">Terms</div>
            <div className="tb-v">5 introductions · 60 days · no commission</div>
          </div>
          <div className="tb">
            <div className="tb-k">Guarantee</div>
            <div className="tb-v">Fewer than five — full refund</div>
          </div>
          <div className="tb">
            <div className="tb-k">Sheet · Rev</div>
            <div className="tb-v mono">1 of 1 · A</div>
          </div>
          <div className="tb">
            <div className="tb-k">Next step</div>
            <div className="tb-v">
              <button type="button" className="text-link" onClick={onBook}>Book a production review</button>
            </div>
          </div>
        </div>

        <nav className="foot-links" aria-label="Footer">
          <a href="#problem">The problem</a>
          <a href="#source">Where brands come from</a>
          <a href="#how-it-works">How it works</a>
          <a href="#fit">For manufacturers &amp; co-packers</a>
          <a href="#offer">The offer</a>
          <a href="#industries">Industries</a>
          <a href="#for-brands">For brands</a>
          <a href="#questions">Questions</a>
          <span style={{ marginLeft: 'auto', color: 'var(--ink-3)' }}>© {year} Signal &amp; Line</span>
        </nav>
      </div>
    </footer>
  )
}
