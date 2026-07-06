import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import PortalHub from './portals/PortalHub'
import CompanyPortal from './portals/company/CompanyPortal'
import CarrierPortal from './portals/carrier/CarrierPortal'
import CustomerPortal from './portals/customer/CustomerPortal'

const VIEWS = {
  company: CompanyPortal,
  carrier: CarrierPortal,
  customer: CustomerPortal,
}

const DEFAULT_TABS = {
  company: { key: 'tab', value: 'schedule' },
  carrier: { key: 'carrierTab', value: 'book' },
  customer: { key: 'tab', value: 'dashboard' },
}

export default function App() {
  const [params, setParams] = useSearchParams()
  const view = params.get('view')
  const View = VIEWS[view]

  useEffect(() => {
    if (!view || !DEFAULT_TABS[view]) return
    const { key, value } = DEFAULT_TABS[view]
    if (params.get(key)) return
    const next = new URLSearchParams(params)
    next.set(key, value)
    setParams(next, { replace: true })
  }, [view, params, setParams])

  if (!View) return <PortalHub />
  return <View />
}
