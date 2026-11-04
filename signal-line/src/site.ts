// Site-wide facts. Change them here and every page follows.

export const EMAIL = 'john.izokun@klyvo.ca'

// The one Cal.com event ("Intro Call", 40 min). Every booking button opens it.
export const CAL_LINK = 'https://cal.com/johnizokun-klyvo/production-review'
export const CAL_EMBED = `${CAL_LINK}?overlayCalendar=true`

export const mailto = (subject: string) => `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`

export interface Market {
  slug: string
  href: string
  name: string
  provides: string // the side that pays
  needs: string // the side with the need (never pays)
  signal: string // where the need shows up
}

// Every market Signal & Line works in, in nav order. Adding a market:
// add it here, add its page to src/sectors.ts, and copy one of the sector .html files.
export const MARKETS: Market[] = [
  {
    slug: 'manufacturing',
    href: '/manufacturing',
    name: 'Manufacturing',
    provides: 'Contract manufacturers & co-packers',
    needs: 'New brands that need a product made',
    signal: 'New trademark applications, and brands that sold out and need another run',
  },
  {
    slug: 'nurse-staffing',
    href: '/nurse-staffing',
    name: 'Nurse staffing',
    provides: 'Licensed nurse staffing agencies',
    needs: 'Nursing homes short on nurses and aides',
    signal: 'The agency hours each home reports to Medicare',
  },
  {
    slug: 'recruiting',
    href: '/recruiting',
    name: 'Recruiting & school staffing',
    provides: 'Engineering & IT recruiters, school therapy and special-ed staffing firms',
    needs: 'Employers with hard-to-fill technical roles, school districts with open special-ed roles',
    signal: 'Employers’ public hiring filings and districts’ posted vacancies',
  },
  {
    slug: 'connectivity',
    href: '/connectivity',
    name: 'Internet for clinics & schools',
    provides: 'Internet, network and IT providers',
    needs: 'Rural clinics, hospitals and schools buying service',
    signal: 'The public requests they post before they can sign',
  },
  {
    slug: 'construction',
    href: '/construction',
    name: 'Construction & surety',
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
