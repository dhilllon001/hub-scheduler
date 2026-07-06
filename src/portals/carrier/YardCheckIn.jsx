import { useState } from 'react'
import { CheckCircle, MapPin } from 'lucide-react'
import { useAppStore } from '../../stores/appStore'
import { WAREHOUSES } from '../../data/mockData'
import { PageHeader } from '../../components/shared'

export default function YardCheckIn() {
  const { appointments } = useAppStore()
  const [tripId, setTripId] = useState('')
  const [trailer, setTrailer] = useState('')
  const [seal, setSeal] = useState('')
  const [confirmed, setConfirmed] = useState(null)

  const apt = appointments.find(
    (a) =>
      (a.tripId.toLowerCase() === tripId.toLowerCase() ||
        a.id.toLowerCase() === tripId.toLowerCase()) &&
      (a.status === 'Scheduled' || a.status === 'At Door'),
  )

  const handleCheckIn = (e) => {
    e.preventDefault()
    if (!apt) return
    setConfirmed({
      tripId: apt.tripId,
      door: apt.doorId,
      driver: apt.driver?.name,
      slot: apt.slot,
    })
  }

  if (confirmed) {
    return (
      <div className="form-card form-card--centered" style={{ maxWidth: 440 }}>
        <div className="success-panel">
          <CheckCircle size={44} className="success-panel__icon" />
          <h2 className="success-panel__title">Checked in</h2>
          <p className="success-panel__text">
            Proceed to <strong>{confirmed.door}</strong> · slot {confirmed.slot}
          </p>
          <div
            style={{
              padding: '14px 16px',
              background: 'var(--bg-surface-2)',
              borderRadius: 'var(--radius-md)',
              textAlign: 'left',
              fontSize: 12,
              lineHeight: 1.8,
            }}
          >
            <div><strong>Trip:</strong> {confirmed.tripId}</div>
            <div><strong>Driver:</strong> {confirmed.driver}</div>
            <div><strong>Trailer:</strong> {trailer}</div>
            <div><strong>Seal:</strong> {seal}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 480, margin: '0 auto' }}>
      <PageHeader
        title="Yard check-in"
        subtitle={`${WAREHOUSES[0].name} · Gate 2 self-service`}
      />

      <div className="form-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid var(--border-1)' }}>
          <MapPin size={18} color="var(--action)" />
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg-1)' }}>Driver arrival</div>
            <div style={{ fontSize: 11, color: 'var(--fg-3)' }}>Confirm trailer and seal before entering yard</div>
          </div>
        </div>

        <form onSubmit={handleCheckIn}>
          <div className="form-field" style={{ marginBottom: 12 }}>
            <label>Trip or appointment ID</label>
            <input
              value={tripId}
              onChange={(e) => setTripId(e.target.value)}
              placeholder="TRP-88450 or APT-10049"
              required
            />
          </div>
          <div className="form-row">
            <div className="form-field">
              <label>Trailer #</label>
              <input value={trailer} onChange={(e) => setTrailer(e.target.value)} placeholder="TRL-12345" required />
            </div>
            <div className="form-field">
              <label>Seal #</label>
              <input value={seal} onChange={(e) => setSeal(e.target.value)} placeholder="SL-123456" required />
            </div>
          </div>

          {tripId && (
            <div className={`form-alert${apt ? ' form-alert--success' : ' form-alert--error'}`}>
              {apt ? (
                <>Appointment <strong>{apt.id}</strong> · {apt.slot} · Door {apt.doorId} · {apt.moveType}</>
              ) : (
                <>No scheduled appointment found for this ID</>
              )}
            </div>
          )}

          <button type="submit" className="btn btn--primary" disabled={!apt || !trailer || !seal} style={{ width: '100%' }}>
            Confirm check-in
          </button>
        </form>

        <p style={{ marginTop: 18, fontSize: 11, color: 'var(--fg-3)', textAlign: 'center' }}>
          Try <code style={{ color: 'var(--fg-2)' }}>TRP-88450</code> or <code style={{ color: 'var(--fg-2)' }}>APT-10049</code>
        </p>
      </div>
    </div>
  )
}
