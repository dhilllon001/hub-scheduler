const today = new Date()

export function fmtDate(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function dayOffset(n) {
  const d = new Date(today)
  d.setDate(d.getDate() + n)
  return fmtDate(d)
}

export const TODAY = fmtDate(today)
export const TOMORROW = dayOffset(1)

export const WAREHOUSES = [
  {
    id: 'WH-001',
    name: 'Detroit Distribution Center',
    code: 'DTW-DC1',
    address: '1200 Industrial Blvd, Detroit, MI 48201',
    timezone: 'America/Detroit',
    doors: [
      { id: 'D-01', name: 'Door 1', types: ['LIVE', 'DROP'] },
      { id: 'D-02', name: 'Door 2', types: ['LIVE', 'DROP', 'BOBTAIL'] },
      { id: 'D-03', name: 'Door 3', types: ['LIVE'] },
      { id: 'D-04', name: 'Door 4', types: ['DROP'] },
      { id: 'D-05', name: 'Door 5', types: ['LIVE', 'DROP'] },
      { id: 'D-06', name: 'Door 6', types: ['BOBTAIL', 'LIVE'] },
      { id: 'D-07', name: 'Door 7', types: ['LIVE', 'DROP'] },
      { id: 'D-08', name: 'Door 8', types: ['DROP', 'BOBTAIL'] },
    ],
    hours: { open: '06:00', close: '22:00' },
    slotDuration: 60,
  },
  {
    id: 'WH-002',
    name: 'Chicago Cross-Dock Hub',
    code: 'ORD-XD',
    address: '4500 Logistics Way, Joliet, IL 60431',
    timezone: 'America/Chicago',
    doors: [
      { id: 'C-01', name: 'Bay A1', types: ['LIVE', 'DROP'] },
      { id: 'C-02', name: 'Bay A2', types: ['LIVE'] },
      { id: 'C-03', name: 'Bay B1', types: ['DROP'] },
      { id: 'C-04', name: 'Bay B2', types: ['LIVE', 'BOBTAIL'] },
    ],
    hours: { open: '05:00', close: '23:00' },
    slotDuration: 60,
  },
]

export const CARRIERS = [
  { id: 'CAR-001', name: 'Atlas Freight Lines', mc: 'MC-482910', dot: 'DOT-2910847', rating: 4.8 },
  { id: 'CAR-002', name: 'Midwest Haulers Inc', mc: 'MC-773421', dot: 'DOT-1847293', rating: 4.6 },
  { id: 'CAR-003', name: 'Great Lakes Transport', mc: 'MC-551203', dot: 'DOT-3391028', rating: 4.9 },
  { id: 'CAR-004', name: 'Charger Logistics', mc: 'MC-902184', dot: 'DOT-4102938', rating: 4.7 },
  { id: 'CAR-005', name: 'Northern Star Trucking', mc: 'MC-331902', dot: 'DOT-5529103', rating: 4.5 },
  { id: 'CAR-006', name: 'Express Lane Carriers', mc: 'MC-661204', dot: 'DOT-8821044', rating: 4.4 },
]

export const CUSTOMERS = [
  { id: 'CUS-001', name: 'AutoParts Direct', industry: 'Automotive', contact: 'Sarah Chen', email: 'sarah@autoparts.com', city: 'Detroit, MI' },
  { id: 'CUS-002', name: 'FreshMart Grocers', industry: 'Retail / Grocery', contact: 'Mike Torres', email: 'mike@freshmart.com', city: 'Ann Arbor, MI' },
  { id: 'CUS-003', name: 'SteelWorks Manufacturing', industry: 'Industrial', contact: 'Lisa Park', email: 'lpark@steelworks.com', city: 'Dearborn, MI' },
  { id: 'CUS-004', name: 'TechSupply Co', industry: 'Electronics', contact: 'James Wu', email: 'jw@techsupply.com', city: 'Southfield, MI' },
  { id: 'CUS-005', name: 'HomeStyle Retail', industry: 'Retail', contact: 'Emma Brooks', email: 'emma@homestyle.com', city: 'Troy, MI' },
  { id: 'CUS-006', name: 'MediCore Pharmaceuticals', industry: 'Healthcare', contact: 'Dr. Alan Reed', email: 'areed@medicore.com', city: 'Livonia, MI' },
  { id: 'CUS-007', name: 'BuildRight Materials', industry: 'Construction', contact: 'Tom Navarro', email: 't.navarro@buildright.com', city: 'Warren, MI' },
  { id: 'CUS-008', name: 'Pacific Foods Distribution', industry: 'Food & Beverage', contact: 'Yuki Tanaka', email: 'y.tanaka@pacificfoods.com', city: 'Novi, MI' },
]

const SLOTS = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
]

export const TIME_SLOTS = SLOTS

const DRIVERS = [
  { name: 'Marcus Johnson', phone: '(313) 555-0142', cdl: 'CDL-A' },
  { name: 'Diana Reyes', phone: '(248) 555-0198', cdl: 'CDL-A' },
  { name: 'Robert Kim', phone: '(734) 555-0231', cdl: 'CDL-A' },
  { name: 'Angela Foster', phone: '(586) 555-0177', cdl: 'CDL-A' },
  { name: 'Carlos Mendez', phone: '(313) 555-0289', cdl: 'CDL-A' },
  { name: 'Terry Walsh', phone: '(248) 555-0312', cdl: 'CDL-A' },
  { name: 'Nina Patel', phone: '(734) 555-0345', cdl: 'CDL-A' },
  { name: "Kevin O'Brien", phone: '(586) 555-0367', cdl: 'CDL-A' },
  { name: 'Samuel Grant', phone: '(313) 555-0412', cdl: 'CDL-A' },
  { name: 'Helen Cruz', phone: '(734) 555-0456', cdl: 'CDL-A' },
  { name: 'Frank Deluca', phone: '(248) 555-0489', cdl: 'CDL-A' },
  { name: 'Rachel Stone', phone: '(313) 555-0523', cdl: 'CDL-A' },
  { name: 'Victor Hayes', phone: '(734) 555-0567', cdl: 'CDL-A' },
  { name: 'Amanda Liu', phone: '(586) 555-0601', cdl: 'CDL-A' },
]

function apt(id, door, slot, move, type, status, trip, po, carrier, customer, driverIdx, trailer, notes = '') {
  return {
    id,
    warehouseId: 'WH-001',
    doorId: door,
    date: TODAY,
    slot,
    moveType: move,
    apptType: type,
    scheduleType: 'APPT',
    status,
    tripId: trip,
    po,
    carrierId: carrier,
    customerId: customer,
    driver: DRIVERS[driverIdx],
    trailer: trailer || `TRL-${88000 + id.slice(-2)}`,
    seal: trailer ? `SL-${440000 + parseInt(id.slice(-2), 10)}` : null,
    notes,
  }
}

export const APPOINTMENTS = [
  apt('APT-10041', 'D-01', '06:00', 'INBOUND', 'DROP', 'Completed', 'TRP-88310', 'PO-3310291', 'CAR-005', 'CUS-006', 12, 'TRL-88110', 'Early morning drop'),
  apt('APT-10042', 'D-02', '06:00', 'OUTBOUND', 'LIVE', 'Completed', 'TRP-88322', 'PO-4429183', 'CAR-006', 'CUS-007', 13, 'TRL-88122'),
  apt('APT-10043', 'D-01', '07:00', 'INBOUND', 'LIVE', 'Released', 'TRP-88345', 'PO-5510294', 'CAR-003', 'CUS-008', 6, 'TRL-88145'),
  apt('APT-10044', 'D-03', '07:00', 'OUTBOUND', 'DROP', 'Completed', 'TRP-88358', 'PO-6621045', 'CAR-001', 'CUS-001', 0, 'TRL-88158'),
  apt('APT-10045', 'D-01', '08:00', 'INBOUND', 'LIVE', 'At Door', 'TRP-88421', 'PO-4410293', 'CAR-001', 'CUS-001', 0, 'TRL-92841', 'Reefer set to 38°F'),
  apt('APT-10046', 'D-02', '08:00', 'OUTBOUND', 'LIVE', 'Loading', 'TRP-88428', 'PO-7729183', 'CAR-005', 'CUS-004', 12, 'TRL-88428'),
  apt('APT-10047', 'D-02', '09:00', 'OUTBOUND', 'DROP', 'Loading', 'TRP-88435', 'PO-8821044', 'CAR-002', 'CUS-002', 1, 'TRL-55102'),
  apt('APT-10048', 'D-04', '09:00', 'INBOUND', 'DROP', 'At Door', 'TRP-88440', 'PO-9928471', 'CAR-006', 'CUS-006', 13, 'TRL-88440', '14 pallets LTL'),
  apt('APT-10049', 'D-03', '10:00', 'INBOUND', 'LIVE', 'Scheduled', 'TRP-88450', 'PO-2291847', 'CAR-003', 'CUS-003', 2, 'TRL-33821', 'Oversized — notify supervisor'),
  apt('APT-10050', 'D-05', '10:00', 'OUTBOUND', 'LIVE', 'Scheduled', 'TRP-88455', 'PO-3382911', 'CAR-004', 'CUS-005', 3, 'TRL-88455'),
  apt('APT-10051', 'D-04', '11:00', 'OUTBOUND', 'DROP', 'Scheduled', 'TRP-88462', 'PO-5510293', 'CAR-004', 'CUS-004', 3, 'TRL-77291'),
  apt('APT-10052', 'D-06', '11:00', 'INBOUND', 'LIVE', 'Scheduled', 'TRP-88468', 'PO-4482911', 'CAR-005', 'CUS-007', 12, 'TRL-88468'),
  apt('APT-10053', 'D-01', '12:00', 'INBOUND', 'DROP', 'Scheduled', 'TRP-88472', 'PO-6629183', 'CAR-002', 'CUS-008', 1, 'TRL-88472'),
  apt('APT-10054', 'D-05', '13:00', 'INBOUND', 'DROP', 'Scheduled', 'TRP-88478', 'PO-9921044', 'CAR-001', 'CUS-005', 4, 'TRL-44102', 'LTL — 14 pallets'),
  apt('APT-10055', 'D-07', '13:00', 'OUTBOUND', 'LIVE', 'Scheduled', 'TRP-88482', 'PO-7738292', 'CAR-003', 'CUS-002', 2, 'TRL-88482'),
  apt('APT-10056', 'D-06', '14:00', 'OUTBOUND', 'BOBTAIL', 'Scheduled', 'TRP-88490', 'PO-3382910', 'CAR-002', 'CUS-001', 5, null, 'Bobtail pickup only'),
  apt('APT-10057', 'D-03', '14:00', 'INBOUND', 'LIVE', 'Scheduled', 'TRP-88495', 'PO-8847292', 'CAR-006', 'CUS-003', 13, 'TRL-88495'),
  apt('APT-10058', 'D-08', '15:00', 'INBOUND', 'DROP', 'Scheduled', 'TRP-88501', 'PO-7710234', 'CAR-003', 'CUS-002', 6, 'TRL-22918'),
  apt('APT-10059', 'D-01', '15:00', 'INBOUND', 'LIVE', 'Released', 'TRP-88505', 'PO-9951029', 'CAR-001', 'CUS-001', 0, 'TRL-88505'),
  apt('APT-10060', 'D-02', '16:00', 'OUTBOUND', 'LIVE', 'Completed', 'TRP-88512', 'PO-4482910', 'CAR-004', 'CUS-003', 7, 'TRL-99210'),
  apt('APT-10061', 'D-07', '16:00', 'OUTBOUND', 'DROP', 'Scheduled', 'TRP-88518', 'PO-5510295', 'CAR-005', 'CUS-006', 12, 'TRL-88518'),
  apt('APT-10062', 'D-05', '17:00', 'INBOUND', 'LIVE', 'Scheduled', 'TRP-88524', 'PO-6621046', 'CAR-002', 'CUS-004', 1, 'TRL-88524'),
  apt('APT-10063', 'D-04', '18:00', 'OUTBOUND', 'DROP', 'Scheduled', 'TRP-88530', 'PO-7738293', 'CAR-003', 'CUS-007', 2, 'TRL-88530'),
  apt('APT-10064', 'D-08', '19:00', 'INBOUND', 'DROP', 'Scheduled', 'TRP-88536', 'PO-8847293', 'CAR-006', 'CUS-008', 13, 'TRL-88536'),
  // Tomorrow preview
  {
    id: 'APT-10070',
    warehouseId: 'WH-001',
    doorId: 'D-01',
    date: TOMORROW,
    slot: '08:00',
    moveType: 'INBOUND',
    apptType: 'LIVE',
    scheduleType: 'APPT',
    status: 'Scheduled',
    tripId: 'TRP-88600',
    po: 'PO-9012847',
    carrierId: 'CAR-001',
    customerId: 'CUS-001',
    driver: DRIVERS[0],
    trailer: 'TRL-88600',
    seal: 'SL-901284',
    notes: '',
  },
  {
    id: 'APT-10071',
    warehouseId: 'WH-001',
    doorId: 'D-03',
    date: TOMORROW,
    slot: '10:00',
    moveType: 'OUTBOUND',
    apptType: 'DROP',
    scheduleType: 'APPT',
    status: 'Scheduled',
    tripId: 'TRP-88612',
    po: 'PO-9128471',
    carrierId: 'CAR-004',
    customerId: 'CUS-002',
    driver: DRIVERS[3],
    trailer: 'TRL-88612',
    seal: 'SL-912847',
    notes: '',
  },
]

export const REQUESTS = [
  {
    id: 'REQ-20481',
    warehouseId: 'WH-001',
    date: TODAY,
    slot: '12:00',
    moveType: 'INBOUND',
    apptType: 'LIVE',
    shipmentType: 'FTL',
    status: 'Pending Approval',
    tripId: 'TRP-88540',
    po: 'PO-6621044',
    carrierId: 'CAR-001',
    customerId: 'CUS-004',
    driver: { name: 'Samuel Grant', phone: '(313) 555-0412' },
    submittedAt: `${TODAY}T10:22:00`,
  },
  {
    id: 'REQ-20482',
    warehouseId: 'WH-001',
    date: TODAY,
    slot: '17:00',
    moveType: 'OUTBOUND',
    apptType: 'DROP',
    shipmentType: 'LTL',
    status: 'Pending Approval',
    tripId: 'TRP-88541',
    po: 'PO-7738291',
    carrierId: 'CAR-003',
    customerId: 'CUS-005',
    driver: { name: 'Helen Cruz', phone: '(734) 555-0456' },
    submittedAt: `${TODAY}T11:05:00`,
  },
  {
    id: 'REQ-20483',
    warehouseId: 'WH-001',
    date: TODAY,
    slot: '18:00',
    moveType: 'INBOUND',
    apptType: 'DROP',
    shipmentType: 'FTL',
    status: 'Pending Approval',
    tripId: 'TRP-88552',
    po: 'PO-8847291',
    carrierId: 'CAR-002',
    customerId: 'CUS-001',
    driver: { name: 'Frank Deluca', phone: '(248) 555-0489' },
    submittedAt: `${TODAY}T11:48:00`,
  },
  {
    id: 'REQ-20484',
    warehouseId: 'WH-001',
    date: TODAY,
    slot: '19:00',
    moveType: 'OUTBOUND',
    apptType: 'LIVE',
    shipmentType: 'FTL',
    status: 'Pending Approval',
    tripId: 'TRP-88560',
    po: 'PO-9951028',
    carrierId: 'CAR-005',
    customerId: 'CUS-006',
    driver: { name: 'Rachel Stone', phone: '(313) 555-0523' },
    submittedAt: `${TODAY}T12:15:00`,
  },
  {
    id: 'REQ-20485',
    warehouseId: 'WH-001',
    date: TOMORROW,
    slot: '09:00',
    moveType: 'INBOUND',
    apptType: 'DROP',
    shipmentType: 'LTL',
    status: 'Pending Approval',
    tripId: 'TRP-88620',
    po: 'PO-1029384',
    carrierId: 'CAR-006',
    customerId: 'CUS-007',
    driver: { name: 'Victor Hayes', phone: '(734) 555-0567' },
    submittedAt: `${TODAY}T13:30:00`,
  },
  {
    id: 'REQ-20470',
    warehouseId: 'WH-001',
    date: TODAY,
    slot: '07:00',
    moveType: 'INBOUND',
    apptType: 'LIVE',
    shipmentType: 'FTL',
    status: 'Approved',
    tripId: 'TRP-88345',
    po: 'PO-5510294',
    carrierId: 'CAR-003',
    customerId: 'CUS-008',
    driver: { name: 'Nina Patel', phone: '(734) 555-0345' },
    submittedAt: `${TODAY}T05:10:00`,
  },
  {
    id: 'REQ-20471',
    warehouseId: 'WH-001',
    date: TODAY,
    slot: '16:00',
    moveType: 'OUTBOUND',
    apptType: 'DROP',
    shipmentType: 'FTL',
    status: 'Rejected',
    tripId: 'TRP-88500',
    po: 'PO-4482912',
    carrierId: 'CAR-006',
    customerId: 'CUS-003',
    driver: { name: 'Amanda Liu', phone: '(586) 555-0601' },
    submittedAt: `${TODAY}T08:45:00`,
  },
]

export const CHECKINS = [
  {
    id: 'CHK-9001',
    appointmentId: 'APT-10045',
    driverName: 'Marcus Johnson',
    carrierId: 'CAR-001',
    doorId: 'D-01',
    status: 'At Door',
    checkedInAt: `${TODAY}T07:52:00`,
    dwellMinutes: 68,
    trailer: 'TRL-92841',
    seal: 'SL-448291',
    released: false,
  },
  {
    id: 'CHK-9002',
    appointmentId: 'APT-10047',
    driverName: 'Diana Reyes',
    carrierId: 'CAR-002',
    doorId: 'D-02',
    status: 'Loading',
    checkedInAt: `${TODAY}T08:48:00`,
    dwellMinutes: 42,
    trailer: 'TRL-55102',
    seal: 'SL-992104',
    released: false,
  },
  {
    id: 'CHK-9003',
    appointmentId: 'APT-10048',
    driverName: 'Victor Hayes',
    carrierId: 'CAR-006',
    doorId: 'D-04',
    status: 'Unloading',
    checkedInAt: `${TODAY}T08:55:00`,
    dwellMinutes: 35,
    trailer: 'TRL-88440',
    seal: 'SL-884400',
    released: false,
  },
  {
    id: 'CHK-9004',
    appointmentId: 'APT-10046',
    driverName: 'Rachel Stone',
    carrierId: 'CAR-005',
    doorId: 'D-02',
    status: 'Loading',
    checkedInAt: `${TODAY}T07:58:00`,
    dwellMinutes: 52,
    trailer: 'TRL-88428',
    seal: 'SL-884280',
    released: false,
  },
  {
    id: 'CHK-9005',
    appointmentId: 'APT-10059',
    driverName: 'Nina Patel',
    carrierId: 'CAR-003',
    doorId: 'D-01',
    status: 'Released',
    checkedInAt: `${TODAY}T14:32:00`,
    dwellMinutes: 45,
    trailer: 'TRL-88505',
    seal: 'SL-551029',
    released: true,
  },
  {
    id: 'CHK-9006',
    appointmentId: null,
    driverName: 'Samuel Grant',
    carrierId: 'CAR-001',
    doorId: null,
    status: 'Waiting',
    checkedInAt: `${TODAY}T11:15:00`,
    dwellMinutes: 47,
    trailer: 'TRL-66210',
    seal: 'SL-662104',
    released: false,
  },
  {
    id: 'CHK-9007',
    appointmentId: null,
    driverName: 'Helen Cruz',
    carrierId: 'CAR-003',
    doorId: null,
    status: 'Waiting',
    checkedInAt: `${TODAY}T11:42:00`,
    dwellMinutes: 20,
    trailer: 'TRL-77382',
    seal: 'SL-773829',
    released: false,
  },
  {
    id: 'CHK-9008',
    appointmentId: 'APT-10043',
    driverName: 'Nina Patel',
    carrierId: 'CAR-003',
    doorId: 'D-01',
    status: 'Released',
    checkedInAt: `${TODAY}T06:45:00`,
    dwellMinutes: 38,
    trailer: 'TRL-88145',
    seal: 'SL-551294',
    released: true,
  },
]

export function getCarrier(id) {
  return CARRIERS.find((c) => c.id === id)
}

export function getCustomer(id) {
  return CUSTOMERS.find((c) => c.id === id)
}

export function getWarehouse(id) {
  return WAREHOUSES.find((w) => w.id === id)
}

export function getDoor(warehouseId, doorId) {
  const wh = getWarehouse(warehouseId)
  return wh?.doors.find((d) => d.id === doorId)
}

export function formatTime(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

export function formatDwell(minutes) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h > 0) return `${h}h ${m}m`
  return `${m}m`
}

export function getHubStats() {
  const todayAppts = APPOINTMENTS.filter((a) => a.date === TODAY)
  return {
    appointmentsToday: todayAppts.length,
    doors: WAREHOUSES[0].doors.length,
    pendingRequests: REQUESTS.filter((r) => r.status === 'Pending Approval').length,
    inYard: CHECKINS.filter((c) => !c.released).length,
    carriers: CARRIERS.length,
    customers: CUSTOMERS.length,
  }
}
