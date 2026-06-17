import { useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Problem from './components/Problem'
import HowItWorks from './components/HowItWorks'
import ForManufacturers from './components/ForManufacturers'
import ForBrands from './components/ForBrands'
import Intelligence from './components/Intelligence'
import BookCall from './components/BookCall'
import Footer from './components/Footer'

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)

  const openModal  = () => { setModalOpen(true);  document.body.style.overflow = 'hidden' }
  const closeModal = () => { setModalOpen(false); document.body.style.overflow = ''       }

  return (
    <>
      <Nav onBookCall={openModal} />
      <Hero onBookCall={openModal} />
      <Problem />
      <HowItWorks />
      <ForManufacturers />
      <ForBrands />
      <Intelligence />
      <BookCall isOpen={modalOpen} onOpen={openModal} onClose={closeModal} />
      <Footer />
    </>
  )
}
