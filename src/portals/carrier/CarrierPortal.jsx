import { useNavigate } from 'react-router-dom'
import { CalendarPlus, Home, MapPin } from 'lucide-react'
import BookAppointment from './BookAppointment'
import YardCheckIn from './YardCheckIn'
import { CARRIERS } from '../../data/mockData'
import { useQueryParam } from '../../hooks/useQueryParam'

const carrier = CARRIERS.find((c) => c.id === 'CAR-004')

export default function CarrierPortal() {
  const [tab, setTab] = useQueryParam('carrierTab', 'book')
  const navigate = useNavigate()

  return (
    <div className="portal-shell">
      <header className="portal-shell__header">
        <div className="portal-shell__brand">
          <div className="portal-shell__brand-mark">HS</div>
          <span>{carrier?.name}</span>
          <span style={{ color: 'var(--fg-3)', fontWeight: 400 }}>· Carrier</span>
        </div>
        <nav className="portal-shell__nav">
          <button type="button" className={tab === 'book' ? 'is-active' : ''} onClick={() => setTab('book')}>
            <CalendarPlus size={14} style={{ marginRight: 5, verticalAlign: -2 }} />
            Book Appointment
          </button>
          <button type="button" className={tab === 'yard' ? 'is-active' : ''} onClick={() => setTab('yard')}>
            <MapPin size={14} style={{ marginRight: 5, verticalAlign: -2 }} />
            Yard Check-in
          </button>
        </nav>
        <button type="button" className="btn btn--secondary btn--sm" onClick={() => navigate('/')}>
          <Home size={13} /> Hub
        </button>
      </header>
      <main className="portal-main">
        {tab === 'yard' ? <YardCheckIn /> : <BookAppointment />}
      </main>
    </div>
  )
}
