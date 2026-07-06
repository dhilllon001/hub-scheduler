import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { TODAY, TIME_SLOTS } from '../../data/mockData'
import { addRequest } from '../../stores/appStore'
import { PageHeader } from '../../components/shared'

const STEPS = ['Move Type', 'Shipment', 'Appt Type', 'Date & Time', 'Details', 'Confirm']
const MOVE_TYPES = [
  { id: 'INBOUND', label: 'Inbound', sub: 'Delivering freight to dock' },
  { id: 'OUTBOUND', label: 'Outbound', sub: 'Picking up freight' },
]
const SHIPMENT_TYPES = [
  { id: 'FTL', label: 'FTL', sub: 'Full truckload' },
  { id: 'LTL', label: 'LTL', sub: 'Less than truckload' },
  { id: 'PARCEL', label: 'Parcel', sub: 'Small package freight' },
]
const APPT_TYPES = [
  { id: 'LIVE', label: 'Live', sub: 'Driver waits at dock' },
  { id: 'DROP', label: 'Drop', sub: 'Leave trailer' },
  { id: 'BOBTAIL', label: 'Bobtail', sub: 'Tractor only' },
]

const INITIAL = {
  moveType: '',
  shipmentType: '',
  apptType: '',
  date: TODAY,
  slot: '',
  tripId: 'TRP-88600',
  po: '',
  driverName: '',
  driverPhone: '',
}

export default function BookAppointment() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(INITIAL)
  const [submitted, setSubmitted] = useState(null)

  const update = (patch) => setForm((f) => ({ ...f, ...patch }))
  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1))
  const back = () => setStep((s) => Math.max(s - 1, 0))

  const handleSubmit = () => {
    const id = addRequest({
      moveType: form.moveType,
      shipmentType: form.shipmentType,
      apptType: form.apptType,
      date: form.date,
      slot: form.slot,
      tripId: form.tripId,
      po: form.po,
      carrierId: 'CAR-004',
      customerId: 'CUS-001',
      driver: { name: form.driverName, phone: form.driverPhone },
    })
    setSubmitted(id)
  }

  if (submitted) {
    return (
      <div className="form-card form-card--centered" style={{ maxWidth: 440 }}>
        <div className="success-panel">
          <CheckCircle size={44} className="success-panel__icon" />
          <h2 className="success-panel__title">Request submitted</h2>
          <p className="success-panel__text">
            Reference <strong>{submitted}</strong> — pending dock approval. You will receive confirmation once scheduled.
          </p>
          <button type="button" className="btn btn--primary" onClick={() => navigate('/?view=carrier&carrierTab=yard')}>
            Go to yard check-in
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 680, margin: '0 auto' }}>
      <PageHeader
        title="Book dock appointment"
        subtitle={`Trip ${form.tripId} · Charger Logistics · ${STEPS[step]}`}
      />

      <div className="form-card">
        <div className="wizard-steps">
          {STEPS.map((label, i) => (
            <div
              key={label}
              className={`wizard-step${i <= step ? ' is-active' : ''}${i < step ? ' is-done' : ''}`}
              title={label}
            />
          ))}
        </div>

        {step === 0 && (
          <div className="form-section">
            <h3 className="form-section__title">Select move type</h3>
            <div className="option-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              {MOVE_TYPES.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className={`option-card${form.moveType === m.id ? ' is-selected' : ''}`}
                  onClick={() => { update({ moveType: m.id }); next() }}
                >
                  <div className="option-card__label">{m.label}</div>
                  <div className="option-card__sub">{m.sub}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="form-section">
            <h3 className="form-section__title">Shipment type</h3>
            <div className="option-grid">
              {SHIPMENT_TYPES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={`option-card${form.shipmentType === s.id ? ' is-selected' : ''}`}
                  onClick={() => { update({ shipmentType: s.id }); next() }}
                >
                  <div className="option-card__label">{s.label}</div>
                  <div className="option-card__sub">{s.sub}</div>
                </button>
              ))}
            </div>
            <button type="button" className="btn btn--ghost btn--sm" style={{ marginTop: 12 }} onClick={back}>Back</button>
          </div>
        )}

        {step === 2 && (
          <div className="form-section">
            <h3 className="form-section__title">Appointment type</h3>
            <div className="option-grid">
              {APPT_TYPES.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  className={`option-card${form.apptType === a.id ? ' is-selected' : ''}`}
                  onClick={() => { update({ apptType: a.id }); next() }}
                >
                  <div className="option-card__label">{a.label}</div>
                  <div className="option-card__sub">{a.sub}</div>
                </button>
              ))}
            </div>
            <button type="button" className="btn btn--ghost btn--sm" style={{ marginTop: 12 }} onClick={back}>Back</button>
          </div>
        )}

        {step === 3 && (
          <div className="form-section">
            <h3 className="form-section__title">Date &amp; time slot</h3>
            <div className="form-row">
              <div className="form-field">
                <label>Date</label>
                <input type="date" value={form.date} onChange={(e) => update({ date: e.target.value })} />
              </div>
            </div>
            <div className="option-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              {TIME_SLOTS.filter((_, i) => i >= 4 && i <= 15).map((slot) => (
                <button
                  key={slot}
                  type="button"
                  className={`option-card${form.slot === slot ? ' is-selected' : ''}`}
                  onClick={() => update({ slot })}
                  style={{ padding: '10px 6px' }}
                >
                  <div className="option-card__label">{slot}</div>
                </button>
              ))}
            </div>
            <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
              <button type="button" className="btn btn--secondary" onClick={back}>Back</button>
              <button type="button" className="btn btn--primary" onClick={next} disabled={!form.slot}>Continue</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="form-section">
            <h3 className="form-section__title">Carrier &amp; driver details</h3>
            <div className="form-row">
              <div className="form-field">
                <label>Trip ID</label>
                <input value={form.tripId} onChange={(e) => update({ tripId: e.target.value })} />
              </div>
              <div className="form-field">
                <label>PO Number</label>
                <input value={form.po} onChange={(e) => update({ po: e.target.value })} placeholder="PO-1234567" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label>Driver Name</label>
                <input value={form.driverName} onChange={(e) => update({ driverName: e.target.value })} />
              </div>
              <div className="form-field">
                <label>Driver Phone</label>
                <input value={form.driverPhone} onChange={(e) => update({ driverPhone: e.target.value })} placeholder="(313) 555-0100" />
              </div>
            </div>
            <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
              <button type="button" className="btn btn--secondary" onClick={back}>Back</button>
              <button type="button" className="btn btn--primary" onClick={next}>Review</button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="form-section">
            <h3 className="form-section__title">Confirm request</h3>
            <dl className="sr-hover-popover__grid" style={{ marginBottom: 20 }}>
              {[
                ['Move', form.moveType],
                ['Shipment', form.shipmentType],
                ['Type', form.apptType],
                ['Date', form.date],
                ['Slot', form.slot],
                ['Trip', form.tripId],
                ['PO', form.po || '—'],
                ['Driver', form.driverName || '—'],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'contents' }}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" className="btn btn--secondary" onClick={back}>Back</button>
              <button type="button" className="btn btn--primary" onClick={handleSubmit}>Submit request</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
