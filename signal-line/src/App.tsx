import { useCallback, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { LucideProvider } from 'lucide-react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Intelligence, { MemoModal } from './components/Intelligence'
import HowItWorks from './components/HowItWorks'
import ForManufacturers from './components/ForManufacturers'
import ForBrands from './components/ForBrands'
import BookCall, { Offer, Questions } from './components/BookCall'
import Footer from './components/Footer'

export default function App() {
  const [booking, setBooking] = useState(false)
  const [memo, setMemo] = useState(false)

  const lock = (on: boolean) => { document.body.style.overflow = on ? 'hidden' : '' }

  const openBooking = useCallback(() => { setMemo(false); setBooking(true); lock(true) }, [])
  const closeBooking = useCallback(() => { setBooking(false); lock(false) }, [])
  const openMemo = useCallback(() => { setMemo(true); lock(true) }, [])
  const closeMemo = useCallback(() => { setMemo(false); lock(false) }, [])

  return (
    <MotionConfig reducedMotion="user">
      <LucideProvider strokeWidth={1.75} absoluteStrokeWidth>
      <a className="skip" href="#main">Skip to content</a>
      <Nav onBook={openBooking} />
      <main id="main">
        <Hero onBook={openBooking} />
        <Problem />
        <Intelligence onOpenMemo={openMemo} />
        <HowItWorks />
        <ForManufacturers />
        <Offer onBook={openBooking} onOpenMemo={openMemo} />
        <ForBrands />
        <Questions onOpenMemo={openMemo} />
        <BookCall isOpen={booking} onOpen={openBooking} onClose={closeBooking} onOpenMemo={openMemo} />
      </main>
      <Footer onBook={openBooking} />
      <MemoModal open={memo} onClose={closeMemo} />
      </LucideProvider>
    </MotionConfig>
  )
}
