import { useMemo, useState } from 'react'
import { Calendar } from 'lucide-react'
import { TODAY, TIME_SLOTS, WAREHOUSES } from '../../data/mockData'
import { useAppStore, enrichAppointment, getScheduleKpis } from '../../stores/appStore'
import { KpiStrip, Legend } from '../../components/shared'
import AppointmentDetail from './AppointmentDetail'

const warehouse = WAREHOUSES[0]

export default function ScheduleGrid() {
  const { appointments } = useAppStore()
  const [selected, setSelected] = useState(null)
  const kpis = getScheduleKpis()

  const todayAppts = useMemo(
    () => appointments.filter((a) => a.date === TODAY && a.warehouseId === warehouse.id),
    [appointments],
  )

  const grid = useMemo(() => {
    const map = {}
    todayAppts.forEach((a) => {
      map[`${a.doorId}|${a.slot}`] = enrichAppointment(a)
    })
    return map
  }, [todayAppts])

  const totalSlots = warehouse.doors.length * TIME_SLOTS.length

  return (
    <>
      <KpiStrip
        columns={5}
        items={[
          { label: 'Booked Today', value: todayAppts.length, sub: `${kpis.utilization}% utilization`, accent: 'action' },
          { label: 'Inbound', value: kpis.inbound, accent: 'inbound' },
          { label: 'Outbound', value: kpis.outbound, accent: 'outbound' },
          { label: 'Completed', value: kpis.completed, sub: 'released or done' },
          { label: 'Open Slots', value: totalSlots - todayAppts.length, sub: `${totalSlots} total capacity` },
        ]}
      />

      <div className="schedule-grid-wrap">
        <div className="schedule-grid__toolbar">
          <div>
            <h2 className="schedule-grid__title">Time-slot grid</h2>
            <div className="schedule-grid__meta">
              <Calendar size={12} />
              {TODAY} · {warehouse.doors.length} doors · 60-min slots
            </div>
          </div>
          <Legend
            items={[
              { color: 'var(--inbound)', label: 'Inbound' },
              { color: 'var(--navy)', label: 'Outbound' },
            ]}
          />
        </div>
        <div className="schedule-grid">
          <table>
            <thead>
              <tr>
                <th className="door-col">Door</th>
                {TIME_SLOTS.map((slot) => (
                  <th key={slot}>{slot}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {warehouse.doors.map((door) => (
                <tr key={door.id}>
                  <td className="door-col">{door.name}</td>
                  {TIME_SLOTS.map((slot) => {
                    const apt = grid[`${door.id}|${slot}`]
                    const moveClass = apt
                      ? apt.moveType === 'INBOUND'
                        ? 'schedule-slot--inbound'
                        : 'schedule-slot--outbound'
                      : 'schedule-slot--empty'
                    const doneClass =
                      apt?.status === 'Completed' || apt?.status === 'Released'
                        ? ' schedule-slot--completed'
                        : ''
                    return (
                      <td key={slot}>
                        {apt ? (
                          <div
                            className={`schedule-slot ${moveClass}${doneClass}`}
                            onClick={() => setSelected(apt)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && setSelected(apt)}
                          >
                            <div className="schedule-slot__carrier">{apt.carrier?.name}</div>
                            <div className="schedule-slot__meta">
                              {apt.apptType} · {apt.tripId}
                            </div>
                          </div>
                        ) : (
                          <div className="schedule-slot schedule-slot--empty" />
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && <AppointmentDetail appointment={selected} onClose={() => setSelected(null)} />}
    </>
  )
}
