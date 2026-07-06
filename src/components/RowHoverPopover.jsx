import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export function useRowHover() {
  const [hover, setHover] = useState(null)

  const show = (id, data, rect, pointer) => setHover({ id, data, rect, pointer })
  const hide = () => setHover(null)

  const bind = (id, data) => ({
    onMouseEnter: (e) =>
      show(id, data, e.currentTarget.getBoundingClientRect(), { x: e.clientX, y: e.clientY }),
    onMouseMove: (e) =>
      show(id, data, e.currentTarget.getBoundingClientRect(), { x: e.clientX, y: e.clientY }),
    onMouseLeave: hide,
  })

  return { hover, bind, hide, isHovered: (id) => hover?.id === id }
}

function clampPopoverPosition({ pointer, rect, width, height = 200 }) {
  const margin = 14
  const offset = 12
  const vw = window.innerWidth
  const vh = window.innerHeight

  let left
  let top

  if (pointer) {
    left = pointer.x + offset
    top = pointer.y + offset
    if (left + width > vw - margin) left = pointer.x - width - offset
    if (top + height > vh - margin) top = pointer.y - height - offset
  } else if (rect) {
    left = rect.right + margin
    top = rect.top
    if (left + width > vw - margin) left = Math.max(margin, rect.left - width - margin)
  } else {
    return { top: margin, left: margin }
  }

  return {
    top: Math.min(Math.max(margin, top), vh - height - margin),
    left: Math.min(Math.max(margin, left), vw - width - margin),
  }
}

export function RowHoverPopover({ hover, children, width = 340 }) {
  const [pos, setPos] = useState({ top: 0, left: 0 })

  useEffect(() => {
    if (!hover) return
    setPos(clampPopoverPosition({ pointer: hover.pointer, rect: hover.rect, width }))
  }, [hover, width])

  if (!hover) return null

  return createPortal(
    <div className="sr-row-hover-popover" style={{ top: pos.top, left: pos.left, width }} role="tooltip">
      {children}
    </div>,
    document.body,
  )
}

export function HoverPopoverTitle({ children, sub }) {
  return (
    <header className="sr-hover-popover__head">
      <div className="sr-hover-popover__title">{children}</div>
      {sub && <div className="sr-hover-popover__sub">{sub}</div>}
    </header>
  )
}

export function HoverPopoverGrid({ rows }) {
  return (
    <dl className="sr-hover-popover__grid">
      {rows.map(([label, value]) => (
        <React.Fragment key={label}>
          <dt>{label}</dt>
          <dd>{value ?? '—'}</dd>
        </React.Fragment>
      ))}
    </dl>
  )
}
