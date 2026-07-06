import { useMemo } from 'react'
import { StatePill } from '../../components/shared'
import { enrichAppointment, useAppStore } from '../../stores/appStore'

const CUSTOMER_ID = 'CUS-001'

export default function TransactionsView() {
  const { appointments } = useAppStore()

  const rows = useMemo(() => {
    return appointments
      .filter((a) => a.customerId === CUSTOMER_ID)
      .filter((a) => ['Completed', 'Released'].includes(a.status))
      .map(enrichAppointment)
      .sort((a, b) => `${b.date}${b.slot}`.localeCompare(`${a.date}${a.slot}`))
  }, [appointments])

  return (
    <div className="sr-table-wrap sr-table-wrap--full">
      <div className="sr-table-panel__head">
        <div>
          <h2 className="sr-table-panel__title">Transaction history</h2>
          <div className="sr-table-panel__meta">{rows.length} completed freight movements</div>
        </div>
      </div>
      <div className="sr-table-scroll">
        <table className="sr-table sr-table--compact">
          <thead>
            <tr>
              <th>Date</th>
              <th>PO</th>
              <th>Trip</th>
              <th>Carrier</th>
              <th>Move</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((a) => (
              <tr key={a.id}>
                <td>{a.date}</td>
                <td className="rep-name">{a.po}</td>
                <td>{a.tripId}</td>
                <td>{a.carrier?.name}</td>
                <td>{a.moveType === 'INBOUND' ? 'Inbound' : 'Outbound'}</td>
                <td><StatePill status={a.status} /></td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6}>
                  <div className="empty-state">No completed transactions yet</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
