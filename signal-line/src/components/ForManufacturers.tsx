import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import NumberFlow from '@number-flow/react'
import { Check, X } from 'lucide-react'
import { FORMATS, type Format } from './Nav'

const MINIMUMS = [2500, 5000, 10000, 25000]

// Example brands for the demonstration only — not clients. The default floor passes
// the same four brands that appear on the hero schedule.
const BRANDS: { name: string; fmt: Format; run: number; why: string }[] = [
  { name: 'Northvale Labs',      fmt: 'Capsules & tablets',   run: 25000, why: 'New brand' },
  { name: 'Bellweather Supply',  fmt: 'Gummies & soft chews', run: 15000, why: 'New brand' },
  { name: 'Ridgeline Nutrition', fmt: 'Powders & blends',     run: 8000,  why: 'Sold out · reorder' },
  { name: 'Marigold Botanicals', fmt: 'Liquids & serums',     run: 10000, why: 'New brand' },
  { name: 'Verity Skin',         fmt: 'Creams & lotions',     run: 6000,  why: 'New brand' },
  { name: 'Aster Hair',          fmt: 'Liquids & serums',     run: 3000,  why: 'New brand' },
  { name: 'Halden & Co.',        fmt: 'Drinks & shots',       run: 20000, why: 'New brand' },
  { name: 'Fieldstone Pet',      fmt: 'Gummies & soft chews', run: 4500,  why: 'New brand' },
]

const fmtUnits = (n: number) => n.toLocaleString('en-US')

export default function ForManufacturers() {
  const [formats, setFormats] = useState<Set<Format>>(
    () => new Set<Format>(['Capsules & tablets', 'Gummies & soft chews', 'Powders & blends', 'Liquids & serums']),
  )
  const [minimum, setMinimum] = useState(5000)

  const toggle = (f: Format) =>
    setFormats(prev => {
      const next = new Set(prev)
      if (next.has(f)) next.delete(f)
      else next.add(f)
      return next
    })

  const results = useMemo(
    () => BRANDS.map(b => {
      if (!formats.has(b.fmt)) return { ...b, ok: false, reason: 'Format' }
      if (b.run < minimum) return { ...b, ok: false, reason: 'Under minimum' }
      return { ...b, ok: true, reason: '' }
    }),
    [formats, minimum],
  )
  const passing = results.filter(r => r.ok).length

  return (
    <section className="sheet" id="fit">
      <div className="wrap">
        <header className="sheet-head">
          <span className="no">04</span><span>For manufacturers &amp; co-packers</span><span className="rule" />
        </header>

        <h2 className="h2">Your estimator only sees the ones that fit.</h2>
        <p className="lede">
          Set a floor and watch the check run. This is the same test every brand goes through
          before its name reaches you — anything that misses is dropped, not forwarded.
        </p>

        <div className="fit">
          <div className="doc">
            <div className="doc-head"><b>Your floor</b><span className="tag">Try it</span></div>
            <div className="fit-group">
              <span className="fit-label" id="fmt-label">Formats you run</span>
              <div className="chips" role="group" aria-labelledby="fmt-label">
                {FORMATS.map(f => (
                  <button
                    key={f}
                    type="button"
                    className="chip"
                    aria-pressed={formats.has(f)}
                    onClick={() => toggle(f)}
                  >
                    {formats.has(f) && <Check size={14} aria-hidden="true" />}
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="fit-group">
              <span className="fit-label" id="min-label">Your minimum run</span>
              <div className="seg" role="group" aria-labelledby="min-label">
                {MINIMUMS.map(m => (
                  <button
                    key={m}
                    type="button"
                    aria-pressed={minimum === m}
                    onClick={() => setMinimum(m)}
                  >
                    {fmtUnits(m)}
                  </button>
                ))}
              </div>
              <p className="fit-hint">Units per first run. On the real engagement we also check certifications and timing.</p>
            </div>
          </div>

          <div className="doc" aria-live="polite">
            <div className="doc-head">
              <span className="fit-count">
                <span className="big"><NumberFlow value={passing} /></span>
                <span>of {BRANDS.length} reach your quoting team</span>
              </span>
              <span className="tag">Example brands</span>
            </div>
            {results.map(r => (
              <div key={r.name} className={`fit-row ${r.ok ? 'is-in' : 'is-out'}`}>
                <div>
                  <div className="fit-name">{r.name}</div>
                  <div className="fit-meta">{r.fmt} · {fmtUnits(r.run)} units · {r.why}</div>
                </div>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={r.ok ? 'in' : r.reason}
                    className={`verdict ${r.ok ? 'v-in' : 'v-out'}`}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18 }}
                  >
                    {r.ok
                      ? <><Check size={12} aria-hidden="true" />Introduce</>
                      : <><X size={12} aria-hidden="true" />Dropped · {r.reason}</>}
                  </motion.span>
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
