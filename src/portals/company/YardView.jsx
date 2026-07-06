import { useMemo, useState } from 'react'
import {
  HoverPopoverGrid,
  HoverPopoverTitle,
  RowHoverPopover,
  useRowHover,
} from '../../components/RowHoverPopover'
import { KpiStrip, SearchInput, StatePill } from '../../components/shared'
import { formatDwell, getCarrier, getDoor, WAREHOUSES } from '../../data/mockData'
import { getYardKpis, releaseCheckin, useAppStore } from '../../stores/appStore'

export default function YardView() {
  const { checkins } = useAppStore()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const rowHover = useRowHover()
  const kpis = getYardKpis()

  const rows = useMemo(() => {
    return checkins
      .map((c) => ({
        ...c,
        carrier: getCarrier(c.carrierId),
        door: c.doorId ? getDoor('WH-001', c.doorId) : null,
      }))
      .filter((c) => !statusFilter || c.status === statusFilter)
      .filter((c) => {
        if (!search) return true
        const q = search.toLowerCase()
        return (
          c.driverName.toLowerCase().includes(q) ||
          c.carrier?.name.toLowerCase().includes(q) ||
          c.trailer?.toLowerCase().includes(q)
        )
      })
      .sort((a, b) => b.dwellMinutes - a.dwellMinutes)
  }, [checkins, search, statusFilter])

  return (
    <>
      <KpiStrip
        items={[
          { label: 'In Yard', value: kpis.total, sub: 'active check-ins', accent: 'action' },
          { label: 'Waiting', value: kpis.waiting, sub: 'no door assigned', accent: 'warning' },
          { label: 'At Door', value: kpis.atDoor, sub: 'loading / unloading' },
          { label: 'Avg Dwell', value: formatDwell(kpis.avgDwell), sub: 'per truck' },
        ]}
      />

      <div className="filter-strip">
        {['', 'Waiting', 'At Door', 'Loading', 'Unloading', 'Released'].map((s) => (
          <button
            key={s || 'all'}
            type="button"
            className={`filter-chip${statusFilter === s ? ' is-active' : ''}`}
            onClick={() => setStatusFilter(s)}
          >
            {s || 'All statuses'}
          </button>
        ))}
      </div>

      <div className="sr-table-wrap sr-table-wrap--full">
        <div className="sr-table-panel__head">
          <div>
            <h2 className="sr-table-panel__title">Live yard</h2>
            <div className="sr-table-panel__meta">
              {rows.length} check-ins · {WAREHOUSES[0].name}
            </div>
          </div>
          <SearchInput value={search} onChange={setSearch} placeholder="Search yard…" />
        </div>
        <div className="sr-table-scroll">
          <table className="sr-table sr-table--compact">
            <thead>
              <tr>
                <th>Driver</th>
                <th>Carrier</th>
                <th>Door</th>
                <th>Trailer</th>
                <th>Seal</th>
                <th className="num">Dwell</th>
                <th>Checked In</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr
                  key={c.id}
                  className={`sr-table-row--hoverable${rowHover.isHovered(c.id) ? ' is-hovered' : ''}`}
                  {...rowHover.bind(c.id, c)}
                >
                  <td className="rep-name">{c.driverName}</td>
                  <td>{c.carrier?.name}</td>
                  <td>{c.door?.name || '—'}</td>
                  <td>{c.trailer || '—'}</td>
                  <td>{c.seal || '—'}</td>
                  <td className="num">{formatDwell(c.dwellMinutes)}</td>
                  <td style={{ color: 'var(--fg-3)', fontSize: 11 }}>
                    {new Date(c.checkedInAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                  </td>
                  <td><StatePill status={c.status} /></td>
                  <td>
                    {!c.released && c.status !== 'Waiting' && (
                      <button type="button" className="btn btn--secondary btn--sm" onClick={() => releaseCheckin(c.id)}>
                        Release
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <RowHoverPopover hover={rowHover.hover} width={320}>
        {rowHover.hover?.data && (
          <>
            <HoverPopoverTitle sub={rowHover.hover.data.carrier?.name}>
              {rowHover.hover.data.driverName}
            </HoverPopoverTitle>
            <HoverPopoverGrid
              rows={[
                ['Check-in', rowHover.hover.data.id],
                ['Door', rowHover.hover.data.door?.name || 'Unassigned'],
                ['Trailer', rowHover.hover.data.trailer],
                ['Seal', rowHover.hover.data.seal],
                ['Dwell', formatDwell(rowHover.hover.data.dwellMinutes)],
                ['Status', rowHover.hover.data.status],
                ['Checked In', new Date(rowHover.hover.data.checkedInAt).toLocaleTimeString()],
              ]}
            />
          </>
        )}
      </RowHoverPopover>
    </>
  )
}
