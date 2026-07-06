import { useNavigate } from 'react-router-dom'
import {
  Bell,
  Calendar,
  ChevronDown,
  ClipboardList,
  Home,
  Settings,
  Truck,
  Users,
} from 'lucide-react'
import { getPendingRequestCount } from '../../stores/appStore'
import { TODAY, WAREHOUSES } from '../../data/mockData'
import { useQueryParam } from '../../hooks/useQueryParam'
import ScheduleGrid from './ScheduleGrid'
import RequestsInbox from './RequestsInbox'
import YardView from './YardView'
import CustomersView from './CustomersView'
import WarehouseView from './WarehouseView'

const NAV = [
  { id: 'schedule', label: 'Schedule', icon: Calendar },
  { id: 'requests', label: 'Appointments', icon: ClipboardList, badge: true },
  { id: 'yard', label: 'Yard', icon: Truck },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'warehouse', label: 'Warehouse', icon: Settings },
]

const TAB_META = {
  schedule: { title: 'Dock Schedule', subtitle: 'Door utilization and time-slot assignments' },
  requests: { title: 'Appointment Requests', subtitle: 'Carrier-submitted bookings awaiting approval' },
  yard: { title: 'Yard Control', subtitle: 'Live check-ins, dwell times, and gate status' },
  customers: { title: 'Customers', subtitle: 'Shippers and consignees moving freight through the dock' },
  warehouse: { title: 'Warehouse Setup', subtitle: 'Doors, hours, and site configuration' },
}

const TABS = {
  schedule: ScheduleGrid,
  requests: RequestsInbox,
  yard: YardView,
  customers: CustomersView,
  warehouse: WarehouseView,
}

export default function CompanyPortal() {
  const [tab, setTab] = useQueryParam('tab', 'schedule')
  const navigate = useNavigate()
  const View = TABS[tab] || ScheduleGrid
  const pending = getPendingRequestCount()
  const meta = TAB_META[tab] || TAB_META.schedule
  const warehouse = WAREHOUSES[0]

  return (
    <div className="portal-shell">
      <header className="portal-shell__header portal-shell__header--fluent">
        <div className="portal-shell__brand">
          <div className="portal-shell__brand-mark">HS</div>
          <span>Hub Scheduler</span>
          <span className="portal-shell__site">
            {warehouse.code}
            <ChevronDown size={12} />
          </span>
        </div>
        <div className="portal-shell__header-right">
          <span style={{ fontSize: 11, color: 'var(--fg-3)' }}>{TODAY}</span>
          <button type="button" className="notification-bell" aria-label="Notifications">
            <Bell size={17} />
            {pending > 0 && <span className="notification-bell__dot" />}
          </button>
          <button type="button" className="btn btn--secondary btn--sm" onClick={() => navigate('/')}>
            <Home size={13} /> Hub
          </button>
        </div>
      </header>
      <div className="portal-shell__body">
        <nav className="portal-sidebar">
          <div className="portal-sidebar__section">Operations</div>
          {NAV.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                type="button"
                className={`portal-sidebar__link${tab === item.id ? ' is-active' : ''}`}
                onClick={() => setTab(item.id)}
              >
                <Icon size={15} />
                {item.label}
                {item.badge && pending > 0 && (
                  <span className="portal-sidebar__badge">{pending}</span>
                )}
              </button>
            )
          })}
        </nav>
        <main className="portal-main">
          <header className="page-header">
            <div className="page-header__main">
              <h1 className="page-header__title">{meta.title}</h1>
              <p className="page-header__subtitle">{meta.subtitle}</p>
              <p className="page-header__meta">{warehouse.name}</p>
            </div>
          </header>
          <View />
        </main>
      </div>
    </div>
  )
}
