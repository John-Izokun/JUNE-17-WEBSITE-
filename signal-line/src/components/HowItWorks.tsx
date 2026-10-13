const STATIONS = [
  {
    who: 'you',
    whoLabel: 'You · 30 minutes, once',
    title: 'Map your floor',
    body: 'Formats you run, run sizes, minimums, certifications and the windows you want filled. Your existing clients go on an exclusion list so we never contact them.',
  },
  {
    who: 'us',
    whoLabel: 'Us',
    title: 'Find the brands',
    body: 'New trademark applications in your categories — brands with a name and nothing made yet. Plus brands that have sold out and need another run.',
  },
  {
    who: 'us',
    whoLabel: 'Us',
    title: 'Speak to them first',
    body: 'Every brand is contacted before you hear its name. We confirm they are actively looking for a facility, what they are making, how much, and when.',
  },
  {
    who: 'us',
    whoLabel: 'Us',
    title: 'Check it against your floor',
    body: 'Format, run size, minimum, certifications, timing. Anything that misses is dropped — your estimator never sees it.',
  },
  {
    who: 'you',
    whoLabel: 'You quote',
    title: 'Introduce — to you alone',
    body: 'The brand reaches your quoting team with a written memo, and nobody else gets it. Pricing, lead times and final terms are between you and them.',
  },
]

export default function HowItWorks() {
  return (
    <section className="sheet sheet--paper" id="how-it-works">
      <div className="wrap">
        <header className="sheet-head">
          <span className="no">03</span><span>How it works</span><span className="rule" />
        </header>

        <div className="travel">
          <div className="travel-side">
            <h2 className="h2"><span className="h2-l">Thirty minutes of your&nbsp;time.</span> <span className="h2-l">Then we do the&nbsp;work.</span></h2>
            <p className="lede">
              Five steps, in this order. Your part happens once, at the start. Everything after
              that is ours until the brand is on your desk.
            </p>
            <div className="who-key" aria-hidden="true">
              <span className="who who-you">You</span>
              <span className="who who-us">Us</span>
            </div>
          </div>

          <ol className="stations">
            {STATIONS.map((s, i) => (
              <li key={s.title} className="station">
                <span className="st-dot" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <span className={`who who-${s.who}`}>{s.whoLabel}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
