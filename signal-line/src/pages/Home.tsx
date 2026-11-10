// klyvo.ca home: Signal & Line, every market, one routing process.
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { BookingModal, SheetHead, useOverlays } from '../components/Shell'
import { Close, Faq, type Qa } from '../components/Blocks'
import { EMAIL, GROUPS, MARKETS } from '../site'

const SIGNALS = [
  'New trademark filings',
  'Agency staffing hours',
  'Contract-labor spend',
  'Hiring filings',
  'Labor certifications',
  'Fleet updates',
  'Requests for service',
  'Crews being added',
  'Products that sold out',
]

const NEED_SIDE = [
  'Need confirmed in their own words',
  'Right timing',
  'Decision-maker involved',
  'Requirements written down',
]
const PROVIDER_SIDE = [
  'Serves this kind of business',
  'Capacity inside the window',
  'Licensed, certified or bonded where required',
  'Terms agreed before the introduction',
]

const PROVIDER_BRIEF = ['What’s needed, and how much', 'Where and when', 'Requirements and certifications', 'Why it fits you']
const NEED_BRIEF = ['Who the provider is', 'What they make or cover', 'Where they are', 'What happens next']

interface CaseItem { cat: string; title: string; org: string; who: string; what: string; href?: string }

const CASES: CaseItem[] = [
  {
    cat: 'Recruitment',
    title: '$105K in added revenue in one quarter',
    org: 'Connect Group',
    who: 'Companies with active, specialist hiring demand.',
    what: 'The hiring need, decision-maker access, and whether Connect Group could serve the mandate.',
    href: 'https://signal-line-connect-group.surge.sh/',
  },
  {
    cat: 'Wealth management',
    title: 'Introductions to 6 high-net-worth individuals in 46 days',
    org: 'Regent Peak Wealth Advisors',
    who: 'Business owners, executives and families aligned with the firm’s existing client profile.',
    what: 'Profile, relevance, financial complexity, and whether an advisory conversation was appropriate.',
  },
  {
    cat: 'Industrial automation',
    title: '$85K in added revenue in under 60 days',
    org: 'Vention',
    who: 'Manufacturing decision-makers with a relevant automation need.',
    what: 'The operational problem, buying relevance, and whether the platform matched the application.',
    href: 'https://signal-line-vention.surge.sh/',
  },
  {
    cat: 'Recruitment',
    title: '$100K in added revenue in six months',
    org: 'Crawford Thomas Recruiting',
    who: 'Employers with live hiring pressure and decision-maker involvement.',
    what: 'Hiring urgency, role relevance, and whether the recruitment team was positioned to deliver.',
    href: 'https://signal-line-crawford-thomas.surge.sh/',
  },
]

const PROOF: { cat: string; r: string; org: string; href: string }[] = [
  { cat: 'E-sports', r: '€70K in new revenue in three months', org: 'ForPlayers', href: 'https://signal-line-forplayers.surge.sh/' },
  { cat: 'Recruitment', r: '20+ placements in 55 days', org: 'Elate Staffing', href: 'https://signal-line-elate.surge.sh/' },
  { cat: 'Healthcare IT', r: '4 priority healthcare clients secured', org: 'HelpCare AI', href: 'https://signal-line-healthcare-ai.surge.sh/helpcare-ai/' },
  { cat: 'Healthcare', r: '2 new partners in 60 days', org: 'Hippocratic AI', href: 'https://signal-line-healthcare-ai.surge.sh/hippocratic-ai/' },
  { cat: 'Education', r: '5 new clients in 48 days', org: 'FabuLingua', href: 'https://signal-line-fabulingua.surge.sh/' },
]

const FAQS: Qa[] = [
  ['What makes an introduction pre-vetted?', 'Four things are checked before either side hears from us: the need is real and current, the person we’re speaking to can make the decision, the provider can serve it inside the window, and both sides have said yes to the conversation. If any one is missing, the introduction doesn’t go out.'],
  ['Where do the businesses with a need come from?', 'From public records that show a need the moment it appears: new trademark applications, the staffing hours nursing homes report to Medicare, hospitals’ contract-labor spend, employers’ hiring filings and labor certifications, carriers’ fleet updates, and the requests schools and rural clinics post before they buy. Then we confirm the need with them directly.'],
  ['How do you qualify the providers?', 'What they make or cover, the size of work they take, capacity inside the window, location, and any licence, certification or bond the market requires. A provider only sees briefs that fit what it told us.'],
  ['What happens after an introduction?', 'Both sides get one email with the context already shared. From there, pricing, terms and the work belong to the two of them. We don’t sit in the middle of the deal.'],
  ['How are fees set?', 'Each side’s terms are agreed before the first introduction and set out in writing. We don’t publish them, because they depend on the market and the size of the work.'],
  ['Is a deal guaranteed?', 'No. We control who reaches you and what they’ve confirmed, not whether two businesses agree terms. Where a market carries a written guarantee — a replacement, a refund, a delivery window — it’s on that market’s page and in your terms.'],
  ['What if an introduction isn’t what you described?', 'If it materially differs from its brief, we replace the introduction at no cost.'],
  ['Do you work with competing providers?', 'Yes. An unnamed brief can go to more than one provider it fits; the introduction goes to the one that picks it and agrees the terms. If you need a category or territory to yourself, ask, and we’ll tell you plainly whether we can do it.'],
  ['Which markets do you work in?', 'Manufacturing, packaging and fulfillment, nurse staffing, hospital and locum staffing, recruiting and school staffing, skilled trades staffing, trucking and driver staffing, internet for rural clinics and schools, and construction and surety: markets where finding the need, checking both sides and making a trusted introduction saves real time.'],
  ['Why klyvo.ca?', 'Klyvo is the company’s earlier name, and our manufacturing desk still carries it. Signal & Line is the business; the address stayed.'],
]

export default function Home() {
  const { booking, openBooking, closeBooking } = useOverlays()

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Nav current="home" onBook={openBooking} />
      <main id="main">
        {/* ── HERO ── */}
        <section className="sl-hero" id="top">
          <div className="wrap">
            <p className="sl-eyebrow">Signal &amp; Line · Introductions between businesses · Montreal</p>
            <h1 className="sl-h1">
              John Izokun finds the <span className="ox">signal</span> and opens the <span className="ox">line</span> between
              operators who need to find each other.
            </h1>
            <p className="sl-sub">
              Businesses that need something made, shipped, staffed, built or connected — introduced to the
              ones that provide it, once both sides want the conversation.
            </p>
            <nav className="sl-sectors" aria-label="Markets">
              {MARKETS.map((m, i) => (
                <span key={m.slug}>
                  {i > 0 && <span className="dot" aria-hidden="true">·</span>}
                  <a href={m.href}>{m.short}</a>
                </span>
              ))}
            </nav>
            <div className="sl-cta">
              <button type="button" className="btn btn-primary" onClick={openBooking}>
                Book an intro call
                <ArrowRight size={18} aria-hidden="true" />
              </button>
              <a className="alink" href="#how-it-works">How an introduction works <span className="arw">→</span></a>
              <a className="alink" href="#markets">Find your market <span className="arw">→</span></a>
            </div>
            <dl className="sl-stats">
              <div className="sl-stat">
                <dt className="n">2 sides</dt>
                <dd className="lbl">Spoken to before any introduction</dd>
              </div>
              <div className="sl-stat">
                <dt className="n">1 email</dt>
                <dd className="lbl">One thread, both sides, full context</dd>
              </div>
              <div className="sl-stat">
                <dt className="n">$0</dt>
                <dd className="lbl">For the side with the need</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* ── MARKETS ── */}
        <section className="sl-market" id="markets">
          <div className="wrap">
            <SheetHead no="01">The markets we route</SheetHead>
            <h2 className="h2">Every market has someone with a need and someone ready to meet it. We sit on the line between them.</h2>
            <p className="lede">
              Nine desks, one method. Both sides are spoken to before any introduction, and the terms are
              set out in writing first.
            </p>
            <div className="mkt-table" role="table" aria-label="Markets">
              <div className="mkt-row mkt-head" role="row">
                <span role="columnheader">Market</span>
                <span role="columnheader">Who provides it</span>
                <span role="columnheader">Who needs it</span>
                <span role="columnheader">Where the need shows up</span>
              </div>
              {GROUPS.map(g => (
                <div key={g} className="mkt-group" role="rowgroup">
                  <div className="mkt-group-k" role="row"><span role="cell">{g}</span></div>
                  {MARKETS.filter(m => m.group === g).map(m => (
                    <a key={m.slug} className="mkt-row" role="row" href={m.href}>
                      <span role="cell" className="mkt-name">{m.name}<ArrowRight size={16} aria-hidden="true" /></span>
                      <span role="cell"><i>Provides</i>{m.provides}</span>
                      <span role="cell"><i>Needs</i>{m.needs}</span>
                      <span role="cell" className="mkt-signal"><i>Signal</i>{m.signal}</span>
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="sl-dark" id="how-it-works">
          <div className="wrap">
            <SheetHead no="02">Our routing process · 01 — 04</SheetHead>
            <h2 className="h2">We track businesses with an active need, qualify both sides upfront, and make the introduction.</h2>
            <p className="lede">The same four steps in every market, in this order.</p>

            <div className="sl-steps">
              <div className="sl-step">
                <div className="sl-step-n">01</div>
                <div>
                  <h3>Track the moment a need becomes public</h3>
                  <p>
                    A trademark application, a nursing home’s staffing report, an employer’s hiring filing,
                    a school’s request for service. Each one marks a business that needs something now, in a
                    record anyone can check.
                  </p>
                  <div className="sl-chips">
                    {SIGNALS.map(s => <span key={s} className="sl-chip">{s}</span>)}
                  </div>
                </div>
              </div>

              <div className="sl-step">
                <div className="sl-step-n">02</div>
                <div>
                  <h3>Qualify both sides upfront</h3>
                  <p>
                    We speak to the business with the need before anyone hears its name, then find the provider
                    that can meet it. Both sides are checked before anyone’s time is spent.
                  </p>
                  <div className="sl-panels">
                    <div className="sl-panel">
                      <h4>The side with the need</h4>
                      <div className="ph-sub">Ready to buy</div>
                      <ul>{NEED_SIDE.map(x => <li key={x}>{x}</li>)}</ul>
                    </div>
                    <div className="sl-panel-mid"><span>Clear fit</span></div>
                    <div className="sl-panel">
                      <h4>The provider</h4>
                      <div className="ph-sub">Ready to deliver</div>
                      <ul>{PROVIDER_SIDE.map(x => <li key={x}>{x}</li>)}</ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sl-step">
                <div className="sl-step-n">03</div>
                <div>
                  <h3>Give both sides a clear brief</h3>
                  <p>
                    The provider sees an unnamed brief first: what’s needed, how much, where and when. The name
                    follows once they want the conversation. The business with the need hears what it needs to
                    say yes.
                  </p>
                  <div className="sl-panels">
                    <div className="sl-panel">
                      <h4>Brief for the provider</h4>
                      <ul>{PROVIDER_BRIEF.map(x => <li key={x}>{x}</li>)}</ul>
                    </div>
                    <div className="sl-panel-mid"><span>Context</span></div>
                    <div className="sl-panel">
                      <h4>Brief for the business with the need</h4>
                      <ul>{NEED_BRIEF.map(x => <li key={x}>{x}</li>)}</ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sl-step">
                <div className="sl-step-n">04</div>
                <div>
                  <h3>Make the introduction</h3>
                  <p>
                    When both sides want to talk, we introduce them on one email thread with the context already
                    shared. From there, pricing, terms and the work itself belong to them.
                  </p>
                  <div className="sl-outcome">
                    <div className="t">Both sides opt in · one email thread</div>
                    <div className="m">The business with the need ↔ the provider</div>
                    <div className="sl-outcome-3">
                      <div><div className="k">01 — Why now</div><div className="v">The need is live.</div></div>
                      <div><div className="k">02 — Why this fit</div><div className="v">It matches what they already do.</div></div>
                      <div><div className="k">03 — What happens next</div><div className="v">They speak directly.</div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PARTNER RESULTS ── */}
        <section className="sheet" id="results">
          <div className="wrap">
            <SheetHead no="03">Partner results · myoProcess × Signal &amp; Line</SheetHead>
            <h2 className="h2">Results from our partnership with myoProcess.</h2>
            <p className="lede">
              Signal &amp; Line works in partnership with myoProcess and its founder, Saad Belcaid, on the same
              introduction model. These are outcomes recorded for myoProcess client engagements. Open any case
              for the full breakdown.
            </p>

            <div className="sl-case-grid">
              {CASES.map(c => {
                const body = (
                  <>
                    <div className="cat">{c.cat}</div>
                    <h3>{c.title}</h3>
                    <div className="org">{c.org}</div>
                    <dl>
                      <dt>Who they needed to reach</dt>
                      <dd>{c.who}</dd>
                      <dt>What was qualified</dt>
                      <dd>{c.what}</dd>
                    </dl>
                    {c.href && <span className="sl-read">Read the case <ArrowUpRight size={15} aria-hidden="true" /></span>}
                  </>
                )
                return c.href
                  ? <a key={c.org} className="sl-case" href={c.href} target="_blank" rel="noopener">{body}</a>
                  : <div key={c.org} className="sl-case">{body}</div>
              })}
            </div>

            <div className="sl-proof">
              <div className="sl-proof-head">More partner results</div>
              <div className="sl-proof-grid">
                {PROOF.map(p => (
                  <a key={p.org} className="sl-proof-item" href={p.href} target="_blank" rel="noopener">
                    <div className="cat">{p.cat}</div>
                    <div className="r">{p.r}</div>
                    <div className="org">{p.org} <ArrowUpRight size={13} aria-hidden="true" /></div>
                  </a>
                ))}
                <div className="sl-proof-item sl-proof-note">
                  <div className="cat">Partnership</div>
                  <div className="r">myoProcess × Saad Belcaid × Signal &amp; Line</div>
                  <div className="org">Each case opens its full breakdown</div>
                </div>
              </div>
            </div>
            <p className="sl-fine">
              Figures are historical outcomes recorded for these partner engagements, as set out on each case
              page. Future results depend on fit, timing and execution.
            </p>
          </div>
        </section>

        {/* ── THE MANUFACTURING DESK ── */}
        <section className="sl-desk-band">
          <div className="wrap">
            <div className="sl-desk">
              <div>
                <div className="side">A Signal &amp; Line desk</div>
                <h3>Klyvo — our manufacturing desk</h3>
                <p>
                  Klyvo finds brands that have just applied for a trademark and haven’t chosen where to produce,
                  checks them against a facility’s formats, run sizes and minimums, and introduces only the ones
                  that fit. It’s the desk this address is named for.
                </p>
              </div>
              <a className="btn btn-primary" href="/manufacturing">
                Open the manufacturing desk
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <Faq
          no="04"
          h2="Questions we get before an introduction."
          lede="Straight answers, before any call. Each market’s page has its own terms and questions too."
          items={FAQS}
          founder="I run Signal & Line from Montreal, and I put my name on every introduction. If anything here isn’t clear, email me — I’ll answer it myself."
        />

        <Close
          no="05"
          label="Book an intro call"
          h2="See whether we can find what your business needs."
          p="Tell me which side you’re on and what you need. I’ll tell you straight whether we’re seeing the businesses that fit — and if there’s no fit, I’ll say so."
          onBook={openBooking}
          secondary={<a className="btn btn-line-light" href={`mailto:${EMAIL}`}>Email John</a>}
        />
      </main>
      <Footer onBook={openBooking} />
      <BookingModal open={booking} onClose={closeBooking} />
    </>
  )
}
