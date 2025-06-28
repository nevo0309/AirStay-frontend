import { SET_FILTER_BY } from '../../store/stay.reducer'

export const filterSyncMiddleware = store => next => action => {
  const result = next(action) // let Redux update first
  if (action.type === SET_FILTER_BY) {
    const { filterBy } = store.getState().stayModule

    const params = new URLSearchParams()
    Object.entries(filterBy).forEach(([key, val]) => {
      if (val === '' || val == null) return // skip empties
      params.set(
        key,
        typeof val === 'object'
          ? JSON.stringify(val) // stringify guest object etc.
          : val
      )
    })

    // Replace current history entry (clean back-button behaviour)
    window.history.replaceState(null, '', '?' + params.toString())
  }
  return result
}
