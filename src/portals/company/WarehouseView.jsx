import { WAREHOUSES } from '../../data/mockData'

export default function WarehouseView() {
  const warehouse = WAREHOUSES[0]

  return (
    <div className="sr-table-wrap sr-table-wrap--full">
      <div className="sr-table-panel__head">
        <div>
          <h2 className="sr-table-panel__title">Warehouse configuration</h2>
          <div className="sr-table-panel__meta">
            {warehouse.code} · {warehouse.doors.length} doors · {warehouse.hours.open}–{warehouse.hours.close}
          </div>
        </div>
      </div>
      <div style={{ padding: 16 }}>
        <dl className="sr-hover-popover__grid" style={{ marginBottom: 20, maxWidth: 480 }}>
          {[
            ['Site', warehouse.name],
            ['Code', warehouse.code],
            ['Address', warehouse.address],
            ['Timezone', warehouse.timezone],
            ['Slot duration', `${warehouse.slotDuration} min`],
            ['Hours', `${warehouse.hours.open} – ${warehouse.hours.close}`],
          ].map(([label, value]) => (
            <div key={label} style={{ display: 'contents' }}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="sr-table-scroll">
        <table className="sr-table sr-table--compact">
          <thead>
            <tr>
              <th>Door</th>
              <th>ID</th>
              <th>Allowed types</th>
            </tr>
          </thead>
          <tbody>
            {warehouse.doors.map((door) => (
              <tr key={door.id}>
                <td className="rep-name">{door.name}</td>
                <td style={{ color: 'var(--fg-3)' }}>{door.id}</td>
                <td>{door.types.join(' · ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
