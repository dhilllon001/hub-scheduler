import { useSearchParams } from 'react-router-dom'

/** Update a single query param without mutating the existing URLSearchParams instance. */
export function useQueryParam(key, defaultValue = '') {
  const [params, setParams] = useSearchParams()
  const value = params.get(key) ?? defaultValue

  const setValue = (next) => {
    setParams((prev) => {
      const updated = new URLSearchParams(prev)
      if (next === '' || next == null) updated.delete(key)
      else updated.set(key, next)
      return updated
    })
  }

  return [value, setValue, params]
}

/** Build a query string preserving existing params. */
export function buildViewUrl(view, extra = {}) {
  const params = new URLSearchParams({ view, ...extra })
  return `/?${params.toString()}`
}
