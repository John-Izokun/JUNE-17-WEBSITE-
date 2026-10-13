// Kept as ScannerFeed.tsx so the deployed file set doesn't change; this is the hero schedule board.
import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import NumberFlow from '@number-flow/react'

type Kind = 'booked' | 'open' | 'intro'

interface Block {
  kind: Kind
  start: number
  end: number
  title: string
  sub: string
  order?: number
}

interface Line {
  name: string
  fmt: string
  blocks: Block[]
}

// Illustrative schedules — brand names are examples, not clients.
// Two weeks on wider screens; one week on phones, laid out so every name fits.
const WIDE: Line[] = [
  {
    name: 'Line 1', fmt: 'Capsules',
    blocks: [
      { kind: 'booked', start: 0, end: 3, title: 'Run 2231', sub: 'Booked' },
      { kind: 'open',   start: 3, end: 6, title: 'Open', sub: '3 days' },
      { kind: 'intro',  start: 3, end: 6, title: 'Northvale Labs', sub: 'New brand · quoting', order: 1 },
      { kind: 'booked', start: 6, end: 10, title: 'Run 2240', sub: 'Booked' },
    ],
  },
  {
    name: 'Line 2', fmt: 'Gummies',
    blocks: [
      { kind: 'open',   start: 0, end: 3, title: 'Open', sub: '3 days' },
      { kind: 'intro',  start: 0, end: 3, title: 'Bellweather Supply', sub: 'New brand · quoting', order: 0 },
      { kind: 'booked', start: 3, end: 7, title: 'Run 2234', sub: 'Booked' },
      { kind: 'open',   start: 7, end: 10, title: 'Open', sub: '3 days' },
    ],
  },
  {
    name: 'Line 3', fmt: 'Powder fill',
    blocks: [
      { kind: 'booked', start: 0, end: 4, title: 'Run 2229', sub: 'Booked' },
      { kind: 'open',   start: 4, end: 10, title: 'Open', sub: '6 days' },
      { kind: 'intro',  start: 4, end: 8, title: 'Ridgeline Nutrition', sub: 'Reorder · quoting', order: 2 },
    ],
  },
  {
    name: 'Line 4', fmt: 'Liquid fill',
    blocks: [
      { kind: 'open',   start: 0, end: 5, title: 'Open', sub: '5 days' },
      { kind: 'intro',  start: 0, end: 4, title: 'Marigold Botanicals', sub: 'New brand · quoting', order: 3 },
      { kind: 'booked', start: 5, end: 10, title: 'Run 2236', sub: 'Booked' },
    ],
  },
]

const NARROW: Line[] = [
  {
    name: 'Line 1', fmt: 'Capsules',
    blocks: [
      { kind: 'booked', start: 0, end: 2, title: 'Run 2231', sub: 'Booked' },
      { kind: 'open',   start: 2, end: 5, title: 'Open', sub: '3 days' },
      { kind: 'intro',  start: 2, end: 5, title: 'Northvale Labs', sub: 'Quoting', order: 1 },
    ],
  },
  {
    name: 'Line 2', fmt: 'Gummies',
    blocks: [
      { kind: 'open',   start: 0, end: 3, title: 'Open', sub: '3 days' },
      { kind: 'intro',  start: 0, end: 3, title: 'Bellweather Supply', sub: 'Quoting', order: 0 },
      { kind: 'booked', start: 3, end: 5, title: 'Run 2234', sub: 'Booked' },
    ],
  },
  {
    name: 'Line 3', fmt: 'Powder fill',
    blocks: [
      { kind: 'open',   start: 0, end: 5, title: 'Open', sub: '5 days' },
      { kind: 'intro',  start: 0, end: 3, title: 'Ridgeline Nutrition', sub: 'Reorder · quoting', order: 2 },
    ],
  },
  {
    name: 'Line 4', fmt: 'Liquid fill',
    blocks: [
      { kind: 'open',   start: 0, end: 5, title: 'Open', sub: '5 days' },
      { kind: 'intro',  start: 0, end: 5, title: 'Marigold Botanicals', sub: 'Quoting', order: 3 },
    ],
  },
]

const INTRO_COUNT = 4
// A new brand quotes for open time weeks ahead, not this week — so the board looks six weeks out.
const WEEKS_OUT = 6
const WEEKDAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

interface DayMeta { label: string; weekStart: boolean }

// US plant holidays are skipped like weekends, so no run ever lands on Thanksgiving.
function isHoliday(d: Date) {
  const m = d.getMonth()
  const day = d.getDate()
  const wd = d.getDay()
  const nth = Math.ceil(day / 7)
  const lastOfMonth = day + 7 > new Date(d.getFullYear(), m + 1, 0).getDate()
  return (m === 0 && day === 1)
    || (m === 4 && wd === 1 && lastOfMonth)
    || (m === 6 && day === 4)
    || (m === 8 && wd === 1 && nth === 1)
    || (m === 10 && wd === 4 && nth === 4)
    || (m === 11 && day === 25)
}

function planWindow(count: number, short: boolean) {
  const cursor = new Date()
  const dow = cursor.getDay()
  cursor.setDate(cursor.getDate() + (dow === 0 ? -6 : 1 - dow) + WEEKS_OUT * 7)
  const days: DayMeta[] = []
  const dates: Date[] = []
  while (days.length < count) {
    const d = cursor.getDay()
    if (d !== 0 && d !== 6 && !isHoliday(cursor)) {
      const prev = dates[dates.length - 1]
      days.push({
        label: `${short ? WEEKDAY[d].slice(0, 2) : WEEKDAY[d]} ${cursor.getDate()}`,
        weekStart: !!prev && prev.getDay() >= d,
      })
      dates.push(new Date(cursor))
    }
    cursor.setDate(cursor.getDate() + 1)
  }
  const fmt = (x: Date) => x.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  return { days, range: `${fmt(dates[0])} – ${fmt(dates[dates.length - 1])}` }
}

function useNarrow(query = '(max-width: 720px)') {
  const [narrow, setNarrow] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const m = window.matchMedia(query)
    const on = () => setNarrow(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [query])
  return narrow
}

export default function ScheduleBoard() {
  const narrow = useNarrow()
  const days = narrow ? 5 : 10
  const { days: meta, range } = useMemo(() => planWindow(days, narrow), [days, narrow])

  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) { setShown(INTRO_COUNT); return }
    const timers = Array.from({ length: INTRO_COUNT }, (_, i) =>
      window.setTimeout(() => setShown(i + 1), 650 + i * 850),
    )
    return () => timers.forEach(clearTimeout)
  }, [inView, reduce])

  const lines = narrow ? NARROW : WIDE

  const openTotal = lines.reduce(
    (n, l) => n + l.blocks.filter(b => b.kind === 'open').reduce((m, b) => m + b.end - b.start, 0), 0,
  )
  const quoting = lines.reduce(
    (n, l) => n + l.blocks
      .filter(b => b.kind === 'intro' && (b.order ?? 0) < shown)
      .reduce((m, b) => m + b.end - b.start, 0), 0,
  )

  const cols = { ['--days' as string]: days } as React.CSSProperties

  return (
    <figure>
      <div
        ref={ref}
        className="board"
        role="img"
        aria-label={`Example production schedule for a four-line facility, ${narrow ? 'one week' : 'two weeks'} starting six weeks from now. Open time on each line has an introduced brand quoting for it: Bellweather Supply on gummies, Northvale Labs on capsules, Ridgeline Nutrition on powder fill after selling out, and Marigold Botanicals on liquid fill.`}
      >
        <div className="board-bar">
          <span className="board-title">Production schedule</span>
          <span className="board-tag">Example facility</span>
          <span className="board-range">{range} · six weeks out</span>
          <div className="board-legend" aria-hidden="true">
            <span className="lg lg-booked"><i />Booked</span>
            <span className="lg lg-open"><i />Open</span>
            <span className="lg lg-intro"><i />Introduced · quoting</span>
          </div>
        </div>

        <div className="board-head" aria-hidden="true">
          <div className="board-corner">Line</div>
          <div className="days" style={cols}>
            {meta.map(d => (
              <div key={d.label} className={`day ${d.weekStart ? 'wk' : ''}`}>
                {d.label}
              </div>
            ))}
          </div>
        </div>

        {lines.map(line => (
          <div key={line.name} className="board-row" aria-hidden="true">
            <div className="row-label">
              <b>{line.name}</b>
              <span>{line.fmt}</span>
            </div>
            <div className="track" style={cols}>
              {meta.map((d, i) => (
                <span
                  key={d.label}
                  className={`cell ${d.weekStart ? 'wk' : ''}`}
                  style={{ gridColumn: `${i + 1} / span 1` }}
                />
              ))}
              {line.blocks.map(b => {
                const area = { gridColumn: `${b.start + 1} / ${b.end + 1}` }
                if (b.kind !== 'intro') {
                  return (
                    <div key={`${b.kind}-${b.start}`} className={`blk blk-${b.kind}`} style={area}>
                      <b>{b.title}</b>
                      <span>{b.sub}</span>
                    </div>
                  )
                }
                const on = (b.order ?? 0) < shown
                return (
                  <motion.div
                    key={`intro-${b.start}`}
                    className="blk blk-intro"
                    style={area}
                    initial={false}
                    animate={on
                      ? { clipPath: 'inset(0 0% 0 0 round 5px)', opacity: 1 }
                      : { clipPath: 'inset(0 100% 0 0 round 5px)', opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
                  >
                    <b>{b.title}</b>
                    <span>{b.sub}</span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        ))}

        <div className="board-foot" aria-hidden="true">
          <span>
            Open line-days in this window: <strong>{openTotal}</strong>
            {' '}<span className="gain">· <NumberFlow value={quoting} /> with a brand quoting</span>
          </span>
          <span>Each brand is introduced to this facility only</span>
        </div>
      </div>
      <figcaption className="board-note">
        Example schedule, six weeks out. Brand names are illustrative — new brands with nothing
        made yet, plus one reordering after it sold out.
      </figcaption>
    </figure>
  )
}
