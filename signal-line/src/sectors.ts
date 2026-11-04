// The market pages that share one template (src/pages/Sector.tsx).
// Manufacturing has its own, richer page. Every line here must stay true:
// no prices, no invented results, no promise the business doesn't keep.
// Boards and documents are labelled "Example": descriptions, never real names.

import { dayOffset } from './site'

export type StampKind = 'public' | 'call' | 'intro'
export type BoardStatus = 'intro' | 'brief' | 'new' | 'drop'

export interface DocRow { dt: string; dd: string; kind?: 'flag' | 'pass' | 'strong' }

export interface Doc {
  title: string
  label: string // accessible name
  rows: DocRow[]
  stamp: string
  stampKind: StampKind
  foot: string
}

export interface Board {
  title: string
  range: string
  cols: string[]
  rows: { cells: string[]; status: BoardStatus; note: string }[]
  foot: string
  caption: string
}

export interface Station { who: 'you' | 'us'; whoLabel: string; title: string; body: string }

export interface TermRow { title: string; detail: string; value: string }

export interface TermsDoc {
  sub: string
  ref: string
  preparedFor: string
  rows: TermRow[]
  fee: string
  feeNote: string
  guarantee?: { b: string; span: string }
  exclusions: [string, string][]
  fine: string
}

export interface Sector {
  slug: string
  name: string
  hero: { eyebrow: string; setup: string; payoff: string; lead: string; note: string }
  board: Board
  sides: { k: string; v: string }[]
  source: { h2: string; lede: string; docs: [Doc, Doc, Doc]; joints: [string, string]; also: { tag: string; text: string } }
  coverage: { h2: string; lede: string; items: { b: string; s: string }[] }
  steps: { h2a: string; h2b: string; lede: string; items: Station[] }
  terms: { h2a: string; h2b: string; lede: string; doc: TermsDoc }
  freeSide: { k: string; b: string; p: string; cta: string; subject: string }
  faqs: [string, string][]
  close: { h2: string; p: string }
}

// Shared lines, so every page states the same rules the same way.
const INTRO_CALL = (you: string, us: string): [string, string] => [
  'What happens on the intro call?',
  `Thirty minutes with John Izokun. You tell us ${you}; we tell you ${us}. If there’s no fit, we say so.`,
]
const NOT_A_LIST = (who: string): [string, string] => ['Not a list.', `We don’t sell lists. Every ${who} has been spoken to before you hear about it.`]
const STANDARD_TERMS_LEDE = 'What you see, what you choose and what we don’t do. The fee is agreed on the call and written down before the first introduction.'

/* ── NURSE STAFFING ─────────────────────────────────────────────── */
const NURSE_STAFFING: Sector = {
  slug: 'nurse-staffing',
  name: 'Nurse staffing',
  hero: {
    eyebrow: 'Nurse staffing desk · for nurse staffing agencies',
    setup: 'We introduce your agency to nursing homes that ',
    payoff: 'already pay for agency shifts.',
    lead: 'Every nursing home reports the agency hours it pays for to Medicare, and the totals are public. We find the homes near your offices that buy the roles you cover, ask whether they want another agency, and introduce you to the ones that say yes.',
    note: 'A short call with John Izokun, the founder. You tell us your counties and roles; we tell you what homes near you are buying.',
  },
  board: {
    title: 'Homes buying agency shifts',
    range: 'Near your offices · Jan – Mar 2026 agency hours',
    cols: ['Home', 'Area', 'Agency hours', 'Roles'],
    rows: [
      { cells: ['120-bed skilled nursing', 'Baltimore County, MD', '9,840', 'RN · LPN · CNA'], status: 'intro', note: 'Asked for another agency' },
      { cells: ['90-bed rehab & care', 'Harford County, MD', '6,210', 'CNA · GNA'], status: 'brief', note: 'Brief ready' },
      { cells: ['150-bed skilled nursing', 'Baltimore City, MD', '12,480', 'RN · CNA'], status: 'new', note: 'Calling this week' },
      { cells: ['60-bed nursing home', 'Howard County, MD', '410', 'LPN'], status: 'drop', note: 'Dropped · rarely uses agencies' },
      { cells: ['110-bed skilled nursing', 'Anne Arundel County, MD', '7,930', 'LPN · CNA'], status: 'drop', note: 'Dropped · has enough agencies' },
    ],
    foot: '5 homes checked · 1 asked for another agency · 1 brief ready',
    caption: 'Example board. Homes are described, never named, until the introduction. Agency hours come from the staffing reports homes file with Medicare.',
  },
  sides: [
    { k: 'Who pays', v: 'Licensed nurse staffing agencies: RNs, LPNs, CNAs and GNAs' },
    { k: 'Who needs it', v: 'Nursing homes short on nurses and aides. They pay nothing.' },
    { k: 'Where we work', v: 'Maryland · Pennsylvania · California' },
  ],
  source: {
    h2: 'A nursing home’s staffing report shows who it already pays.',
    lede: 'Homes file their staffing hours with Medicare every quarter, including the hours worked by agency staff. Here is how one of those homes reaches your inbox.',
    docs: [
      {
        title: 'Staffing report',
        label: 'Example staffing report',
        rows: [
          { dt: 'Facility', dd: '120-bed skilled nursing home', kind: 'strong' },
          { dt: 'Location', dd: 'Baltimore County, MD' },
          { dt: 'Period', dd: 'Jan – Mar 2026' },
          { dt: 'Agency hours', dd: '9,840' },
          { dt: 'Roles paid', dd: 'RN · LPN · CNA' },
          { dt: 'What it means', dd: 'Already buying agency shifts', kind: 'flag' },
        ],
        stamp: 'Public record',
        stampKind: 'public',
        foot: 'Filed with Medicare',
      },
      {
        title: 'Call notes',
        label: 'Example call notes',
        rows: [
          { dt: 'Spoken to', dd: 'Yes — the administrator' },
          { dt: 'Looking', dd: 'For another agency, now' },
          { dt: 'Roles', dd: 'Night-shift CNAs, weekend LPNs' },
          { dt: 'Volume', dd: 'About 20 shifts a week' },
          { dt: 'Start', dd: 'Within two weeks' },
        ],
        stamp: 'Home-confirmed',
        stampKind: 'call',
        foot: 'Before you hear the name',
      },
      {
        title: 'Introduction',
        label: 'Example introduction',
        rows: [
          { dt: 'To', dd: 'Your agency, on one email thread' },
          { dt: 'Area', dd: 'Inside your counties', kind: 'pass' },
          { dt: 'Roles', dd: 'Ones you cover', kind: 'pass' },
          { dt: 'Licences', dd: 'You hold them', kind: 'pass' },
          { dt: 'Start', dd: 'You can staff it', kind: 'pass' },
        ],
        stamp: 'Introduced',
        stampKind: 'intro',
        foot: 'Rates and contracts are yours',
      },
    ],
    joints: ['We call', 'We check'],
    also: {
      tag: 'What you see first',
      text: 'The home’s city and state, the roles and how many shifts. Its name and contact come with the introduction.',
    },
  },
  coverage: {
    h2: 'The roles and places we cover.',
    lede: 'Homes are matched to agencies by role, shift and county, so you only hear about the shifts you can fill.',
    items: [
      { b: 'Registered nurses', s: 'Charge, floor and night shifts' },
      { b: 'Licensed practical nurses', s: 'Med passes and treatments' },
      { b: 'Nursing assistants', s: 'CNAs and GNAs, every shift' },
      { b: 'Medication aides', s: 'Where the state allows them' },
      { b: 'Per diem to contract', s: 'Single shifts to 13-week blocks' },
      { b: 'Three states today', s: 'Maryland, Pennsylvania, California' },
    ],
  },
  steps: {
    h2a: 'Thirty minutes of your time.',
    h2b: 'Then we find the homes.',
    lede: 'Five steps, in this order. Your part happens at the start, and again when the home is on your desk.',
    items: [
      { who: 'you', whoLabel: 'You · 30 minutes, once', title: 'Tell us your area and roles', body: 'The counties you cover, the roles you staff (RNs, LPNs, CNAs, GNAs), the shifts you can fill and how soon you can start.' },
      { who: 'us', whoLabel: 'Us', title: 'Find homes that buy agency shifts', body: 'From the hours homes report to Medicare, we list the ones near you that already pay agencies for the roles you cover.' },
      { who: 'us', whoLabel: 'Us', title: 'Speak to the home first', body: 'We ask the administrator or director of nursing whether they want another agency: which roles, how many shifts, and from when.' },
      { who: 'us', whoLabel: 'Us', title: 'Check it against your agency', body: 'Area, roles, licences and start date. A home that doesn’t fit is dropped before you hear about it.' },
      { who: 'you', whoLabel: 'You staff it', title: 'One introduction, one email', body: 'The home and your agency on one thread, with the roles and shifts already shared. Rates, contracts and scheduling are between you and the home.' },
    ],
  },
  terms: {
    h2a: 'Every term, written down.',
    h2b: 'Before you pay.',
    lede: 'Here are the terms agencies get, before any call: the delivery window, the replacement and the refund. The fee itself is agreed on the call.',
    doc: {
      sub: 'Standard engagement · nursing home introductions',
      ref: 'SL-NS-01',
      preparedFor: 'Your agency',
      rows: [
        { title: 'Nursing home introduction', detail: 'A home near your offices that buys agency shifts in the roles you cover and has asked for another agency', value: '1' },
        { title: 'Delivery', detail: 'Counted from payment', value: '3–5 business days' },
        { title: 'Replacement', detail: 'A home that materially differs from what we described is replaced at no cost', value: 'Included' },
        { title: 'Follow-on introductions', detail: 'If the first home doesn’t lead to a contract, more introductions at no extra cost, counted from payment', value: '30 days' },
        { title: 'What you see first', detail: 'The home’s city and state, roles and shifts. The name comes with the introduction.', value: 'Before paying' },
        { title: 'Onboarding', detail: 'Thirty minutes to map your counties, roles and start dates', value: '30 min' },
      ],
      fee: 'Agreed on the call',
      feeNote: 'The home pays nothing',
      guarantee: {
        b: 'Refund: if no home that fits can be introduced, your fee is refunded in full.',
        span: 'Fits means near your offices, buying the roles you cover, and asking for another agency.',
      },
      exclusions: [
        ['Not your rates.', 'We never touch your bill rates or your contracts. That conversation is yours.'],
        NOT_A_LIST('home'),
        ['Not a contract guarantee.', 'We introduce. Whether a home signs is between you and the home.'],
      ],
      fine: 'Licensing, credentialing, rates and contracts are between your agency and the home.',
    },
  },
  freeSide: {
    k: 'For nursing homes',
    b: 'Short on nurses or aides?',
    p: 'Tell us the roles, the shifts and when you need them. We’ll introduce a licensed agency near you that covers them, at no cost to the home.',
    cta: 'Tell us what you need',
    subject: 'Staffing for our home',
  },
  faqs: [
    ['Where do the homes come from?', 'From the staffing hours nursing homes report to Medicare each quarter, which show how many hours each home paid agency staff for. Then we speak to the home before you hear about it.'],
    ['Do I learn the home’s name before I pay?', 'No. You get the city and state, the roles and the shifts. The name and contact come with the introduction, on one email thread.'],
    ['What if the home isn’t what you described?', 'If it materially differs, we replace the introduction at no cost. If no home that fits can be introduced, the fee is refunded in full.'],
    ['Is a contract guaranteed?', 'No. If the first home doesn’t lead to a contract, you get more introductions at no extra cost for 30 days from payment. Whether a home signs is always between you and it.'],
    ['Which roles and states?', 'RNs, LPNs, CNAs and GNAs, in Maryland, Pennsylvania and California today. If you cover another state, ask.'],
    ['What does the home pay?', 'Nothing. The agency pays for the introduction.'],
    INTRO_CALL('your counties, roles and how soon you can start', 'what homes near you are buying'),
  ],
  close: {
    h2: 'Want homes that already buy agency shifts?',
    p: 'Book an intro call. Tell us your counties and roles, and we’ll tell you straight what homes near you are buying. If there’s no fit, we say so on the call.',
  },
}

/* ── HOSPITAL & LOCUM STAFFING ──────────────────────────────────── */
const HOSPITAL_STAFFING: Sector = {
  slug: 'hospital-staffing',
  name: 'Hospital & locum staffing',
  hero: {
    eyebrow: 'Hospital staffing desk · for travel nurse, allied & locum agencies',
    setup: 'We introduce your agency to hospitals ',
    payoff: 'already paying for contract staff.',
    lead: 'Hospitals report what they spend on contracted patient care to Medicare, and rural facilities that buy anesthesia or physician coverage under contract show up in federal records too. We find the ones that choose their own agencies, confirm they want another, and introduce yours.',
    note: 'A short call with John Izokun, the founder. You tell us the roles and states you cover; we tell you which hospitals we’re seeing.',
  },
  board: {
    title: 'Hospitals paying for contract staff',
    range: 'Direct buyers · latest cost reports',
    cols: ['Facility', 'State', 'Contract labor', 'Roles'],
    rows: [
      { cells: ['District hospital, 90 beds', 'California', '$6.2M a year', 'RN · respiratory'], status: 'intro', note: 'Asked for another agency' },
      { cells: ['Critical access hospital', 'Kansas', 'Contracted anesthesia', 'CRNA'], status: 'brief', note: 'Brief ready' },
      { cells: ['Independent hospital, 140 beds', 'Missouri', '$4.8M a year', 'RN · radiology'], status: 'new', note: 'Calling this week' },
      { cells: ['System hospital, 300 beds', 'Ohio', '$11M a year', 'RN'], status: 'drop', note: 'Dropped · buys only through its MSP' },
      { cells: ['Rural clinic', 'Nebraska', 'Shortage area', 'Physician'], status: 'drop', note: 'Dropped · filled locally' },
    ],
    foot: '5 facilities checked · 1 asked for another agency · 1 brief ready',
    caption: 'Example board. Facilities are described, never named, until the introduction. Contract-labor figures come from the cost reports hospitals file with Medicare.',
  },
  sides: [
    { k: 'Who pays', v: 'Travel nurse, allied health and locum tenens agencies' },
    { k: 'Who needs it', v: 'Hospitals, critical access hospitals and rural clinics. They pay nothing.' },
    { k: 'Roles', v: 'RNs · CRNAs · physicians · respiratory, radiology and lab techs' },
  ],
  source: {
    h2: 'A hospital’s cost report shows what it already spends on contract staff.',
    lede: 'Hospitals file cost reports with Medicare every year, including what they paid for contracted patient care. Here is how one of them reaches your desk.',
    docs: [
      {
        title: 'Cost report',
        label: 'Example hospital cost report',
        rows: [
          { dt: 'Facility', dd: 'District hospital, 90 beds', kind: 'strong' },
          { dt: 'State', dd: 'California' },
          { dt: 'Fiscal year', dd: '2025' },
          { dt: 'Contract labor', dd: '$6.2M, direct patient care' },
          { dt: 'Buys', dd: 'Direct, not only through an MSP' },
          { dt: 'What it means', dd: 'Already paying agencies', kind: 'flag' },
        ],
        stamp: 'Public record',
        stampKind: 'public',
        foot: 'Filed with Medicare',
      },
      {
        title: 'Call notes',
        label: 'Example call notes',
        rows: [
          { dt: 'Spoken to', dd: 'Yes — the chief nursing officer' },
          { dt: 'Looking', dd: 'For another agency' },
          { dt: 'Roles', dd: 'ICU RNs, respiratory therapists' },
          { dt: 'Length', dd: '13-week contracts' },
          { dt: 'Start', dd: 'Next month' },
        ],
        stamp: 'Hospital-confirmed',
        stampKind: 'call',
        foot: 'Before you hear the name',
      },
      {
        title: 'Introduction',
        label: 'Example introduction',
        rows: [
          { dt: 'To', dd: 'Your agency, on one email thread' },
          { dt: 'Roles', dd: 'Ones you place', kind: 'pass' },
          { dt: 'Licensing', dd: 'You’re licensed in the state', kind: 'pass' },
          { dt: 'Start', dd: 'You can staff it', kind: 'pass' },
        ],
        stamp: 'Introduced',
        stampKind: 'intro',
        foot: 'Rates and credentialing are yours',
      },
    ],
    joints: ['We call', 'We check'],
    also: {
      tag: 'Direct buyers first',
      text: 'Many large systems buy every contract hour through a managed service provider. We look first for district, independent and critical access hospitals that still choose their own agencies, and tell you which kind each one is.',
    },
  },
  coverage: {
    h2: 'The roles and facilities we cover.',
    lede: 'Matched by role, state licence and start date, so you only hear about coverage you can staff.',
    items: [
      { b: 'Travel nurses', s: 'ICU, ER, med-surg, OR' },
      { b: 'CRNAs & anesthesia', s: 'Coverage for rural surgery' },
      { b: 'Locum physicians', s: 'Hospitalists, ER, primary care' },
      { b: 'Respiratory therapists', s: 'Contract and per diem' },
      { b: 'Radiology & lab techs', s: 'Imaging and lab coverage' },
      { b: 'Rural & critical access', s: 'Where shortages run longest' },
    ],
  },
  steps: {
    h2a: 'Thirty minutes of your time.',
    h2b: 'Then we find the hospitals.',
    lede: 'Five steps, in this order. Your part happens at the start, and again when the hospital is on your desk.',
    items: [
      { who: 'you', whoLabel: 'You · 30 minutes, once', title: 'Tell us what you place', body: 'Specialties, the states you’re licensed in, contract lengths and how fast you can credential.' },
      { who: 'us', whoLabel: 'Us', title: 'Find hospitals paying for contract staff', body: 'Cost reports, facility records and federal shortage designations, filtered to facilities that choose their own agencies.' },
      { who: 'us', whoLabel: 'Us', title: 'Speak to the hospital first', body: 'We confirm they want another agency: which roles, how many, and from when.' },
      { who: 'us', whoLabel: 'Us', title: 'Check it against your agency', body: 'Roles, state licences and start date. A facility you can’t staff is dropped before you hear about it.' },
      { who: 'you', whoLabel: 'You staff it', title: 'One introduction, one email', body: 'The hospital’s staffing lead and your agency on one thread, with the roles already shared. Rates, credentialing and contracts are between you and the hospital.' },
    ],
  },
  terms: {
    h2a: 'The terms, written down.',
    h2b: 'Before the first introduction.',
    lede: STANDARD_TERMS_LEDE,
    doc: {
      sub: 'Standard engagement · hospital introductions',
      ref: 'SL-HS-01',
      preparedFor: 'Your agency',
      rows: [
        { title: 'Unnamed brief', detail: 'Facility type, state, roles, contract length and start date, before the name', value: 'First' },
        { title: 'Your pick', detail: 'Choose the facilities you want an introduction to', value: 'Yours' },
        { title: 'Introduction', detail: 'One email thread with the hospital’s staffing lead, the roles already shared', value: '1 thread' },
        { title: 'Onboarding', detail: 'Thirty minutes to map what you place and where', value: '30 min' },
      ],
      fee: 'Agreed on the call',
      feeNote: 'The hospital pays nothing',
      exclusions: [
        ['Not your rates.', 'We never touch your bill rates or your contracts.'],
        NOT_A_LIST('facility'),
        ['Not a contract guarantee.', 'We introduce. Whether a hospital signs, directly or through its MSP, is between you and the hospital.'],
      ],
      fine: 'Licensing, credentialing, rates and contracts are between your agency and the hospital.',
    },
  },
  freeSide: {
    k: 'For hospitals & rural clinics',
    b: 'Short on nurses, techs or physician coverage?',
    p: 'Tell us the roles, the dates and how you contract. We’ll introduce an agency that places them, at no cost to you.',
    cta: 'Tell us what you need',
    subject: 'Staffing for our hospital',
  },
  faqs: [
    ['Where do the hospitals come from?', 'From the cost reports hospitals file with Medicare, which show what each one spent on contracted patient care, plus federal facility records and shortage designations for rural hospitals and clinics. Then we speak to the hospital before you hear about it.'],
    ['What about hospitals that use an MSP?', 'Many large systems buy through a managed service provider, and an introduction there usually means joining that program. We look first for hospitals that choose their own agencies, and we tell you which kind each one is.'],
    ['Do I learn the hospital’s name before I commit?', 'You see the facility type, state, roles and start date first. The name comes with the introduction.'],
    ['Is a contract guaranteed?', 'No. We control who reaches you and what they’ve confirmed, not whether a hospital signs.'],
    ['What does the hospital pay?', 'Nothing. The agency pays for the introduction.'],
    INTRO_CALL('the roles and states you cover', 'which hospitals we’re seeing'),
  ],
  close: {
    h2: 'Want hospitals that already pay for contract staff?',
    p: 'Book an intro call. Tell us the roles and states you cover, and we’ll tell you straight what we’re seeing. If there’s no fit, we say so on the call.',
  },
}

/* ── RECRUITING & SCHOOL STAFFING ───────────────────────────────── */
const RECRUITING: Sector = {
  slug: 'recruiting',
  name: 'Recruiting & school staffing',
  hero: {
    eyebrow: 'Recruiting desk · for recruiters & staffing firms',
    setup: 'We introduce your firm to employers ',
    payoff: 'with roles they can’t fill.',
    lead: 'Some employers show on public record that a role is hard to fill: they file to bring in engineers from abroad, or post the same school role again and again. We find those employers in your specialty, confirm the role is open, and introduce your firm.',
    note: 'A short call with John Izokun, the founder. You tell us what you place and where; we tell you which employers we’re seeing.',
  },
  board: {
    title: 'Roles that won’t fill',
    range: 'Engineering & schools · this quarter',
    cols: ['Employer', 'Location', 'Role', 'Openings'],
    rows: [
      { cells: ['Engineering firm, 400 staff', 'Boston, MA', 'Controls engineer', '3'], status: 'intro', note: 'Wants an outside firm' },
      { cells: ['School district, 9,000 students', 'Northern Illinois', 'Speech-language pathologist', '2'], status: 'brief', note: 'Brief ready' },
      { cells: ['Software company, 120 staff', 'Cambridge, MA', 'Senior developer', '4'], status: 'new', note: 'Calling this week' },
      { cells: ['Hardware startup', 'Worcester, MA', 'Firmware engineer', '1'], status: 'drop', note: 'Dropped · filled in-house' },
      { cells: ['School district, 2,500 students', 'Central Illinois', 'School psychologist', '1'], status: 'drop', note: 'Dropped · no outside firms' },
    ],
    foot: '5 roles checked · 1 wants an outside firm · 1 brief ready',
    caption: 'Example board. Employers are described, never named, until the introduction.',
  },
  sides: [
    { k: 'Who pays', v: 'Engineering & IT recruiters, school therapy and special-ed staffing firms' },
    { k: 'Who needs it', v: 'Employers hiring engineers and developers, school districts with open roles. They pay nothing.' },
    { k: 'Roles', v: 'Engineers · developers · IT · SLPs · OTs · PTs · school psychologists · special-ed teachers' },
  ],
  source: {
    h2: 'A hard-to-fill role leaves a public trail.',
    lede: 'Employers file for the engineers they can’t find locally, and districts post the special-ed roles that stay open. Here is how one of them reaches your desk.',
    docs: [
      {
        title: 'Hiring filing',
        label: 'Example hiring filing',
        rows: [
          { dt: 'Employer', dd: 'Mid-size engineering firm', kind: 'strong' },
          { dt: 'Location', dd: 'Boston, MA' },
          { dt: 'Role', dd: 'Senior controls engineer' },
          { dt: 'Positions', dd: '3' },
          { dt: 'Filed', dd: dayOffset(-12) },
          { dt: 'What it means', dd: 'Hard to fill locally', kind: 'flag' },
        ],
        stamp: 'Public record',
        stampKind: 'public',
        foot: 'Federal hiring filing',
      },
      {
        title: 'Call notes',
        label: 'Example call notes',
        rows: [
          { dt: 'Spoken to', dd: 'Yes — the hiring manager' },
          { dt: 'Open roles', dd: '3 controls engineers' },
          { dt: 'Recruiters', dd: 'Open to one more firm' },
          { dt: 'Timing', dd: 'Hiring this quarter' },
          { dt: 'Terms', dd: 'Will review a recruiter’s terms' },
        ],
        stamp: 'Employer-confirmed',
        stampKind: 'call',
        foot: 'Before you hear the name',
      },
      {
        title: 'Introduction',
        label: 'Example introduction',
        rows: [
          { dt: 'To', dd: 'Your firm, on one email thread' },
          { dt: 'Specialty', dd: 'You place it', kind: 'pass' },
          { dt: 'Location', dd: 'You cover it', kind: 'pass' },
          { dt: 'Timing', dd: 'You can start now', kind: 'pass' },
        ],
        stamp: 'Introduced',
        stampKind: 'intro',
        foot: 'Fees and terms are yours',
      },
    ],
    joints: ['We call', 'We check'],
    also: {
      tag: 'School districts too',
      text: 'Districts with open speech, occupational and physical therapy, school psychology and special-education roles, matched to staffing firms that place those roles in that state.',
    },
  },
  coverage: {
    h2: 'The roles we cover.',
    lede: 'Matched by specialty, seniority and location, so you only hear about searches you can fill.',
    items: [
      { b: 'Controls & electrical engineers', s: 'Manufacturing, automation, energy' },
      { b: 'Software & firmware developers', s: 'Product and embedded teams' },
      { b: 'IT infrastructure', s: 'Network, cloud and security' },
      { b: 'Speech-language pathologists', s: 'Schools and districts' },
      { b: 'Occupational & physical therapists', s: 'School-based therapy' },
      { b: 'Psychologists & special-ed teachers', s: 'Hard-to-fill district roles' },
    ],
  },
  steps: {
    h2a: 'Thirty minutes of your time.',
    h2b: 'Then we find the roles.',
    lede: 'Five steps, in this order. Your part happens at the start, and again when the employer is on your desk.',
    items: [
      { who: 'you', whoLabel: 'You · 30 minutes, once', title: 'Tell us what you place', body: 'Specialties, seniority, locations, and the searches you take on.' },
      { who: 'us', whoLabel: 'Us', title: 'Find the hard-to-fill roles', body: 'Public hiring filings and district vacancy postings, in your specialty and your area.' },
      { who: 'us', whoLabel: 'Us', title: 'Speak to the employer first', body: 'We confirm the role is open, that they’d work with an outside firm, and when they need someone.' },
      { who: 'us', whoLabel: 'Us', title: 'Check it against your firm', body: 'Specialty, location and timing. A role you can’t fill is dropped before you hear about it.' },
      { who: 'you', whoLabel: 'You recruit', title: 'One introduction, one email', body: 'The hiring manager and your firm on one thread, with the role already shared. Fees and terms are between you and the employer.' },
    ],
  },
  terms: {
    h2a: 'The terms, written down.',
    h2b: 'Before the first introduction.',
    lede: STANDARD_TERMS_LEDE,
    doc: {
      sub: 'Standard engagement · employer introductions',
      ref: 'SL-RS-01',
      preparedFor: 'Your firm',
      rows: [
        { title: 'Unnamed brief', detail: 'The role, location, seniority and timing, before the employer’s name', value: 'First' },
        { title: 'Your pick', detail: 'Choose the roles you want an introduction to', value: 'Yours' },
        { title: 'Introduction', detail: 'One email thread with the hiring manager, the role already shared', value: '1 thread' },
        { title: 'Onboarding', detail: 'Thirty minutes to map what you place and where', value: '30 min' },
      ],
      fee: 'Agreed on the call',
      feeNote: 'The employer pays nothing',
      exclusions: [
        ['Not your fees.', 'We never touch your placement fees or your terms.'],
        NOT_A_LIST('employer'),
        ['Not a placement guarantee.', 'We introduce. Whether a placement happens is between you and the employer.'],
      ],
      fine: 'Placement fees, contracts and candidate terms are between your firm and the employer.',
    },
  },
  freeSide: {
    k: 'For employers & school districts',
    b: 'Have a role you can’t fill?',
    p: 'Tell us the role, the location and when you need someone. We’ll introduce a recruiter or staffing firm that places it, at no cost to you.',
    cta: 'Tell us about the role',
    subject: 'A role we can’t fill',
  },
  faqs: [
    ['Where do the employers come from?', 'From public hiring filings (employers that file to bring in engineers and developers from abroad) and from school districts’ posted vacancies. Then we speak to the employer before you hear about it.'],
    ['Do I learn the employer’s name before I commit?', 'You see the role, location, seniority and timing first. The name comes with the introduction.'],
    ['Is a placement guaranteed?', 'No. We control who reaches you and what they’ve confirmed, not whether a placement happens.'],
    ['Which roles do you cover?', 'Engineering and IT roles, and school therapy and special-education roles: speech-language pathologists, occupational and physical therapists, school psychologists and special-education teachers.'],
    ['What does the employer pay?', 'Nothing. The recruiter or staffing firm pays for the introduction.'],
    INTRO_CALL('what you place and where', 'which employers we’re seeing'),
  ],
  close: {
    h2: 'Want employers that already need what you place?',
    p: 'Book an intro call. Tell us your specialty and area, and we’ll tell you straight what we’re seeing. If there’s no fit, we say so on the call.',
  },
}

/* ── SKILLED TRADES STAFFING ────────────────────────────────────── */
const TRADES_STAFFING: Sector = {
  slug: 'trades-staffing',
  name: 'Skilled trades staffing',
  hero: {
    eyebrow: 'Trades staffing desk · for construction & industrial staffing agencies',
    setup: 'We introduce your agency to contractors ',
    payoff: 'certified short of workers.',
    lead: 'When a contractor files to bring in seasonal workers, the Department of Labor certifies that it couldn’t find enough people locally, and many certified contractors still end up short when the visa cap closes. We find those contractors, confirm they need crews, and introduce your agency.',
    note: 'A short call with John Izokun, the founder. You tell us the trades and regions you cover; we tell you which contractors we’re seeing.',
  },
  board: {
    title: 'Contractors certified short of workers',
    range: 'Seasonal labor filings · this season',
    cols: ['Contractor', 'State', 'Workers certified', 'Start'],
    rows: [
      { cells: ['Concrete contractor', 'Texas', '34', 'Apr 1'], status: 'intro', note: 'Wants an agency' },
      { cells: ['Landscaping company', 'Texas', '22', 'Apr 1'], status: 'brief', note: 'Brief ready' },
      { cells: ['Roofing contractor', 'Oklahoma', '15', 'Mar 15'], status: 'new', note: 'Calling this week' },
      { cells: ['Paving contractor', 'Texas', '40', 'Apr 1'], status: 'drop', note: 'Dropped · visas came through' },
      { cells: ['Framing contractor', 'Louisiana', '8', 'May 1'], status: 'drop', note: 'Dropped · outside your region' },
    ],
    foot: '5 contractors checked · 1 wants an agency · 1 brief ready',
    caption: 'Example board. Contractors are described, never named, until the introduction.',
  },
  sides: [
    { k: 'Who pays', v: 'Construction and industrial staffing agencies' },
    { k: 'Who needs it', v: 'Contractors certified as short of workers. They pay nothing.' },
    { k: 'Trades', v: 'Laborers · concrete · landscaping · roofing · framing' },
  ],
  source: {
    h2: 'A labor certification is a contractor saying, on record, that it can’t find workers.',
    lede: 'Seasonal labor filings name how many workers a contractor needs and from when. Here is how one of them reaches your desk.',
    docs: [
      {
        title: 'Labor certification',
        label: 'Example labor certification',
        rows: [
          { dt: 'Contractor', dd: 'Concrete contractor', kind: 'strong' },
          { dt: 'State', dd: 'Texas' },
          { dt: 'Workers', dd: '34 laborers' },
          { dt: 'Start', dd: 'April 1' },
          { dt: 'Certified', dd: dayOffset(-20) },
          { dt: 'What it means', dd: 'Short of local workers', kind: 'flag' },
        ],
        stamp: 'Public record',
        stampKind: 'public',
        foot: 'Department of Labor filing',
      },
      {
        title: 'Call notes',
        label: 'Example call notes',
        rows: [
          { dt: 'Spoken to', dd: 'Yes — the owner' },
          { dt: 'Visas', dd: 'Not all came through' },
          { dt: 'Need', dd: '20 laborers, 2 finishers' },
          { dt: 'Start', dd: 'Within three weeks' },
          { dt: 'Agencies', dd: 'Open to one' },
        ],
        stamp: 'Contractor-confirmed',
        stampKind: 'call',
        foot: 'Before you hear the name',
      },
      {
        title: 'Introduction',
        label: 'Example introduction',
        rows: [
          { dt: 'To', dd: 'Your branch, on one email thread' },
          { dt: 'Trades', dd: 'You supply them', kind: 'pass' },
          { dt: 'Region', dd: 'You cover it', kind: 'pass' },
          { dt: 'Start', dd: 'You can fill it', kind: 'pass' },
        ],
        stamp: 'Introduced',
        stampKind: 'intro',
        foot: 'Bill rates are yours',
      },
    ],
    joints: ['We call', 'We check'],
    also: {
      tag: 'When it matters most',
      text: 'Most seasonal starts fall in spring, so the busiest window is late winter, when contractors learn whether their visas came through.',
    },
  },
  coverage: {
    h2: 'The trades we cover.',
    lede: 'Matched by trade, region and start date, so you only hear about orders you can fill.',
    items: [
      { b: 'General laborers', s: 'Site prep and cleanup' },
      { b: 'Concrete & paving', s: 'Finishers and crews' },
      { b: 'Landscaping', s: 'Seasonal crews' },
      { b: 'Roofing & framing', s: 'Residential and commercial' },
      { b: 'Industrial & warehouse', s: 'Plants and yards' },
      { b: 'The spring peak', s: 'Most starts fall on April 1' },
    ],
  },
  steps: {
    h2a: 'Thirty minutes of your time.',
    h2b: 'Then we find the contractors.',
    lede: 'Five steps, in this order. Your part happens at the start, and again when the contractor is on your desk.',
    items: [
      { who: 'you', whoLabel: 'You · 30 minutes, once', title: 'Tell us what you supply', body: 'Trades, regions, crew sizes and how fast you can fill an order.' },
      { who: 'us', whoLabel: 'Us', title: 'Find contractors short of workers', body: 'Seasonal labor certifications and contractors adding crews, in your region.' },
      { who: 'us', whoLabel: 'Us', title: 'Speak to the contractor first', body: 'We confirm they still need people: which trades, how many, and from when.' },
      { who: 'us', whoLabel: 'Us', title: 'Check it against your agency', body: 'Trades, region and start date. A contractor you can’t fill is dropped before you hear about it.' },
      { who: 'you', whoLabel: 'You fill it', title: 'One introduction, one email', body: 'The owner and your branch on one thread, with the order already shared. Bill rates and terms are between you and the contractor.' },
    ],
  },
  terms: {
    h2a: 'The terms, written down.',
    h2b: 'Before the first introduction.',
    lede: STANDARD_TERMS_LEDE,
    doc: {
      sub: 'Standard engagement · contractor introductions',
      ref: 'SL-TS-01',
      preparedFor: 'Your agency',
      rows: [
        { title: 'Unnamed brief', detail: 'Trades, crew size, region and start date, before the contractor’s name', value: 'First' },
        { title: 'Your pick', detail: 'Choose the contractors you want to meet', value: 'Yours' },
        { title: 'Introduction', detail: 'One email thread with the owner, the order already shared', value: '1 thread' },
        { title: 'Onboarding', detail: 'Thirty minutes to map your trades and regions', value: '30 min' },
      ],
      fee: 'Agreed on the call',
      feeNote: 'The contractor pays nothing',
      exclusions: [
        ['Not your rates.', 'We never touch your bill rates or your terms.'],
        NOT_A_LIST('contractor'),
        ['Not an order guarantee.', 'We introduce. Whether a contractor places an order is between you and the contractor.'],
        ['Not a worker fee.', 'Workers never pay anyone anything, and we never deal with workers directly.'],
      ],
      fine: 'Wages, bill rates, safety and employment terms are between your agency and the contractor.',
    },
  },
  freeSide: {
    k: 'For contractors',
    b: 'Short of crews this season?',
    p: 'Tell us the trades, how many people and when. We’ll introduce a staffing agency that supplies them, at no cost to you.',
    cta: 'Tell us what you need',
    subject: 'Crews for our next job',
  },
  faqs: [
    ['Where do the contractors come from?', 'From seasonal labor certifications, where the Department of Labor found that a contractor couldn’t find enough local workers, and from contractors adding crews. Then we speak to the owner before you hear about it.'],
    ['Do I learn the contractor’s name before I commit?', 'You see the trades, crew size, region and start date first. The name comes with the introduction.'],
    ['Is an order guaranteed?', 'No. We control who reaches you and what they’ve confirmed, not whether a contractor places an order.'],
    ['Do workers pay anything?', 'Never. The agency pays for the introduction; workers never pay anyone anything.'],
    ['Which trades?', 'General labor, concrete, landscaping, roofing, framing and other seasonal construction and industrial work. Licensed trades such as electrical and plumbing aren’t in these filings.'],
    INTRO_CALL('the trades and regions you cover', 'which contractors we’re seeing'),
  ],
  close: {
    h2: 'Want contractors that are short of crews?',
    p: 'Book an intro call. Tell us the trades and regions you cover, and we’ll tell you straight what we’re seeing. If there’s no fit, we say so on the call.',
  },
}

/* ── TRUCKING & DRIVER STAFFING ─────────────────────────────────── */
const DRIVER_STAFFING: Sector = {
  slug: 'driver-staffing',
  name: 'Trucking & driver staffing',
  hero: {
    eyebrow: 'Driver staffing desk · for driver staffing & leasing agencies',
    setup: 'We introduce your agency to carriers ',
    payoff: 'adding trucks faster than drivers.',
    lead: 'Trucking companies report their fleet size and driver count to federal regulators, and a carrier that adds trucks without adding drivers is short of drivers. We find those carriers, confirm they need drivers, and introduce your agency.',
    note: 'A short call with John Izokun, the founder. You tell us the regions and licence classes you cover; we tell you which carriers we’re seeing.',
  },
  board: {
    title: 'Carriers adding trucks',
    range: 'Fleet updates · this month',
    cols: ['Carrier', 'State', 'Trucks', 'Drivers'],
    rows: [
      { cells: ['Regional dry van carrier', 'Texas', '18 → 26', '17 → 19'], status: 'intro', note: 'Wants an agency' },
      { cells: ['Flatbed carrier', 'Oklahoma', '9 → 14', '9 → 10'], status: 'brief', note: 'Brief ready' },
      { cells: ['Reefer carrier', 'Georgia', '30 → 38', '31 → 33'], status: 'new', note: 'Calling this week' },
      { cells: ['Small fleet', 'Arkansas', '4 → 5', '4 → 5'], status: 'drop', note: 'Dropped · hired drivers' },
      { cells: ['Tanker carrier', 'Louisiana', '22 → 24', '22 → 24'], status: 'drop', note: 'Dropped · recruits in-house' },
    ],
    foot: '5 carriers checked · 1 wants an agency · 1 brief ready',
    caption: 'Example board. Carriers are described, never named, until the introduction. Fleet figures come from the registration updates carriers file with federal regulators.',
  },
  sides: [
    { k: 'Who pays', v: 'Driver staffing, leasing and recruiting agencies' },
    { k: 'Who needs it', v: 'Trucking companies adding trucks. They pay nothing.' },
    { k: 'Drivers', v: 'Class A & B CDL · regional · local · dedicated' },
  ],
  source: {
    h2: 'A carrier’s fleet update shows when trucks outrun drivers.',
    lede: 'Carriers update their registration with federal regulators, including how many trucks and drivers they run. Here is how one of them reaches your desk.',
    docs: [
      {
        title: 'Fleet update',
        label: 'Example fleet update',
        rows: [
          { dt: 'Carrier', dd: 'Regional dry van carrier', kind: 'strong' },
          { dt: 'State', dd: 'Texas' },
          { dt: 'Trucks', dd: '18 → 26' },
          { dt: 'Drivers', dd: '17 → 19' },
          { dt: 'Filed', dd: dayOffset(-6) },
          { dt: 'What it means', dd: 'Seven trucks without drivers', kind: 'flag' },
        ],
        stamp: 'Public record',
        stampKind: 'public',
        foot: 'Federal carrier registration',
      },
      {
        title: 'Call notes',
        label: 'Example call notes',
        rows: [
          { dt: 'Spoken to', dd: 'Yes — the owner' },
          { dt: 'Need', dd: '6 Class A drivers' },
          { dt: 'Runs', dd: 'Regional, home weekly' },
          { dt: 'Start', dd: 'As soon as possible' },
          { dt: 'Agencies', dd: 'Open to one' },
        ],
        stamp: 'Carrier-confirmed',
        stampKind: 'call',
        foot: 'Before you hear the name',
      },
      {
        title: 'Introduction',
        label: 'Example introduction',
        rows: [
          { dt: 'To', dd: 'Your recruiting team, on one email thread' },
          { dt: 'Licence', dd: 'Class A — you supply it', kind: 'pass' },
          { dt: 'Region', dd: 'You cover it', kind: 'pass' },
          { dt: 'Start', dd: 'You can fill it', kind: 'pass' },
        ],
        stamp: 'Introduced',
        stampKind: 'intro',
        foot: 'Rates and terms are yours',
      },
    ],
    joints: ['We call', 'We check'],
    also: {
      tag: 'Growth we check',
      text: 'We compare each carrier’s newest filing with its last one, and confirm every jump with the carrier before acting on it, because a self-reported number can be a typo.',
    },
  },
  coverage: {
    h2: 'The drivers and runs we cover.',
    lede: 'Matched by licence class, region and freight, so you only hear about drivers you can supply.',
    items: [
      { b: 'Class A drivers', s: 'Regional and over-the-road' },
      { b: 'Class B drivers', s: 'Local and straight truck' },
      { b: 'Dry van & reefer', s: 'The biggest fleets' },
      { b: 'Flatbed & tanker', s: 'Specialized freight' },
      { b: 'Dedicated & local', s: 'Home-daily runs' },
      { b: 'Lease or direct hire', s: 'However you place drivers' },
    ],
  },
  steps: {
    h2a: 'Thirty minutes of your time.',
    h2b: 'Then we find the carriers.',
    lede: 'Five steps, in this order. Your part happens at the start, and again when the carrier is on your desk.',
    items: [
      { who: 'you', whoLabel: 'You · 30 minutes, once', title: 'Tell us what you supply', body: 'Licence classes, regions, freight types and how fast you can place a driver.' },
      { who: 'us', whoLabel: 'Us', title: 'Find carriers adding trucks', body: 'Fleet updates filed with federal regulators, where trucks grow faster than drivers.' },
      { who: 'us', whoLabel: 'Us', title: 'Speak to the carrier first', body: 'We confirm they need drivers: how many, which runs, and from when.' },
      { who: 'us', whoLabel: 'Us', title: 'Check it against your agency', body: 'Licence class, region and start date. A carrier you can’t serve is dropped before you hear about it.' },
      { who: 'you', whoLabel: 'You place drivers', title: 'One introduction, one email', body: 'The owner and your team on one thread, with the need already shared. Rates and terms are between you and the carrier.' },
    ],
  },
  terms: {
    h2a: 'The terms, written down.',
    h2b: 'Before the first introduction.',
    lede: STANDARD_TERMS_LEDE,
    doc: {
      sub: 'Standard engagement · carrier introductions',
      ref: 'SL-DS-01',
      preparedFor: 'Your agency',
      rows: [
        { title: 'Unnamed brief', detail: 'Licence class, runs, region and start date, before the carrier’s name', value: 'First' },
        { title: 'Your pick', detail: 'Choose the carriers you want to meet', value: 'Yours' },
        { title: 'Introduction', detail: 'One email thread with the owner, the need already shared', value: '1 thread' },
        { title: 'Onboarding', detail: 'Thirty minutes to map what you supply', value: '30 min' },
      ],
      fee: 'Agreed on the call',
      feeNote: 'The carrier pays nothing',
      exclusions: [
        ['Not your rates.', 'We never touch your rates or your terms.'],
        NOT_A_LIST('carrier'),
        ['Not a placement guarantee.', 'We introduce. Whether a driver is placed is between you and the carrier.'],
        ['Not a driver fee.', 'Drivers never pay anyone anything, and we never deal with drivers directly.'],
      ],
      fine: 'Driver pay, rates, safety and employment terms are between your agency and the carrier.',
    },
  },
  freeSide: {
    k: 'For carriers',
    b: 'Trucks waiting on drivers?',
    p: 'Tell us the licence class, the runs and how many drivers. We’ll introduce an agency that supplies them, at no cost to you.',
    cta: 'Tell us what you need',
    subject: 'Drivers for our fleet',
  },
  faqs: [
    ['Where do the carriers come from?', 'From the registration updates carriers file with federal regulators, which list trucks and drivers. A carrier adding trucks faster than drivers is the signal. Then we speak to the owner before you hear about it.'],
    ['Do I learn the carrier’s name before I commit?', 'You see the licence class, runs, region and start date first. The name comes with the introduction.'],
    ['Is a placement guaranteed?', 'No. We control who reaches you and what they’ve confirmed, not whether a driver is placed.'],
    ['Do drivers pay anything?', 'Never. The agency pays for the introduction; drivers never pay anyone anything.'],
    ['Which drivers?', 'Class A and Class B CDL drivers for regional, local and dedicated runs: dry van, reefer, flatbed and tanker.'],
    INTRO_CALL('the regions and licence classes you cover', 'which carriers we’re seeing'),
  ],
  close: {
    h2: 'Want carriers whose trucks are waiting on drivers?',
    p: 'Book an intro call. Tell us the regions and licence classes you cover, and we’ll tell you straight what we’re seeing. If there’s no fit, we say so on the call.',
  },
}

/* ── PACKAGING & FULFILLMENT ────────────────────────────────────── */
const PACKAGING: Sector = {
  slug: 'packaging',
  name: 'Packaging & fulfillment',
  hero: {
    eyebrow: 'Packaging & fulfillment desk · for packaging suppliers, printers & 3PLs',
    setup: 'We introduce you to new brands ',
    payoff: 'before their first run ships.',
    lead: 'A brand that just applied for a trademark needs more than a manufacturer: bottles, jars, labels and cartons, then somewhere to store and ship the product. We find those brands, confirm what they need and when, and introduce the ones that fit what you supply.',
    note: 'A short call with John Izokun, the founder. You tell us what you supply and your minimums; we tell you which brands we’re seeing.',
  },
  board: {
    title: 'New brands preparing a first run',
    range: 'Packaging & fulfillment needs · this month',
    cols: ['Brand', 'Product', 'First run', 'Needs'],
    rows: [
      { cells: ['New skincare brand', '30 ml serum', '10,000 units', 'Glass droppers, cartons'], status: 'intro', note: 'Introduced' },
      { cells: ['New supplement brand', 'Gummies', '15,000 units', 'Bottles, labels, a 3PL'], status: 'brief', note: 'Brief ready' },
      { cells: ['New haircare brand', 'Shampoo', '5,000 units', 'Labels, shrink sleeves'], status: 'new', note: 'Calling this week' },
      { cells: ['New cosmetics brand', 'Lip gloss', '2,000 units', 'Tubes'], status: 'drop', note: 'Dropped · under your minimum' },
      { cells: ['New pet brand', 'Soft chews', '8,000 units', 'Pouches'], status: 'drop', note: 'Dropped · already sourced' },
    ],
    foot: '5 brands checked · 1 introduced · 1 brief ready',
    caption: 'Example board. Brands are described, never named, until the introduction.',
  },
  sides: [
    { k: 'Who pays', v: 'Packaging suppliers, label printers and 3PL fulfillment warehouses' },
    { k: 'Who needs it', v: 'New consumer brands preparing a first run. They pay nothing.' },
    { k: 'Categories', v: 'Supplements · skincare · haircare · cosmetics · personal care · food & beverage' },
  ],
  source: {
    h2: 'A trademark filing comes before the first carton.',
    lede: 'Brands apply for their name before they’ve made anything, and long before their packaging is ordered. Here is how one of them reaches your desk.',
    docs: [
      {
        title: 'Trademark application',
        label: 'Example trademark application',
        rows: [
          { dt: 'Applicant', dd: 'New skincare brand', kind: 'strong' },
          { dt: 'Class', dd: '003 — Cosmetics: serums, creams' },
          { dt: 'Filed', dd: dayOffset(-11) },
          { dt: 'Status', dd: 'New application' },
          { dt: 'Filing basis', dd: 'Intent to use — not yet sold', kind: 'flag' },
        ],
        stamp: 'Public record',
        stampKind: 'public',
        foot: 'Applied for · nothing made yet',
      },
      {
        title: 'Call notes',
        label: 'Example call notes',
        rows: [
          { dt: 'Spoken to', dd: 'Yes — the founder' },
          { dt: 'Making', dd: '30 ml facial serum' },
          { dt: 'First run', dd: '10,000 units' },
          { dt: 'Needs', dd: 'Glass droppers, cartons, a 3PL' },
          { dt: 'Timing', dd: 'Launching in four months' },
        ],
        stamp: 'Brand-confirmed',
        stampKind: 'call',
        foot: 'Before you hear the name',
      },
      {
        title: 'Introduction',
        label: 'Example introduction',
        rows: [
          { dt: 'To', dd: 'Your sales team, on one email thread' },
          { dt: 'Packaging', dd: 'You supply it', kind: 'pass' },
          { dt: 'Minimums', dd: 'The run clears them', kind: 'pass' },
          { dt: 'Timing', dd: 'You can deliver in time', kind: 'pass' },
        ],
        stamp: 'Introduced',
        stampKind: 'intro',
        foot: 'Pricing is yours',
      },
    ],
    joints: ['We call', 'We check'],
    also: {
      tag: 'Same brands as manufacturing',
      text: 'The brands come from the same trademark filings our manufacturing desk works from, so a new brand can meet its manufacturer, its packaging and its fulfillment through one introduction each.',
    },
  },
  coverage: {
    h2: 'What we cover.',
    lede: 'Matched by format, minimum and timing, so you only hear about runs you can supply.',
    items: [
      { b: 'Bottles & jars', s: 'Glass and plastic, stock or custom' },
      { b: 'Tubes, pouches & droppers', s: 'Cosmetics, supplements, pet' },
      { b: 'Labels & sleeves', s: 'Digital and flexo print' },
      { b: 'Cartons & mailers', s: 'Retail and shipping boxes' },
      { b: 'Fulfillment & storage', s: 'Pick, pack and ship' },
      { b: 'First runs that grow', s: 'Small launches, repeat orders' },
    ],
  },
  steps: {
    h2a: 'Thirty minutes of your time.',
    h2b: 'Then we find the brands.',
    lede: 'Five steps, in this order. Your part happens at the start, and again when the brand is on your desk.',
    items: [
      { who: 'you', whoLabel: 'You · 30 minutes, once', title: 'Tell us what you supply', body: 'Formats, materials, print methods or fulfillment services, your minimums and lead times.' },
      { who: 'us', whoLabel: 'Us', title: 'Find brands preparing a first run', body: 'New trademark applications in the categories you serve: brands with a name and a launch ahead.' },
      { who: 'us', whoLabel: 'Us', title: 'Speak to them first', body: 'We confirm what they need packed or shipped, how many units, and when.' },
      { who: 'us', whoLabel: 'Us', title: 'Check it against what you supply', body: 'Format, minimum and timing. A brand you can’t serve is dropped before you hear about it.' },
      { who: 'you', whoLabel: 'You quote', title: 'One introduction, one email', body: 'The founder and your team on one thread, with the needs already shared. Pricing and terms are between you and the brand.' },
    ],
  },
  terms: {
    h2a: 'The terms, written down.',
    h2b: 'Before the first introduction.',
    lede: STANDARD_TERMS_LEDE,
    doc: {
      sub: 'Standard engagement · new brand introductions',
      ref: 'SL-PF-01',
      preparedFor: 'Your company',
      rows: [
        { title: 'Unnamed brief', detail: 'Product, format, units and timing, before the brand’s name', value: 'First' },
        { title: 'Your pick', detail: 'Choose the brands you want to meet', value: 'Yours' },
        { title: 'Introduction', detail: 'One email thread with the founder, the needs already shared', value: '1 thread' },
        { title: 'Onboarding', detail: 'Thirty minutes to map what you supply', value: '30 min' },
      ],
      fee: 'Agreed on the call',
      feeNote: 'The brand pays nothing',
      exclusions: [
        ['Not your pricing.', 'We never touch your pricing or your margin.'],
        NOT_A_LIST('brand'),
        ['Not an order guarantee.', 'We introduce. Whether a brand orders is between you and the brand.'],
      ],
      fine: 'Specifications, pricing and lead times are between you and the brand.',
    },
  },
  freeSide: {
    k: 'For brands',
    b: 'Launching a product?',
    p: 'Tell us what you’re making, how many units and when. We’ll introduce packaging and fulfillment partners that fit, at no cost to you.',
    cta: 'Tell us what you’re launching',
    subject: 'Packaging and fulfillment for our launch',
  },
  faqs: [
    ['Where do the brands come from?', 'From new trademark applications, which are public record, usually filed before a brand has made anything or ordered packaging. Then we speak to the founder before you hear the name.'],
    ['Do I learn the brand’s name before I commit?', 'You see the product, format, units and timing first. The name comes with the introduction.'],
    ['Is an order guaranteed?', 'No. We control who reaches you and what they’ve confirmed, not whether a brand orders.'],
    ['What do you cover?', 'Primary packaging (bottles, jars, tubes, pouches and droppers), labels and cartons, and 3PL fulfillment: storage, pick-pack and shipping.'],
    ['What does the brand pay?', 'Nothing. The supplier pays for the introduction.'],
    INTRO_CALL('what you supply and your minimums', 'which brands we’re seeing'),
  ],
  close: {
    h2: 'Want brands that need what you supply?',
    p: 'Book an intro call. Tell us what you supply and your minimums, and we’ll tell you straight what we’re seeing. If there’s no fit, we say so on the call.',
  },
}

/* ── INTERNET FOR CLINICS & SCHOOLS ─────────────────────────────── */
const CONNECTIVITY: Sector = {
  slug: 'connectivity',
  name: 'Internet for clinics & schools',
  hero: {
    eyebrow: 'Connectivity desk · for internet, network & IT providers',
    setup: 'We bring you the clinics and schools ',
    payoff: 'buying service in your area.',
    lead: 'Rural clinics, hospitals and schools that buy internet and network service with federal support must post what they need in public, then wait before they sign. We read the new requests every week, match each one to providers that serve the area, and introduce you while there’s still time to bid.',
    note: 'A short call with John Izokun, the founder. You tell us your services and coverage; we tell you what’s being requested there.',
  },
  board: {
    title: 'New requests for service',
    range: 'Your coverage area · posted this month',
    cols: ['Requester', 'Location', 'Service', 'Can sign'],
    rows: [
      { cells: ['Rural health clinic, 2 sites', 'Southeast Missouri', 'Fiber, 1 Gbps', dayOffset(23)], status: 'intro', note: 'Introduced' },
      { cells: ['School district, 6 schools', 'Central Illinois', 'Wi-Fi & cabling', dayOffset(18)], status: 'brief', note: 'Brief ready' },
      { cells: ['Critical access hospital', 'Western Kansas', 'WAN, 3 sites', dayOffset(27)], status: 'new', note: 'New this week' },
      { cells: ['Public library', 'Northern Michigan', 'Internet, 300 Mbps', dayOffset(-2)], status: 'drop', note: 'Dropped · window closed' },
      { cells: ['Rural clinic', 'Eastern Kentucky', 'Fixed wireless', dayOffset(20)], status: 'drop', note: 'Dropped · outside your coverage' },
    ],
    foot: '5 requests checked · 1 introduced · 1 brief ready',
    caption: 'Example board. Requesters never pay us and choose their own provider.',
  },
  sides: [
    { k: 'Who pays', v: 'Internet, fiber, wireless, network and IT providers' },
    { k: 'Who needs it', v: 'Rural clinics and hospitals, schools and libraries' },
    { k: 'The rule', v: 'Clinics and schools never pay us, and they choose their provider themselves.' },
  ],
  source: {
    h2: 'Every request for service is posted before it can be signed.',
    lede: 'Federal programs require clinics and schools to post what they need and wait before choosing a provider. Here is how one request reaches you.',
    docs: [
      {
        title: 'Request for service',
        label: 'Example request for service',
        rows: [
          { dt: 'Requester', dd: 'Rural health clinic', kind: 'strong' },
          { dt: 'Location', dd: 'Southeast Missouri' },
          { dt: 'Service', dd: 'Fiber internet, 1 Gbps' },
          { dt: 'Sites', dd: '2 clinic sites' },
          { dt: 'Posted', dd: dayOffset(-5) },
          { dt: 'Can sign from', dd: dayOffset(23), kind: 'flag' },
        ],
        stamp: 'Public record',
        stampKind: 'public',
        foot: 'Posted under a federal program',
      },
      {
        title: 'Your coverage',
        label: 'Example provider coverage',
        rows: [
          { dt: 'Services', dd: 'Fiber, fixed wireless' },
          { dt: 'Area', dd: 'Southeast Missouri' },
          { dt: 'Install', dd: 'Within 60 days' },
          { dt: 'Bidding', dd: 'Yes — on this request' },
        ],
        stamp: 'Provider-confirmed',
        stampKind: 'call',
        foot: 'Before we match',
      },
      {
        title: 'Introduction',
        label: 'Example introduction',
        rows: [
          { dt: 'To', dd: 'Your sales lead, on one email thread' },
          { dt: 'Area', dd: 'Inside your coverage', kind: 'pass' },
          { dt: 'Service', dd: 'One you sell', kind: 'pass' },
          { dt: 'Timing', dd: 'Before the signing date', kind: 'pass' },
        ],
        stamp: 'Introduced',
        stampKind: 'intro',
        foot: 'You bid like anyone else',
      },
    ],
    joints: ['We match', 'We check'],
    also: {
      tag: 'The rules we keep',
      text: 'Clinics and schools never pay us and never receive anything from us. We don’t fill in their forms, take part in evaluating bids or steer their choice. You bid under the same rules as every other provider.',
    },
  },
  coverage: {
    h2: 'The services we cover.',
    lede: 'Matched by service, location and signing date, so you only hear about requests you can serve.',
    items: [
      { b: 'Fiber internet', s: 'Lit service and dark fiber' },
      { b: 'Fixed wireless', s: 'Where fiber doesn’t reach' },
      { b: 'WAN & private lines', s: 'Linking clinic and school sites' },
      { b: 'Wi-Fi & cabling', s: 'Inside the building' },
      { b: 'Managed network & firewalls', s: 'Equipment and support' },
      { b: 'Two federal programs', s: 'Rural health care, schools and libraries' },
    ],
  },
  steps: {
    h2a: 'Thirty minutes of your time.',
    h2b: 'Then we read every request.',
    lede: 'Five steps, in this order. Your part happens at the start, and again when you bid.',
    items: [
      { who: 'you', whoLabel: 'You · 30 minutes, once', title: 'Tell us what you sell and where', body: 'Services, speeds, the counties you cover and how fast you can install.' },
      { who: 'us', whoLabel: 'Us', title: 'Read every new request', body: 'New public requests for internet, network and IT service from clinics, hospitals and schools, each with the date it can be signed.' },
      { who: 'us', whoLabel: 'Us', title: 'Match it to your coverage', body: 'Location, service and timing. A request you can’t serve is dropped before you hear about it.' },
      { who: 'us', whoLabel: 'Us', title: 'Brief you before the window closes', body: 'What’s requested, where, and the date the requester can sign, so you have time to prepare a bid.' },
      { who: 'you', whoLabel: 'You bid', title: 'One introduction, one email', body: 'You and the person running the request on one thread. The bid, the evaluation and the choice are theirs and yours; we stay out of it.' },
    ],
  },
  terms: {
    h2a: 'The terms, written down.',
    h2b: 'Before the first introduction.',
    lede: 'Providers pay for introductions; clinics and schools never pay. The fee is agreed on the call and written down before the first introduction.',
    doc: {
      sub: 'Standard engagement · requests for service',
      ref: 'SL-CN-01',
      preparedFor: 'Your company',
      rows: [
        { title: 'Request brief', detail: 'Service, location, sites and signing date, before the requester’s name', value: 'First' },
        { title: 'Your pick', detail: 'Choose the requests you want to bid on', value: 'Yours' },
        { title: 'Introduction', detail: 'One email thread with the person running the request', value: '1 thread' },
        { title: 'Timing', detail: 'Sent while there’s still time to prepare a bid', value: 'Before signing' },
        { title: 'Onboarding', detail: 'Thirty minutes to map your services and coverage', value: '30 min' },
      ],
      fee: 'Agreed on the call',
      feeNote: 'Clinics and schools pay nothing',
      exclusions: [
        ['Not their advisor.', 'We never help clinics or schools with their forms, their evaluation or their choice.'],
        ['Not a gift.', 'Clinics and schools never pay us and never receive anything from us.'],
        ['Not a list.', 'Every request is checked against your coverage before you hear about it.'],
        ['Not a guaranteed win.', 'We introduce. The requester chooses its provider.'],
      ],
      fine: 'Program rules, bids and contracts are between you and the requester.',
    },
  },
  freeSide: {
    k: 'For clinics, hospitals & schools',
    b: 'Posted a request for service?',
    p: 'You never pay us, and you choose your provider. If you’d like more providers to see your request, tell us where to find it.',
    cta: 'Tell us about your request',
    subject: 'Our request for service',
  },
  faqs: [
    ['Where do the requests come from?', 'From the public postings clinics, hospitals and schools must make before they can sign for internet, network or IT service under federal programs. We read the new ones every week.'],
    ['Do clinics or schools pay you?', 'Never, and they never receive anything from us. Providers pay for introductions.'],
    ['Do you help the requester choose?', 'No. We don’t fill in their forms, take part in evaluating bids or steer their decision. You bid under the same rules as every other provider.'],
    ['Do I learn who posted the request before I commit?', 'You see the service, location, sites and signing date first. The requester’s name and contact come with the introduction.'],
    ['Is winning the bid guaranteed?', 'No. The requester chooses its provider. We make sure you hear about the request in time to bid.'],
    INTRO_CALL('your services and coverage', 'what’s being requested there'),
  ],
  close: {
    h2: 'Want the requests in your coverage area?',
    p: 'Book an intro call. Tell us what you sell and where, and we’ll tell you straight what’s being requested there. If there’s no fit, we say so on the call.',
  },
}

/* ── CONSTRUCTION & SURETY ──────────────────────────────────────── */
const CONSTRUCTION: Sector = {
  slug: 'construction',
  name: 'Construction & surety',
  hero: {
    eyebrow: 'Construction desk · for surety bond agents',
    setup: 'We introduce you to contractors ',
    payoff: 'growing into bonded work.',
    lead: 'A contractor that’s adding crews is about to bid bigger jobs, and bigger jobs need bonds. We find concrete and masonry contractors that are hiring, confirm they need bonding or more capacity, and introduce them to an agent who writes their size of work.',
    note: 'A short call with John Izokun, the founder. You tell us your carriers and the work you write; we tell you which contractors we’re seeing.',
  },
  board: {
    title: 'Contractors growing into bonded work',
    range: 'Concrete & masonry · this month',
    cols: ['Contractor', 'Location', 'Adding', 'Next bid'],
    rows: [
      { cells: ['Concrete, 25 staff', 'Dallas, TX', '2 finishing crews', 'Municipal paving'], status: 'intro', note: 'Introduced' },
      { cells: ['Masonry, 40 staff', 'Houston, TX', '1 crew', 'School addition'], status: 'brief', note: 'Brief ready' },
      { cells: ['Concrete, 12 staff', 'Austin, TX', '3 laborers', 'County flatwork'], status: 'new', note: 'Calling this week' },
      { cells: ['Concrete, 8 staff', 'San Antonio, TX', '1 laborer', 'Private work only'], status: 'drop', note: 'Dropped · no bonded work' },
      { cells: ['Masonry, 60 staff', 'Fort Worth, TX', '2 crews', 'Hospital wing'], status: 'drop', note: 'Dropped · happy with their agent' },
    ],
    foot: '5 contractors checked · 1 introduced · 1 brief ready',
    caption: 'Example board. Contractors are described, never named, until the introduction.',
  },
  sides: [
    { k: 'Who pays', v: 'Surety bond agents with an active carrier appointment' },
    { k: 'Who needs it', v: 'Concrete and masonry contractors adding crews. They pay nothing.' },
    { k: 'What they need', v: 'Bid, performance and payment bonds' },
  ],
  source: {
    h2: 'A contractor that’s hiring is about to need a bigger bond.',
    lede: 'Contractors post the crews they’re adding, and much of the work they bid is public too. Here is how one of them reaches your desk.',
    docs: [
      {
        title: 'Hiring record',
        label: 'Example hiring record',
        rows: [
          { dt: 'Contractor', dd: 'Concrete contractor, 25 staff', kind: 'strong' },
          { dt: 'Location', dd: 'Dallas, TX' },
          { dt: 'Adding', dd: '2 finishing crews' },
          { dt: 'Work', dd: 'Public paving and flatwork' },
          { dt: 'Posted', dd: dayOffset(-8) },
          { dt: 'What it means', dd: 'Bidding bigger, bonded jobs', kind: 'flag' },
        ],
        stamp: 'Public record',
        stampKind: 'public',
        foot: 'Posted publicly',
      },
      {
        title: 'Call notes',
        label: 'Example call notes',
        rows: [
          { dt: 'Spoken to', dd: 'Yes — the owner' },
          { dt: 'Bonding', dd: 'Needs a higher single-job limit' },
          { dt: 'Next bid', dd: 'Municipal paving job' },
          { dt: 'Timing', dd: 'Bid due in five weeks' },
          { dt: 'Current agent', dd: 'Open to a second opinion' },
        ],
        stamp: 'Contractor-confirmed',
        stampKind: 'call',
        foot: 'Before you hear the name',
      },
      {
        title: 'Introduction',
        label: 'Example introduction',
        rows: [
          { dt: 'To', dd: 'You, on one email thread' },
          { dt: 'Work type', dd: 'You write it', kind: 'pass' },
          { dt: 'Size', dd: 'Within your carriers’ appetite', kind: 'pass' },
          { dt: 'State', dd: 'You’re licensed there', kind: 'pass' },
        ],
        stamp: 'Introduced',
        stampKind: 'intro',
        foot: 'Underwriting is yours',
      },
    ],
    joints: ['We call', 'We check'],
    also: {
      tag: 'Appointed agents only',
      text: 'We introduce contractors only to agents who hold an active appointment from a surety carrier.',
    },
  },
  coverage: {
    h2: 'The bonds and work we cover.',
    lede: 'Matched by bond type, job size and state, so you only hear about contractors you can support.',
    items: [
      { b: 'Bid bonds', s: 'To enter public bids' },
      { b: 'Performance bonds', s: 'Once the job is won' },
      { b: 'Payment bonds', s: 'Protecting subs and suppliers' },
      { b: 'Higher single-job limits', s: 'For a bigger next job' },
      { b: 'Concrete & flatwork', s: 'Paving, foundations, sitework' },
      { b: 'Masonry & structural', s: 'Block, brick and stone' },
    ],
  },
  steps: {
    h2a: 'Thirty minutes of your time.',
    h2b: 'Then we find the contractors.',
    lede: 'Five steps, in this order. Your part happens at the start, and again when the contractor is on your desk.',
    items: [
      { who: 'you', whoLabel: 'You · 30 minutes, once', title: 'Tell us what you write', body: 'Carriers, bond types, the job sizes you can support and the states you’re licensed in.' },
      { who: 'us', whoLabel: 'Us', title: 'Find contractors that are growing', body: 'Concrete and masonry contractors adding crews, and the public work they’re bidding.' },
      { who: 'us', whoLabel: 'Us', title: 'Speak to the contractor first', body: 'We confirm they need bonding or more capacity, the size of their next job and when it bids.' },
      { who: 'us', whoLabel: 'Us', title: 'Check it against your appetite', body: 'Work type, job size, state and timing. A contractor you can’t support is dropped before you hear about it.' },
      { who: 'you', whoLabel: 'You underwrite', title: 'One introduction, one email', body: 'The owner and you on one thread, with their next bid already shared. Underwriting and terms are between you and them.' },
    ],
  },
  terms: {
    h2a: 'The terms, written down.',
    h2b: 'Before the first introduction.',
    lede: STANDARD_TERMS_LEDE,
    doc: {
      sub: 'Standard engagement · contractor introductions',
      ref: 'SL-CS-01',
      preparedFor: 'Your agency',
      rows: [
        { title: 'Unnamed brief', detail: 'Work type, job size, state and bid date, before the contractor’s name', value: 'First' },
        { title: 'Your pick', detail: 'Choose the contractors you want to meet', value: 'Yours' },
        { title: 'Introduction', detail: 'One email thread with the owner, the next bid already shared', value: '1 thread' },
        { title: 'Onboarding', detail: 'Thirty minutes to map what you write', value: '30 min' },
      ],
      fee: 'Agreed on the call',
      feeNote: 'The contractor pays nothing',
      exclusions: [
        ['Not underwriting.', 'We never touch underwriting, premiums or indemnity.'],
        NOT_A_LIST('contractor'),
        ['Not a bond guarantee.', 'We introduce. Whether a bond is written is between you, your carrier and the contractor.'],
      ],
      fine: 'Underwriting, premiums and indemnity are between you, your carriers and the contractor.',
    },
  },
  freeSide: {
    k: 'For contractors',
    b: 'Need bonding for bigger work?',
    p: 'Tell us the work you’re bidding and the size of your next job. We’ll introduce an appointed surety agent who writes it, at no cost to you.',
    cta: 'Tell us about your next bid',
    subject: 'Bonding for our next job',
  },
  faqs: [
    ['Where do the contractors come from?', 'From public records of contractors adding crews, and the public work they bid. Then we speak to the owner before you hear about it.'],
    ['Do I learn the contractor’s name before I commit?', 'You see the work type, job size, state and bid date first. The name comes with the introduction.'],
    ['Is a bond guaranteed?', 'No. Underwriting is yours and your carriers’. We control who reaches you and what they’ve confirmed.'],
    ['Do you work with agents who aren’t appointed?', 'No. Every agent we introduce holds an active appointment from a surety carrier.'],
    ['What does the contractor pay?', 'Nothing. The agent pays for the introduction.'],
    INTRO_CALL('your carriers and the work you write', 'which contractors we’re seeing'),
  ],
  close: {
    h2: 'Want contractors that are about to need a bigger bond?',
    p: 'Book an intro call. Tell us your carriers and the work you write, and we’ll tell you straight what we’re seeing. If there’s no fit, we say so on the call.',
  },
}

export const SECTORS: Record<string, Sector> = {
  packaging: PACKAGING,
  'nurse-staffing': NURSE_STAFFING,
  'hospital-staffing': HOSPITAL_STAFFING,
  recruiting: RECRUITING,
  'trades-staffing': TRADES_STAFFING,
  'driver-staffing': DRIVER_STAFFING,
  connectivity: CONNECTIVITY,
  construction: CONSTRUCTION,
}
