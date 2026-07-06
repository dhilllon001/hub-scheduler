import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BarChart3,
  ClipboardList,
  Home,
  LayoutDashboard,
  Receipt,
  User,
} from 'lucide-react'
import {
  HoverPopoverGrid,
  HoverPopoverTitle,
  RowHoverPopover,
  useRowHover,
} from '../../components/RowHoverPopover'
import { PageHeader, KpiStrip, SearchInput, MoveTypePill, ApptTypePill, StatePill } from '../../components/shared'
import { enrichAppointment, getScheduleKpis, useAppStore } from '../../stores/appStore'
import { CUSTOMERS, TODAY } from '../../data/mockData'
import { useQueryParam } from '../../hooks/useQueryParam'
import TransactionsView from './TransactionsView'

const CUSTOMER_ID = 'CUS-001'
const customer = CUSTOMERS.find((c) => c.id === CUSTOMER_ID)

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'appointments', label: 'Appointments', icon: ClipboardList },
  { id: 'transactions', label: 'Transactions', icon: Receipt },
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'profile', label: 'Profile', icon: User },
]

function AppointmentsTable({ customerAppts, kpis, search, onSearchChange, moveFilter, onMoveFilterChange, rowHover }) {
  return (
    <>
      <KpiStrip
        items={[
          { label: 'Active POs', value: customerAppts.filter((a) => a.date >= TODAY && !['Completed', 'Released'].includes(a.status)).length, sub: 'in progress', accent: 'action' },
          { label: 'Inbound', value: customerAppts.filter((a) => a.moveType === 'INBOUND').length, accent: 'inbound' },
          { label: 'Outbound', value: customerAppts.filter((a) => a.moveType === 'OUTBOUND').length, accent: 'outbound' },
          { label: 'On Time', value: '94%', sub: 'last 30 days' },
        ]}
      />

      <div className="filter-strip">
        {['', 'INBOUND', 'OUTBOUND'].map((f) => (
          <button
            key={f || 'all'}
            type="button"
            className={`filter-chip${moveFilter === f ? ' is-active' : ''}`}
            onClick={() => onMoveFilterChange(f)}
          >
            {f === '' ? 'All moves' : f === 'INBOUND' ? 'Inbound' : 'Outbound'}
          </button>
        ))}
      </div>

      {moveFilter && (
        <div className="filter-applied">
          FILTERED
          <span className="filter-applied__pill">
            Move: {moveFilter}
            <button type="button" onClick={() => onMoveFilterChange('')}>×</button>
          </span>
          <button type="button" className="btn btn--secondary btn--sm" onClick={() => onMoveFilterChange('')}>
            Clear all
          </button>
        </div>
      )}

      <div className="sr-table-wrap sr-table-wrap--full">
        <div className="sr-table-panel__head">
          <div>
            <h2 className="sr-table-panel__title">Appointment history</h2>
            <div className="sr-table-panel__meta">
              {customerAppts.length} records · {kpis.total} facility-wide today
            </div>
          </div>
          <SearchInput value={search} onChange={onSearchChange} placeholder="Search PO, trip…" />
        </div>
        <div className="sr-table-scroll">
          <table className="sr-table sr-table--compact">
            <thead>
              <tr>
                <th>Appointment</th>
                <th>PO</th>
                <th>Carrier</th>
                <th>Move</th>
                <th>Type</th>
                <th>Slot</th>
                <th>Door</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {customerAppts.map((a) => (
                <tr
                  key={a.id}
                  className={`sr-table-row--hoverable${rowHover.isHovered(a.id) ? ' is-hovered' : ''}`}
                  {...rowHover.bind(a.id, a)}
                >
                  <td className="rep-name">{a.id}</td>
                  <td>{a.po}</td>
                  <td>{a.carrier?.name}</td>
                  <td><MoveTypePill moveType={a.moveType} /></td>
                  <td><ApptTypePill apptType={a.apptType} /></td>
                  <td>
                    {a.date}
                    <br />
                    <span style={{ color: 'var(--fg-3)', fontSize: 10 }}>{a.slot}</span>
                  </td>
                  <td>{a.doorId}</td>
                  <td><StatePill status={a.status} /></td>
                </tr>
              ))}
              {customerAppts.length === 0 && (
                <tr>
                  <td colSpan={8}>
                    <div className="empty-state">No appointments match your filters</div>
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
            <HoverPopoverTitle sub={rowHover.hover.data.po}>
              {rowHover.hover.data.tripId}
            </HoverPopoverTitle>
            <HoverPopoverGrid
              rows={[
                ['Appointment', rowHover.hover.data.id],
                ['Carrier', rowHover.hover.data.carrier?.name],
                ['Driver', rowHover.hover.data.driver?.name],
                ['Move', rowHover.hover.data.moveType],
                ['Type', rowHover.hover.data.apptType],
                ['Door', rowHover.hover.data.doorId],
                ['Slot', `${rowHover.hover.data.date} ${rowHover.hover.data.slot}`],
                ['Status', rowHover.hover.data.status],
                ['Trailer', rowHover.hover.data.trailer || '—'],
              ]}
            />
          </>
        )}
      </RowHoverPopover>
    </>
  )
}

export default function CustomerPortal() {
  const [tab, setTab] = useQueryParam('tab', 'dashboard')
  const navigate = useNavigate()
  const { appointments } = useAppStore()
  const [search, setSearch] = useState('')
  const [moveFilter, setMoveFilter] = useState('')
  const rowHover = useRowHover()
  const kpis = getScheduleKpis()

  const customerAppts = useMemo(() => {
    return appointments
      .filter((a) => a.customerId === CUSTOMER_ID)
      .map(enrichAppointment)
      .filter((a) => {
        if (moveFilter && a.moveType !== moveFilter) return false
        if (!search) return true
        const q = search.toLowerCase()
        return (
          a.id.toLowerCase().includes(q) ||
          a.tripId.toLowerCase().includes(q) ||
          a.po.toLowerCase().includes(q) ||
          a.carrier?.name.toLowerCase().includes(q)
        )
      })
      .sort((a, b) => `${b.date}${b.slot}`.localeCompare(`${a.date}${a.slot}`))
  }, [appointments, search, moveFilter])

  const activeCount = customerAppts.filter(
    (a) => a.date >= TODAY && !['Completed', 'Released'].includes(a.status),
  ).length

  const titles = {
    dashboard: 'Dashboard',
    appointments: 'My appointments',
    transactions: 'Transactions',
    overview: 'Freight overview',
    profile: 'Company profile',
  }

  return (
    <div className="portal-shell">
      <header className="portal-shell__header portal-shell__header--navy">
        <div className="portal-shell__brand">
          <div className="portal-shell__brand-mark">HS</div>
          <span>{customer?.name}</span>
        </div>
        <button type="button" className="btn btn--on-dark btn--sm" onClick={() => navigate('/')}>
          <Home size={13} /> Hub
        </button>
      </header>
      <div className="portal-shell__body">
        <nav className="portal-sidebar">
          {NAV.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                type="button"
                className={`portal-sidebar__link${tab === item.id ? ' is-active' : ''}`}
                onClick={() => setTab(item.id)}
              >
                <Icon size={15} />
                {item.label}
              </button>
            )
          })}
        </nav>
        <main className="portal-main">
          <PageHeader
            title={titles[tab] || titles.dashboard}
            subtitle={`${customerAppts.length} total · ${activeCount} active`}
            meta={customer?.city}
          />

          {(tab === 'dashboard' || tab === 'appointments') && (
            <AppointmentsTable
              customerAppts={customerAppts}
              kpis={kpis}
              search={search}
              onSearchChange={setSearch}
              moveFilter={moveFilter}
              onMoveFilterChange={setMoveFilter}
              rowHover={rowHover}
            />
          )}

          {tab === 'transactions' && <TransactionsView />}

          {tab === 'overview' && (
            <KpiStrip
              items={[
                { label: 'Your Appointments', value: customerAppts.length },
                { label: 'Inbound Volume', value: customerAppts.filter((a) => a.moveType === 'INBOUND').length, accent: 'inbound' },
                { label: 'Outbound Volume', value: customerAppts.filter((a) => a.moveType === 'OUTBOUND').length, accent: 'outbound' },
                { label: 'Dock Utilization', value: `${kpis.utilization}%`, accent: 'action' },
              ]}
            />
          )}

          {tab === 'profile' && (
            <div className="form-card" style={{ maxWidth: 480 }}>
              <dl className="sr-hover-popover__grid">
                {[
                  ['Company', customer?.name],
                  ['ID', CUSTOMER_ID],
                  ['Industry', customer?.industry],
                  ['Location', customer?.city],
                  ['Contact', customer?.contact],
                  ['Email', customer?.email],
                  ['Primary Site', 'Detroit Distribution Center'],
                ].map(([label, value]) => (
                  <div key={label} style={{ display: 'contents' }}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
