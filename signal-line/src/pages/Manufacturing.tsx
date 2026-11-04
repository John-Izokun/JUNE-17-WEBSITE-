// The manufacturing desk (Klyvo): klyvo.ca's original page, now one market of several.
import { FileText } from 'lucide-react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Problem from '../components/Problem'
import Intelligence, { MemoModal } from '../components/Intelligence'
import HowItWorks from '../components/HowItWorks'
import ForManufacturers from '../components/ForManufacturers'
import ForBrands from '../components/ForBrands'
import { BookingModal, useOverlays } from '../components/Shell'
import { Close, Faq, FreeSide, Terms, type Qa } from '../components/Blocks'
import type { TermsDoc } from '../sectors'
import { mailto } from '../site'

const TERMS: TermsDoc = {
  sub: 'Standard engagement · new brand introductions',
  ref: 'SL-MFG-02',
  preparedFor: 'Your facility',
  rows: [
    { title: 'Unnamed brief', detail: 'Product, format, units per run, certifications and timing, before the brand’s name', value: 'First' },
    { title: 'Your pick', detail: 'Choose the brands you want to meet. Nothing is owed for a brand you pass on.', value: 'Yours' },
    { title: 'How you pay', detail: 'A flat fee per brand you pick, or results-only: a share of what that brand pays you in its first 12 months', value: 'Your choice' },
    { title: 'Agreement', detail: 'Terms set out in writing before the first introduction', value: 'In writing' },
    { title: 'Replacement', detail: 'An introduction that materially differs from its brief is replaced at no cost', value: 'Included' },
    { title: 'Onboarding', detail: 'Thirty minutes to map your formats, run sizes, minimums and certifications', value: '30 min' },
  ],
  fee: 'Agreed on the call',
  feeNote: 'The brand pays nothing',
  guarantee: {
    b: 'Replacement: if an introduced brand materially differs from its brief, we replace the introduction at no cost.',
    span: 'The brief is what you said yes to: product, format, run size, certifications and timing.',
  },
  exclusions: [
    ['Not your pricing.', 'We never touch your pricing or your margin. That conversation is yours.'],
    ['Not a list.', 'We don’t sell lists. Every brand has been spoken to before you hear about it.'],
    ['Not your clients.', 'We never contact your existing clients. They’re excluded at onboarding.'],
    ['Not a guarantee of work.', 'We don’t guarantee a production run. We control who reaches your inbox — not whether two businesses do a deal.'],
  ],
  fine: 'Certifications, lead times, pricing and final terms are between you and the brand.',
}

const SHARE_BODY = [
  'Terms from Signal & Line (www.klyvo.ca):',
  '',
  '- An unnamed brief first: product, format, units per run, certifications and timing',
  '- We choose the brands we want to meet; nothing is owed for a brand we pass on',
  '- Pay per brand picked, or results-only: a share of what that brand pays us in its first 12 months',
  '- Terms in writing before the first introduction; the fee is agreed on a short call',
  '- An introduction that materially differs from its brief is replaced at no cost',
  '- The brand pays nothing',
  '',
  'https://www.klyvo.ca/manufacturing#offer',
].join('\n')

const FAQS: Qa[] = [
  ['Aren’t brand-new brands mostly tire-kickers?', 'Some are. None reaches you until it has told us what it’s making, how many units and when — and that run clears your minimum. If it can’t answer those, you never hear the name.'],
  ['Where do these brands come from?', 'Mostly from new trademark applications, which are public record — often filed before a brand has made anything or chosen a manufacturer. We also track brands that have sold out and need another run.'],
  ['Is this a list?', 'No. We don’t sell lists. Every brand has been spoken to before you hear the name, and has confirmed it is actually looking for a production partner.'],
  ['Why would a brand that sold out switch manufacturers?', 'Often it doesn’t — and then we don’t introduce it. We only bring you a reorder brand that has told us it’s looking: for example, because its current maker can’t fit the run in time, or it wants a second source.'],
  ['What does “qualified” actually mean?', 'Three things: the brand is actively sourcing, the volume clears your minimum, and the format is one your floor can run. If an introduction materially misses its brief, we replace it at no cost.'],
  ['What do I actually receive with an introduction?', 'A written memo: who the brand is, who buys, what they are making, volume, certifications, timing and why it fits your floor — every line labeled with how it was confirmed, and unknowns marked as unknown.', true],
  ['How do you get paid?', 'You choose: a flat fee for each brand you pick, or results-only, a share of what that brand pays you in its first 12 months. The brand pays nothing. The terms are set out in writing before the first introduction.'],
  ['Are you guaranteeing I win the work?', 'No — and be careful of anyone who does. We control who reaches your inbox, not whether two businesses agree on terms. Certifications, lead times and pricing are between you and the brand.'],
  ['What happens to my client list?', 'You list your current clients at onboarding so we can exclude them. We never contact a brand you already make product for.'],
  ['What happens on the intro call?', 'A short call with John Izokun, the founder. You walk us through what your floor runs — formats, run sizes, minimums, certifications — and we tell you whether the brands we’re seeing fit it. If they don’t, we say so.'],
]

export default function Manufacturing() {
  const { booking, memo, openBooking, closeBooking, openMemo, closeMemo } = useOverlays()

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Nav current="manufacturing" onBook={openBooking} />
      <main id="main">
        <Hero onBook={openBooking} />
        <Problem />
        <Intelligence onOpenMemo={openMemo} />
        <HowItWorks />
        <ForManufacturers />
        <Terms
          id="offer"
          no="05"
          h2a="Every term, written down."
          h2b="Before the first introduction."
          lede="You read quotes all day, so here are our terms — what you see, what you pay for and what we don’t do — before you ever get on a call. The fee itself is agreed on the call."
          doc={TERMS}
          onBook={openBooking}
          onOpenMemo={openMemo}
          memoRow={0}
          share={{ subject: 'Signal & Line — terms for new brand introductions', body: SHARE_BODY }}
        />
        <ForBrands />
        <FreeSide
          id="for-brands"
          k="For brands"
          b="Building a brand and need someone to make it?"
          p="Tell us the format, roughly how much you need and any certifications it must carry. We’ll tell you whether we can introduce you to a facility that runs it — at no cost to you."
          cta="Tell us what you’re making"
          href={mailto('Looking for a manufacturer')}
        />
        <Faq
          no="07"
          h2="The questions you’re already asking."
          lede="You have probably been sold a list before. Fair. Here are straight answers — no follow-up call required."
          items={FAQS}
          onOpenMemo={openMemo}
          founder="I run Signal & Line from Montreal, and I put my name on these terms. If anything on this page isn’t clear, email me — I’ll answer it myself."
        />
        <Close
          no="08"
          h2="Want brands that fit your floor?"
          p="Book an intro call. We map your floor — formats, run sizes, minimums, certifications — and tell you straight whether the brands we’re seeing fit it. If they don’t, we say so on the call."
          onBook={openBooking}
          secondary={
            <button type="button" className="btn btn-line-light" onClick={openMemo}>
              <FileText size={17} aria-hidden="true" />
              See the sample memo
            </button>
          }
        />
      </main>
      <Footer onBook={openBooking} />
      <BookingModal open={booking} onClose={closeBooking} />
      <MemoModal open={memo} onClose={closeMemo} />
    </>
  )
}
