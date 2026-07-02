import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const POOL = [
  { product: 'Ashwagandha Gummies 60ct',     domain: 'neonnutra.com',        status: 'oos'   },
  { product: 'Creatine Monohydrate 300g',    domain: 'vitalrootslabs.com',   status: 'oos'   },
  { product: 'Vitamin C Serum 30ml',         domain: 'clearderm.co',         status: 'low'   },
  { product: 'Collagen Powder 500g',         domain: 'formulationco.com',    status: 'oos'   },
  { product: 'Magnesium Complex 120ct',      domain: 'brightleafsupp.com',   status: 'low'   },
  { product: 'Pre-Workout Formula 300g',     domain: 'alphastack.co',        status: 'ok'    },
  { product: 'Hyaluronic Acid Serum 50ml',   domain: 'neuroleaf.com',        status: 'oos'   },
  { product: 'Greens Superfood Blend 300g',  domain: 'elevatenutra.com',     status: 'oos'   },
  { product: 'Probiotic 50B CFU 30ct',       domain: 'coresupp.com',         status: 'low'   },
  { product: 'Melatonin Gummies 5mg 60ct',   domain: 'solstice.com',         status: 'oos'   },
  { product: 'Whey Isolate 5lbs',            domain: 'foundrysupps.com',     status: 'ok'    },
  { product: 'Retinol Night Cream 50ml',     domain: 'cleardermluxe.com',    status: 'oos'   },
  { product: 'Hair Growth Serum 100ml',      domain: 'stackhouse.io',        status: 'low'   },
  { product: 'Zinc + Magnesium 90ct',        domain: 'originstack.com',      status: 'oos'   },
  { product: 'Apple Cider Vinegar Gummies',  domain: 'pulsenutra.co',        status: 'oos'   },
  { product: 'Creatine Gummies 90ct',        domain: 'groundtheory.com',     status: 'oos'   },
  { product: 'Omega-3 Complex 90ct',         domain: 'pureform.io',          status: 'ok'    },
  { product: 'Sleep Formula Capsules 60ct',  domain: 'trueroots.co',         status: 'low'   },
  { product: 'Niacinamide Serum 30ml',       domain: 'dermfusion.co',        status: 'ok'    },
  { product: 'Vitamin D3 K2 Drops 30ml',     domain: 'vitacore.com',         status: 'ok'    },
]

const STATUS_LABEL: Record<string, string> = {
  oos: 'OUT OF STOCK',
  low: 'RUNNING LOW',
  ok:  'IN STOCK',
}

interface ScanItem {
  id: string
  product: string
  domain: string
  status: string
}

export default function ScannerFeed() {
  const [items, setItems] = useState<ScanItem[]>(
    POOL.slice(0, 10).map((p, i) => ({ ...p, id: `init-${i}` }))
  )
  const [poolIdx, setPoolIdx] = useState(10)
  const [totalScanned, setTotalScanned] = useState(10247)
  const [oosFound, setOosFound] = useState(17)

  useEffect(() => {
    const interval = setInterval(() => {
      const next = POOL[poolIdx % POOL.length]
      const newItem: ScanItem = { ...next, id: `item-${Date.now()}` }
      setItems(prev => [...prev.slice(1), newItem])
      setPoolIdx(i => i + 1)
      setTotalScanned(n => n + Math.floor(Math.random() * 3) + 1)
      if (next.status === 'oos') setOosFound(n => n + 1)
    }, 1800)
    return () => clearInterval(interval)
  }, [poolIdx])

  return (
    <div className="scanner-frame">
      <div className="scanner-header">
        <div className="scanner-header-left">
          <div className="scanner-dot" />
          <span className="scanner-title">LIVE · BRANDS SELLING OUT NOW</span>
        </div>
        <span className="scanner-count">{totalScanned.toLocaleString()} checked</span>
      </div>

      <div className="scanner-body">
        <AnimatePresence initial={false}>
          {items.map(item => (
            <motion.div
              key={item.id}
              className="scan-card"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: item.status === 'ok' ? 0.45 : 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`scan-card-dot ${item.status}`} />
              <div className="scan-card-info">
                <div className="scan-card-product">{item.product}</div>
                <div className="scan-card-domain">{item.domain}</div>
              </div>
              <span className={`scan-badge ${item.status}`}>
                {STATUS_LABEL[item.status]}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="scanner-footer">
        <span className="scanner-footer-stat">
          <span>{oosFound}</span> brands need production today
        </span>
        <span className="scanner-footer-stat">Shopify + Amazon storefronts</span>
      </div>
    </div>
  )
}
