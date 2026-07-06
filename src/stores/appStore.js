import { useSyncExternalStore } from 'react'
import {
  APPOINTMENTS,
  REQUESTS,
  CHECKINS,
  CUSTOMERS,
  WAREHOUSES,
  CARRIERS,
  TODAY,
  getCarrier,
  getCustomer,
} from '../data/mockData'

let appointments = [...APPOINTMENTS]
let requests = [...REQUESTS]
let checkins = [...CHECKINS]
let customers = [...CUSTOMERS]
const listeners = new Set()

function emit() {
  listeners.forEach((l) => l())
}

function subscribe(cb) {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

export function useAppStore() {
  return useSyncExternalStore(subscribe, () => ({
    appointments,
    requests,
    checkins,
    customers,
    warehouses: WAREHOUSES,
    carriers: CARRIERS,
  }))
}

export function getPendingRequestCount() {
  return requests.filter((r) => r.status === 'Pending Approval').length
}

export function approveRequest(requestId, doorId) {
  const req = requests.find((r) => r.id === requestId)
  if (!req) return
  const apt = {
    id: `APT-${10000 + appointments.length + 1}`,
    warehouseId: req.warehouseId,
    doorId: doorId || 'D-03',
    date: req.date,
    slot: req.slot,
    moveType: req.moveType,
    apptType: req.apptType,
    scheduleType: 'APPT',
    status: 'Scheduled',
    tripId: req.tripId,
    po: req.po,
    carrierId: req.carrierId,
    customerId: req.customerId,
    driver: req.driver,
    trailer: null,
    seal: null,
    notes: '',
  }
  appointments = [...appointments, apt]
  requests = requests.map((r) =>
    r.id === requestId ? { ...r, status: 'Approved' } : r,
  )
  emit()
  return apt
}

export function rejectRequest(requestId) {
  requests = requests.map((r) =>
    r.id === requestId ? { ...r, status: 'Rejected' } : r,
  )
  emit()
}

export function addRequest(payload) {
  const id = `REQ-${20000 + requests.length + 1}`
  const req = {
    id,
    warehouseId: 'WH-001',
    status: 'Pending Approval',
    submittedAt: new Date().toISOString(),
    ...payload,
  }
  requests = [req, ...requests]
  emit()
  return id
}

export function releaseCheckin(checkinId) {
  checkins = checkins.map((c) =>
    c.id === checkinId ? { ...c, status: 'Released', released: true } : c,
  )
  emit()
}

export function enrichAppointment(apt) {
  return {
    ...apt,
    carrier: getCarrier(apt.carrierId),
    customer: getCustomer(apt.customerId),
  }
}

export function enrichRequest(req) {
  return {
    ...req,
    carrier: getCarrier(req.carrierId),
    customer: getCustomer(req.customerId),
  }
}

export function getAppointmentsForSlot(warehouseId, doorId, date, slot) {
  return appointments.filter(
    (a) => a.warehouseId === warehouseId && a.doorId === doorId && a.date === date && a.slot === slot,
  )
}

export function getYardKpis() {
  const active = checkins.filter((c) => !c.released)
  const waiting = active.filter((c) => c.status === 'Waiting').length
  const atDoor = active.filter((c) =>
    ['At Door', 'Loading', 'Unloading'].includes(c.status),
  ).length
  const avgDwell =
    active.length > 0
      ? Math.round(active.reduce((s, c) => s + c.dwellMinutes, 0) / active.length)
      : 0
  return { total: active.length, waiting, atDoor, avgDwell }
}

export function getScheduleKpis() {
  const todayAppts = appointments.filter((a) => a.date === TODAY)
  const inbound = todayAppts.filter((a) => a.moveType === 'INBOUND').length
  const outbound = todayAppts.filter((a) => a.moveType === 'OUTBOUND').length
  const completed = todayAppts.filter((a) => a.status === 'Completed' || a.status === 'Released').length
  return {
    total: todayAppts.length,
    inbound,
    outbound,
    completed,
    utilization: Math.round((todayAppts.length / (WAREHOUSES[0].doors.length * 8)) * 100),
  }
}
