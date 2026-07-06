import { ArrowRight, Building2, Package, Truck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getHubStats, WAREHOUSES } from '../data/mockData'
import { buildViewUrl } from '../hooks/useQueryParam'

const PORTALS = [
  {
    id: 'company',
    title: 'Dock Operations',
    description: 'Schedule grid, approve carrier requests, yard control tower, and customer records.',
    icon: Building2,
    className: 'portal-card__icon--company',
    tab: 'schedule',
  },
  {
    id: 'carrier',
    title: 'Carrier Portal',
    description: 'Book dock appointments with trip & PO, then self check-in at the yard gate.',
    icon: Truck,
    className: 'portal-card__icon--carrier',
    tab: 'book',
    tabKey: 'carrierTab',
  },
  {
    id: 'customer',
    title: 'Customer Portal',
    description: 'Track POs, appointment status, and freight history for shippers and consignees.',
    icon: Package,
    className: 'portal-card__icon--customer',
    tab: 'dashboard',
  },
]

export default function PortalHub() {
  const navigate = useNavigate()
  const stats = getHubStats()

  return (
    <div className="portal-hub">
      <div className="portal-hub__inner">
        <div className="portal-hub__brand">
          <div className="portal-hub__logo">HS</div>
          <h1 className="portal-hub__title">Hub Scheduler</h1>
          <p className="portal-hub__subtitle">
            Dock appointment &amp; yard management for {WAREHOUSES[0].name}
          </p>
        </div>

        <div className="portal-hub__stats">
          {[
            [stats.appointmentsToday, 'Appointments Today'],
            [stats.inYard, 'Trucks In Yard'],
            [stats.pendingRequests, 'Pending Requests'],
            [stats.doors, 'Active Doors'],
          ].map(([value, label]) => (
            <div key={label} className="portal-hub__stat">
              <div className="portal-hub__stat-value">{value}</div>
              <div className="portal-hub__stat-label">{label}</div>
            </div>
          ))}
        </div>

        <div className="portal-hub__cards">
          {PORTALS.map((p) => {
            const Icon = p.icon
            const tabParam = p.tabKey || 'tab'
            return (
              <button
                key={p.id}
                type="button"
                className="portal-card"
                onClick={() => navigate(buildViewUrl(p.id, { [tabParam]: p.tab }))}
              >
                <div className={`portal-card__icon ${p.className}`}>
                  <Icon size={18} />
                </div>
                <h2>{p.title}</h2>
                <p>{p.description}</p>
                <span className="portal-card__cta">
                  Open portal <ArrowRight size={12} />
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
