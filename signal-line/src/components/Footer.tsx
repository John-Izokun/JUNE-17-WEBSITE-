import { EMAIL, MARKETS } from '../site'
import { Wordmark } from './Nav'

export default function Footer({ onBook }: { onBook: () => void }) {
  const year = new Date().getFullYear()

  return (
    <footer className="site-foot">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="foot-brand"><Wordmark /></div>
            <p className="foot-tag">
              Introductions between businesses that need each other, qualified on both sides and
              made on one email thread.
            </p>
            <p className="foot-contact">
              Montreal, Canada<br />
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </p>
          </div>
          <div>
            <div className="foot-h">Markets</div>
            <ul className="foot-list foot-list--cols">
              {MARKETS.map(m => <li key={m.slug}><a href={m.href}>{m.name}</a></li>)}
            </ul>
          </div>
          <div>
            <div className="foot-h">Signal &amp; Line</div>
            <ul className="foot-list">
              <li><a href="/#how-it-works">How an introduction works</a></li>
              <li><a href="/#results">Partner results</a></li>
              <li><a href="/#questions">Questions</a></li>
              <li><button type="button" className="foot-btn" onClick={onBook}>Book an intro call</button></li>
              <li><a href={`mailto:${EMAIL}`}>Email John</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bot">
          <span>Signal &amp; Line · John Izokun · Montreal</span>
          <span>klyvo.ca · © {year}</span>
        </div>
      </div>
    </footer>
  )
}
