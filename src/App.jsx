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

export default function App() {
  const [params] = useSearchParams()
  const view = params.get('view')
  const View = VIEWS[view]

  if (!View) return <PortalHub />
  return <View />
}
