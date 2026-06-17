export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <div className="footer-logo">
            <div className="footer-logo-dot" />
            Signal & Line
          </div>
          <div className="footer-copy">
            Demand intelligence for co-packing. Montreal, CA · {year}
          </div>
        </div>

        <div className="footer-status">
          <div className="footer-status-dot" />
          System operational
        </div>

        <nav className="footer-links">
          <a href="mailto:john.izokun@klyvo.ca">Contact</a>
          <a href="#how-it-works" onClick={e => { e.preventDefault(); document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }) }}>How It Works</a>
          <a href="#for-manufacturers" onClick={e => { e.preventDefault(); document.getElementById('for-manufacturers')?.scrollIntoView({ behavior: 'smooth' }) }}>Manufacturers</a>
          <a href="#for-brands" onClick={e => { e.preventDefault(); document.getElementById('for-brands')?.scrollIntoView({ behavior: 'smooth' }) }}>Brands</a>
        </nav>
      </div>
    </footer>
  )
}
