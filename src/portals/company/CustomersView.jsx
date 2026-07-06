import { useMemo, useState } from 'react'
import { SearchInput } from '../../components/shared'
import { useAppStore } from '../../stores/appStore'

export default function CustomersView() {
  const { customers } = useAppStore()
  const [search, setSearch] = useState('')

  const rows = useMemo(() => {
    if (!search) return customers
    const q = search.toLowerCase()
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.industry.toLowerCase().includes(q) ||
        c.contact.toLowerCase().includes(q) ||
        c.city?.toLowerCase().includes(q),
    )
  }, [customers, search])

  return (
    <div className="sr-table-wrap sr-table-wrap--full">
      <div className="sr-table-panel__head">
        <div>
          <h2 className="sr-table-panel__title">Shipper &amp; consignee directory</h2>
          <div className="sr-table-panel__meta">{rows.length} customers · freight owners</div>
        </div>
        <SearchInput value={search} onChange={setSearch} placeholder="Search customers…" />
      </div>
      <div className="sr-table-scroll">
        <table className="sr-table sr-table--compact">
          <thead>
            <tr>
              <th>ID</th>
              <th>Company</th>
              <th>Industry</th>
              <th>Location</th>
              <th>Contact</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id}>
                <td style={{ color: 'var(--fg-3)', fontFamily: 'inherit' }}>{c.id}</td>
                <td className="rep-name">{c.name}</td>
                <td>{c.industry}</td>
                <td>{c.city}</td>
                <td>{c.contact}</td>
                <td>{c.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
