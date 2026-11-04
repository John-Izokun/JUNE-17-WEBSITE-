import { mount } from '../components/Shell'
import Sector from '../pages/Sector'
import { SECTORS } from '../sectors'

// Each market's .html file names its market: <body data-sector="nurse-staffing">.
const slug = document.body.dataset.sector ?? ''
const sector = SECTORS[slug]
if (sector) mount(<Sector s={sector} />)
else window.location.replace('/')
