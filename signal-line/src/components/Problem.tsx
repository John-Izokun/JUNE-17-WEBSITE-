import { useId, useState } from 'react'
import NumberFlow from '@number-flow/react'

const CHANNELS = [
  {
    name: 'Referrals',
    cost: 'Nothing up front',
    catch: 'You can’t plan a year on favors. When your network goes quiet, so does your inbound — and there is no dial to turn it back up.',
  },
  {
    name: 'Trade shows',
    cost: 'A booth, travel, and days off the floor',
    catch: 'You come home with a stack of cards. Most are the wrong format, the wrong run size, or the wrong timing for your floor.',
  },
  {
    name: 'Commission brokers',
    cost: 'A cut of every run',
    catch: 'Your margin keeps paying for one introduction, run after run — including the runs your own team quoted and closed.',
  },
  {
    name: 'Directories & marketplaces',
    cost: 'A profile, then waiting',
    catch: 'The platform owns the relationship, and a brand that needs product made talks to whoever reached it first.',
  },
  {
    name: 'Signal & Line',
    cost: '$3,500 once — no cut, ever',
    catch: 'Five introductions, each spoken to first and checked against your floor. Introductions, not contracts — whether a brand signs is between you and it.',
    ours: true,
  },
]

interface FieldProps {
  label: string
  hint: string
  value: number
  min: number
  max: number
  step: number
  prefix?: string
  onChange: (n: number) => void
}

function Field({ label, hint, value, min, max, step, prefix, onChange }: FieldProps) {
  const id = useId()
  const fill = `${((value - min) / (max - min)) * 100}%`
  const set = (raw: string) => {
    const n = Number(raw)
    if (Number.isFinite(n)) onChange(Math.min(max, Math.max(min, Math.round(n))))
  }
  return (
    <div className="calc-field">
      <div className="calc-row">
        <label htmlFor={`${id}-n`}>
          {label}
          <small>{hint}</small>
        </label>
        <span className="num-wrap">
          {prefix}
          <input
            id={`${id}-n`}
            className="num"
            type="number"
            inputMode="numeric"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={e => set(e.target.value)}
          />
        </span>
      </div>
      <input
        className="range"
        type="range"
        aria-label={label}
        min={min}
        max={max}
        step={step}
        value={value}
        style={{ ['--fill' as string]: fill } as React.CSSProperties}
        onChange={e => set(e.target.value)}
      />
    </div>
  )
}

export default function Problem() {
  const [hours, setHours] = useState(12)
  const [margin, setMargin] = useState(150)
  const [weeks, setWeeks] = useState(50)
  const yearly = hours * margin * weeks
  const monthly = Math.round(yearly / 12)

  return (
    <section className="sheet sheet--paper" id="problem">
      <div className="wrap">
        <header className="sheet-head">
          <span className="no">01</span><span>The problem</span><span className="rule" />
        </header>

        <div className="split">
          <div>
            <h2 className="h2">Your lines are running empty. Right now.</h2>
            <p className="lede">
              An open line still costs rent, power and payroll. Every idle hour is margin you never
              earn back — and there is no steady stream of new brands to fill it.
            </p>
            <p className="lede lede-sm">
              The work exists. New brands apply for trademarks every week, and many haven’t chosen
              a manufacturer yet. The hard part was never demand — it was reaching them before
              someone else did.
            </p>
          </div>

          <div className="doc">
            <div className="doc-head">
              <b>What open time costs your floor</b>
              <span className="tag">Example figures</span>
            </div>
            <div className="calc-body">
              <Field
                label="Open line-hours a week"
                hint="Hours a line could run but doesn’t, across the floor"
                value={hours} min={0} max={160} step={1}
                onChange={setHours}
              />
              <Field
                label="Margin per line-hour"
                hint="What an hour of production contributes after materials"
                value={margin} min={0} max={3000} step={10} prefix="$"
                onChange={setMargin}
              />
              <Field
                label="Weeks you run a year"
                hint="Leave out shutdowns and holidays"
                value={weeks} min={1} max={52} step={1}
                onChange={setWeeks}
              />
            </div>
            <div className="calc-out" aria-live="polite">
              <div className="calc-out-k">Margin open time leaves on the table</div>
              <div className="calc-out-v">
                <NumberFlow value={yearly} format={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }} />
                <span style={{ fontSize: '0.45em', fontWeight: 600, letterSpacing: 0, marginLeft: '0.35rem', color: 'var(--night-mute)' }}>/ year</span>
              </div>
              <div className="calc-out-s">
                About <b><NumberFlow value={monthly} format={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }} /></b> every month.
              </div>
            </div>
            <p className="calc-note">These are example figures — change them to your own. Nothing you type here leaves this page.</p>
          </div>
        </div>

        <div className="ledger">
          <div className="ledger-head">
            <h3>How most facilities fill a line today — and why it breaks</h3>
          </div>
          <table>
            <thead>
              <tr>
                <th scope="col">Channel</th>
                <th scope="col">What it costs you</th>
                <th scope="col">The catch</th>
              </tr>
            </thead>
            <tbody>
              {CHANNELS.map(c => (
                <tr key={c.name} className={c.ours ? 'ours' : undefined}>
                  <td>{c.name}</td>
                  <td>{c.cost}</td>
                  <td>{c.catch}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
