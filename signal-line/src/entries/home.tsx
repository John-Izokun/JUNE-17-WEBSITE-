import { mount } from '../components/Shell'
import Home from '../pages/Home'

// Old klyvo.ca links pointed at sections of the manufacturing page (e.g. klyvo.ca/#offer).
// Those sections now live at /manufacturing, so send the visitor there.
const LEGACY = /^#(problem|source|fit|offer|industries|for-brands|book|ind-[a-z0-9-]+)$/
if (LEGACY.test(window.location.hash)) {
  window.location.replace(`/manufacturing${window.location.hash}`)
} else {
  mount(<Home />)
}
