// Site-wide facts. Change them here and every page follows.

export const EMAIL = 'john.izokun@klyvo.ca'

// The one Cal.com event ("Intro Call", 40 min). Every booking button opens it.
export const CAL_LINK = 'https://cal.com/johnizokun-klyvo/production-review'
export const CAL_EMBED = `${CAL_LINK}?overlayCalendar=true`

export const mailto = (subject: string) => `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`

export type MarketGroup = 'Make & ship' | 'Healthcare staffing' | 'Staffing & hiring' | 'Build & connect'

export interface Market {
  slug: string
  href: string
  name: string
  short: string // for the hero's market line
  group: MarketGroup
  provides: string // the side that pays
  needs: string // the side with the need (never pays)
  signal: string // where the need shows up
}

export const GROUPS: MarketGroup[] = ['Make & ship', 'Healthcare staffing', 'Staffing & hiring', 'Build & connect']

// Every market Signal & Line works in, in nav order. Adding a market:
// add it here, add its page to src/sectors.ts, and copy one of the sector .html files.
export const MARKETS: Market[] = [
  {
    slug: 'manufacturing',
    href: '/manufacturing',
    name: 'Manufacturing',
    short: 'Manufacturing',
    group: 'Make & ship',
    provides: 'Contract manufacturers & co-packers',
    needs: 'New brands that need a product made',
    signal: 'New trademark applications, and brands that sold out and need another run',
  },
  {
    slug: 'packaging',
    href: '/packaging',
    name: 'Packaging & fulfillment',
    short: 'Packaging',
    group: 'Make & ship',
    provides: 'Packaging suppliers, label printers & 3PL warehouses',
    needs: 'New brands preparing a first run',
    signal: 'The same new trademark applications, before the first carton is ordered',
  },
  {
    slug: 'nurse-staffing',
    href: '/nurse-staffing',
    name: 'Nurse staffing',
    short: 'Nurse staffing',
    group: 'Healthcare staffing',
    provides: 'Licensed nurse staffing agencies',
    needs: 'Nursing homes short on nurses and aides',
    signal: 'The agency hours each home reports to Medicare',
  },
  {
    slug: 'hospital-staffing',
    href: '/hospital-staffing',
    name: 'Hospital & locum staffing',
    short: 'Hospital staffing',
    group: 'Healthcare staffing',
    provides: 'Travel nurse, allied health & locum tenens agencies',
    needs: 'Hospitals and rural clinics paying for contract staff',
    signal: 'Contract-labor spend in hospital cost reports, and rural shortage records',
  },
  {
    slug: 'recruiting',
    href: '/recruiting',
    name: 'Recruiting & school staffing',
    short: 'Recruiting',
    group: 'Staffing & hiring',
    provides: 'Engineering & IT recruiters, school therapy and special-ed staffing firms',
    needs: 'Employers with hard-to-fill technical roles, school districts with open special-ed roles',
    signal: 'Employers’ public hiring filings and districts’ posted vacancies',
  },
  {
    slug: 'trades-staffing',
    href: '/trades-staffing',
    name: 'Skilled trades staffing',
    short: 'Trades staffing',
    group: 'Staffing & hiring',
    provides: 'Construction & industrial staffing agencies',
    needs: 'Contractors certified as short of workers',
    signal: 'Seasonal labor certifications from the Department of Labor',
  },
  {
    slug: 'driver-staffing',
    href: '/driver-staffing',
    name: 'Trucking & driver staffing',
    short: 'Driver staffing',
    group: 'Staffing & hiring',
    provides: 'Driver staffing, leasing & recruiting agencies',
    needs: 'Trucking companies adding trucks faster than drivers',
    signal: 'Fleet updates carriers file with federal regulators',
  },
  {
    slug: 'connectivity',
    href: '/connectivity',
    name: 'Internet for clinics & schools',
    short: 'Connectivity',
    group: 'Build & connect',
    provides: 'Internet, network and IT providers',
    needs: 'Rural clinics, hospitals and schools buying service',
    signal: 'The public requests they post before they can sign',
  },
  {
    slug: 'construction',
    href: '/construction',
    name: 'Construction & surety',
    short: 'Construction',
    group: 'Build & connect',
    provides: 'Appointed surety bond agents',
    needs: 'Concrete and masonry contractors growing into bonded work',
    signal: 'Contractors adding crews, and the public work they bid',
  },
]

// Dates for the example documents, always close to today so they never look stale.
export function dayOffset(days: number) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
