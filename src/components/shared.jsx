import { Search } from 'lucide-react'

export function PageHeader({ title, subtitle, meta, actions }) {
  return (
    <header className="page-header">
      <div className="page-header__main">
        <h1 className="page-header__title">{title}</h1>
        {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
        {meta && <p className="page-header__meta">{meta}</p>}
      </div>
      {actions && <div className="page-header__actions">{actions}</div>}
    </header>
  )
}

export function KpiStrip({ items, columns }) {
  return (
    <div className="kpi-strip" style={columns ? { gridTemplateColumns: `repeat(${columns}, 1fr)` } : undefined}>
      {items.map((item) => (
        <div key={item.label} className={`kpi-card${item.accent ? ` kpi-card--${item.accent}` : ''}`}>
          <div className="kpi-card__label">{item.label}</div>
          <div className="kpi-card__value">{item.value}</div>
          {item.sub && <div className="kpi-card__sub">{item.sub}</div>}
        </div>
      ))}
    </div>
  )
}

export function SearchInput({ value, onChange, placeholder = 'Search…' }) {
  return (
    <div className="sr-search">
      <Search size={14} className="sr-search__icon" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  )
}

export function StatusPill({ type, children }) {
  return <span className={`status-pill status-pill--${type}`}>{children}</span>
}

export function MoveTypePill({ moveType }) {
  const type = moveType === 'INBOUND' ? 'inbound' : 'outbound'
  return <StatusPill type={type}>{moveType === 'INBOUND' ? 'Inbound' : 'Outbound'}</StatusPill>
}

export function ApptTypePill({ apptType }) {
  const map = { LIVE: 'live', DROP: 'drop', BOBTAIL: 'bobtail' }
  return <StatusPill type={map[apptType] || 'waiting'}>{apptType}</StatusPill>
}

export function StatePill({ status }) {
  const map = {
    'Pending Approval': 'pending',
    Approved: 'approved',
    Scheduled: 'scheduled',
    'Checked-in': 'approved',
    'At Door': 'loading',
    Loading: 'loading',
    Unloading: 'loading',
    Unloading: 'loading',
    Released: 'released',
    Completed: 'completed',
    Rejected: 'rejected',
    Cancelled: 'cancelled',
    Waiting: 'waiting',
  }
  return <StatusPill type={map[status] || 'waiting'}>{status}</StatusPill>
}

export function Legend({ items }) {
  return (
    <div className="legend">
      {items.map((item) => (
        <span key={item.label} className="legend__item">
          <span className="legend__swatch" style={{ background: item.color }} />
          {item.label}
        </span>
      ))}
    </div>
  )
}
