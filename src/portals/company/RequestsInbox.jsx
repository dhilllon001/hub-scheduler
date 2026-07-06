import { useMemo, useState } from 'react'
import { Check, X } from 'lucide-react'
import {
  HoverPopoverGrid,
  HoverPopoverTitle,
  RowHoverPopover,
  useRowHover,
} from '../../components/RowHoverPopover'
import { SearchInput, MoveTypePill, ApptTypePill, StatePill } from '../../components/shared'
import { approveRequest, enrichRequest, rejectRequest, useAppStore } from '../../stores/appStore'
import { WAREHOUSES } from '../../data/mockData'

export default function RequestsInbox() {
  const { requests } = useAppStore()
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(false)
  const rowHover = useRowHover()

  const rows = useMemo(() => {
    return requests
      .filter((r) => showAll || r.status === 'Pending Approval')
      .map(enrichRequest)
      .filter((r) => {
        if (!search) return true
        const q = search.toLowerCase()
        return (
          r.id.toLowerCase().includes(q) ||
          r.tripId.toLowerCase().includes(q) ||
          r.po.toLowerCase().includes(q) ||
          r.carrier?.name.toLowerCase().includes(q)
        )
      })
      .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
  }, [requests, search, showAll])

  const pendingCount = requests.filter((r) => r.status === 'Pending Approval').length

  const handleApprove = (req) => {
    const door = WAREHOUSES[0].doors.find((d) => d.types.includes(req.apptType))
    approveRequest(req.id, door?.id)
  }

  return (
    <>
      <div className="filter-strip">
        <button
          type="button"
          className={`filter-chip${!showAll ? ' is-active' : ''}`}
          onClick={() => setShowAll(false)}
        >
          Pending ({pendingCount})
        </button>
        <button
          type="button"
          className={`filter-chip${showAll ? ' is-active' : ''}`}
          onClick={() => setShowAll(true)}
        >
          All requests
        </button>
      </div>

      <div className="sr-table-wrap sr-table-wrap--full">
        <div className="sr-table-panel__head">
          <div>
            <h2 className="sr-table-panel__title">Request inbox</h2>
            <div className="sr-table-panel__meta">
              {rows.length} {showAll ? 'total' : 'pending'} · carrier-submitted bookings
            </div>
          </div>
          <SearchInput value={search} onChange={setSearch} placeholder="Search requests…" />
        </div>
        <div className="sr-table-scroll">
          <table className="sr-table sr-table--compact">
            <thead>
              <tr>
                <th>Request</th>
                <th>Submitted</th>
                <th>Carrier</th>
                <th>Trip / PO</th>
                <th>Move</th>
                <th>Type</th>
                <th>Date / Slot</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((req) => (
                <tr
                  key={req.id}
                  className={`sr-table-row--hoverable${rowHover.isHovered(req.id) ? ' is-hovered' : ''}`}
                  {...rowHover.bind(req.id, req)}
                >
                  <td className="rep-name">{req.id}</td>
                  <td style={{ color: 'var(--fg-3)', fontSize: 11 }}>
                    {new Date(req.submittedAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                  </td>
                  <td>{req.carrier?.name}</td>
                  <td>
                    {req.tripId}
                    <br />
                    <span style={{ color: 'var(--fg-3)', fontSize: 10 }}>{req.po}</span>
                  </td>
                  <td><MoveTypePill moveType={req.moveType} /></td>
                  <td><ApptTypePill apptType={req.apptType} /></td>
                  <td>
                    {req.date}
                    <br />
                    <span style={{ color: 'var(--fg-3)', fontSize: 10 }}>{req.slot}</span>
                  </td>
                  <td>{req.customer?.name}</td>
                  <td><StatePill status={req.status} /></td>
                  <td>
                    {req.status === 'Pending Approval' && (
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button type="button" className="btn btn--success btn--sm" onClick={() => handleApprove(req)}>
                          <Check size={12} /> Approve
                        </button>
                        <button type="button" className="btn btn--danger btn--sm" onClick={() => rejectRequest(req.id)}>
                          <X size={12} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={10}>
                    <div className="empty-state">No requests match your filters</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <RowHoverPopover hover={rowHover.hover} width={340}>
        {rowHover.hover?.data && (
          <>
            <HoverPopoverTitle sub={rowHover.hover.data.tripId}>
              {rowHover.hover.data.carrier?.name}
            </HoverPopoverTitle>
            <HoverPopoverGrid
              rows={[
                ['Request', rowHover.hover.data.id],
                ['PO', rowHover.hover.data.po],
                ['Move', rowHover.hover.data.moveType],
                ['Type', rowHover.hover.data.apptType],
                ['Shipment', rowHover.hover.data.shipmentType],
                ['Driver', rowHover.hover.data.driver?.name],
                ['Phone', rowHover.hover.data.driver?.phone],
                ['Customer', rowHover.hover.data.customer?.name],
                ['Slot', `${rowHover.hover.data.date} ${rowHover.hover.data.slot}`],
              ]}
            />
          </>
        )}
      </RowHoverPopover>
    </>
  )
}
