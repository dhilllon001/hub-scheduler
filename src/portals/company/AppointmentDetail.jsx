import { useState } from 'react'
import { X } from 'lucide-react'
import { getCarrier, getCustomer } from '../../data/mockData'
import { MoveTypePill, ApptTypePill, StatePill } from '../../components/shared'

const TABS = ['Activity', 'Chat', 'Documents', 'Photos', 'Checklist']

const ACTIVITY = [
  { time: '06:45 AM', event: 'Driver checked in at gate', actor: 'Gate Operator' },
  { time: '07:52 AM', event: 'Assigned to dock door', actor: 'Yard Coordinator' },
  { time: '08:04 AM', event: 'Loading / unloading started', actor: 'Warehouse Team' },
]

const CHECKLIST = [
  { item: 'BOL received and verified', done: true },
  { item: 'Seal number confirmed', done: true },
  { item: 'Trailer inspection complete', done: true },
  { item: 'Dock safety briefing', done: false },
  { item: 'Release paperwork signed', done: false },
]

export default function AppointmentDetail({ appointment, onClose }) {
  const [tab, setTab] = useState('Activity')
  if (!appointment) return null

  const carrier = getCarrier(appointment.carrierId)
  const customer = getCustomer(appointment.customerId)

  const details = [
    ['Carrier', carrier?.name],
    ['Customer', customer?.name],
    ['Driver', appointment.driver?.name],
    ['Phone', appointment.driver?.phone],
    ['Door', appointment.doorId],
    ['Slot', `${appointment.date} · ${appointment.slot}`],
    ['Trailer', appointment.trailer || '—'],
    ['Seal', appointment.seal || '—'],
  ]

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <aside className="drawer">
        <button type="button" className="drawer__close" onClick={onClose} aria-label="Close">
          <X size={15} />
        </button>
        <header className="drawer__header">
          <h2 className="drawer__title">{appointment.id}</h2>
          <div className="drawer__sub">
            <span>{appointment.tripId}</span>
            <span>·</span>
            <span>{appointment.po}</span>
            <StatePill status={appointment.status} />
          </div>
          <div className="drawer__pills">
            <MoveTypePill moveType={appointment.moveType} />
            <ApptTypePill apptType={appointment.apptType} />
          </div>
        </header>
        <nav className="drawer__tabs">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              className={`drawer__tab${tab === t ? ' is-active' : ''}`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </nav>
        <div className="drawer__body">
          {tab === 'Activity' && (
            <>
              <dl className="sr-hover-popover__grid" style={{ marginBottom: 20 }}>
                {details.map(([label, value]) => (
                  <div key={label} style={{ display: 'contents' }}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--fg-3)', margin: '0 0 8px' }}>
                Timeline
              </h3>
              {ACTIVITY.map((a) => (
                <div key={a.time} className="drawer__timeline-item">
                  <div className="drawer__timeline-time">{a.time}</div>
                  <div className="drawer__timeline-event">{a.event}</div>
                  <div className="drawer__timeline-actor">{a.actor}</div>
                </div>
              ))}
            </>
          )}
          {tab === 'Chat' && (
            <p style={{ color: 'var(--fg-3)', fontSize: 12, lineHeight: 1.6 }}>
              Messages between dock operator, carrier dispatch, and customer appear here in production.
            </p>
          )}
          {tab === 'Documents' && (
            <ul style={{ margin: 0, padding: '0 0 0 18px', fontSize: 12, lineHeight: 2 }}>
              <li>BOL_{appointment.tripId}.pdf</li>
              <li>{appointment.po}.pdf</li>
              <li>Seal_Verification.jpg</li>
            </ul>
          )}
          {tab === 'Photos' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {['Trailer', 'Seal', 'Dock'].map((label) => (
                <div
                  key={label}
                  style={{
                    height: 72,
                    background: 'var(--bg-surface-2)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--fg-4)',
                    fontSize: 11,
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
          )}
          {tab === 'Checklist' && (
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {CHECKLIST.map((c) => (
                <li
                  key={c.item}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '9px 0',
                    borderBottom: '1px solid var(--border-1)',
                    fontSize: 12,
                  }}
                >
                  <span style={{ color: c.done ? 'var(--inbound)' : 'var(--fg-4)', fontWeight: 700 }}>
                    {c.done ? '✓' : '○'}
                  </span>
                  {c.item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </>
  )
}
