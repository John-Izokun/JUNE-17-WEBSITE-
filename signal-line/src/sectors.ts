// The market pages that share one template (src/pages/Sector.tsx).
// Manufacturing has its own, richer page. Every line here must stay true:
// no prices, no invented results, no promise the business doesn't keep.

import { dayOffset } from './site'

export type StampKind = 'public' | 'call' | 'intro'

export interface DocRow { dt: string; dd: string; kind?: 'flag' | 'pass' | 'strong' }

export interface Doc {
  title: string
  label: string // accessible name
  rows: DocRow[]
  stamp: string
  stampKind: StampKind
  foot: string
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
  sides: { k: string; v: string }[]
  source: { h2: string; lede: string; docs: [Doc, Doc, Doc]; joints: [string, string]; also: { tag: string; text: string } }
  steps: { h2a: string; h2b: string; lede: string; items: Station[] }
  terms: { h2a: string; h2b: string; lede: string; doc: TermsDoc }
  freeSide: { k: string; b: string; p: string; cta: string; subject: string }
  faqs: [string, string][]
  close: { h2: string; p: string }
}

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
        ['Not a list.', 'We don’t sell lists. Every home has been spoken to before you hear about it.'],
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
    ['What happens on the intro call?', 'Thirty minutes with John Izokun. You tell us your counties, roles and how soon you can start; we tell you what homes near you are buying. If there’s no fit, we say so.'],
  ],
  close: {
    h2: 'Want homes that already buy agency shifts?',
    p: 'Book an intro call. Tell us your counties and roles, and we’ll tell you straight what homes near you are buying. If there’s no fit, we say so on the call.',
  },
}

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
    lede: 'What you see, what you choose and what we don’t do. The fee is agreed on the call and written down before the first introduction.',
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
        ['Not a list.', 'We don’t sell lists. Every employer has been spoken to before you hear about it.'],
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
    ['What happens on the intro call?', 'Thirty minutes with John Izokun. You tell us what you place and where; we tell you which employers we’re seeing. If there’s no fit, we say so.'],
  ],
  close: {
    h2: 'Want employers that already need what you place?',
    p: 'Book an intro call. Tell us your specialty and area, and we’ll tell you straight what we’re seeing. If there’s no fit, we say so on the call.',
  },
}

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
    ['What happens on the intro call?', 'Thirty minutes with John Izokun. You tell us your services and coverage; we tell you what’s being requested there. If there’s no fit, we say so.'],
  ],
  close: {
    h2: 'Want the requests in your coverage area?',
    p: 'Book an intro call. Tell us what you sell and where, and we’ll tell you straight what’s being requested there. If there’s no fit, we say so on the call.',
  },
}

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
    lede: 'What you see, what you choose and what we don’t do. The fee is agreed on the call and written down before the first introduction.',
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
        ['Not a list.', 'We don’t sell lists. Every contractor has been spoken to before you hear about it.'],
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
    ['What happens on the intro call?', 'Thirty minutes with John Izokun. You tell us your carriers and the work you write; we tell you which contractors we’re seeing. If there’s no fit, we say so.'],
  ],
  close: {
    h2: 'Want contractors that are about to need a bigger bond?',
    p: 'Book an intro call. Tell us your carriers and the work you write, and we’ll tell you straight what we’re seeing. If there’s no fit, we say so on the call.',
  },
}

export const SECTORS: Record<string, Sector> = {
  'nurse-staffing': NURSE_STAFFING,
  recruiting: RECRUITING,
  connectivity: CONNECTIVITY,
  construction: CONSTRUCTION,
}
