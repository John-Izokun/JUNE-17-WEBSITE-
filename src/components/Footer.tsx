const EXPLORE = [
  { label: 'How It Works',  id: 'how-it-works' },
  { label: 'Manufacturers', id: 'for-manufacturers' },
  { label: 'Co-packers',    id: 'for-manufacturers' },
  { label: 'For Brands',    id: 'for-brands' },
  { label: 'Proof',         id: 'intelligence' },
]

const INDUSTRIES = [
  'Skincare', 'Haircare', 'Supplements & Nutraceutical',
  'Food & Beverage', 'Cosmetics', 'Pet & Personal Care',
]

export default function Footer() {
  const year = new Date().getFullYear()

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <footer className="footer-v3">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">
              <div className="footer-logo-dot" />
              Signal & Line
            </div>
            <p className="footer-tagline">
              Demand intelligence for co-packing. We fill open manufacturing
              capacity with DTC brands that need production now.
            </p>
            <div className="footer-status" style={{ marginTop: '1.2rem' }}>
              <div className="footer-status-dot" />
              Radar operational — scanning live
            </div>
          </div>

          <nav className="footer-col" aria-label="Explore">
            <div className="footer-col-title">Explore</div>
            {EXPLORE.map(l => (
              <button key={l.label} onClick={() => scrollTo(l.id)}>{l.label}</button>
            ))}
          </nav>

          <nav className="footer-col" aria-label="Industries">
            <div className="footer-col-title">Industries</div>
            {INDUSTRIES.map(n => (
              <button key={n} onClick={() => scrollTo('for-brands')}>{n}</button>
            ))}
          </nav>

          <div className="footer-col">
            <div className="footer-col-title">Contact</div>
            <a href="mailto:john.izokun@klyvo.ca">john.izokun@klyvo.ca</a>
            <button onClick={() => scrollTo('book-call')}>Book a production review</button>
            <span style={{ display: 'block', padding: '0.32rem 0', fontSize: '0.875rem', color: 'var(--ink-3)' }}>
              Montreal, Canada
            </span>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-bottom-copy">
            © {year} Signal &amp; Line · Demand intelligence for co-packing
          </span>
          <span className="footer-bottom-copy">
            Built in Montreal · Working across North America
          </span>
        </div>
      </div>
    </footer>
  )
}
