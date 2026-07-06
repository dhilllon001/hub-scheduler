# Hub Scheduler

Multi-sided dock appointment & yard management SaaS — a high-fidelity prototype for warehouses, carriers, and shippers.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and pick a portal from the hub.

## Portals

| Portal | URL | Description |
|--------|-----|-------------|
| **Portal Hub** | `/` | Landing page to choose role |
| **Dock Operations** | `/?view=company` | Schedule grid, requests inbox, yard, customers |
| **Carrier** | `/?view=carrier` | Book appointments + yard self check-in |
| **Customer** | `/?view=customer` | PO/appointment visibility for shippers |

### Dock Operations tabs

- `/?view=company&tab=schedule` — Door × time slot grid
- `/?view=company&tab=requests` — Pending carrier requests (approve/reject)
- `/?view=company&tab=yard` — Live yard with dwell times
- `/?view=company&tab=customers` — Shipper/consignee CRM

### Carrier tabs

- `/?view=carrier&carrierTab=book` — Multi-step booking wizard
- `/?view=carrier&carrierTab=yard` — Gate check-in (try `TRP-88450`)

## Stack

- React 19 + Vite
- React Router (URL-driven portal switching)
- CSS design tokens (Inter, tabular nums, dense ops UI)
- Client-side stores with mock data

## Design rules

- **Inbound** = green `#06C167` · **Outbound** = navy `#003087`
- Ivory canvas `#F5F0E6` · Outlook Fluent dock chrome
- Row hover tooltips via React portal (`useRowHover`)
