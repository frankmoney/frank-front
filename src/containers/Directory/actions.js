import { createAction } from 'redux-actions'
import { createDeferredAction } from '@frankmoney/utils'

export const load = createDeferredAction(
  'directory/load',
  payload => payload || {}
)
export const update = createDeferredAction('directory/update')
export const resetSearch = createDeferredAction('directory/resetSearch')
export const searchTyping = createAction('directory/search')
export const selectPage = createAction('directory/select-page')

export const filtersLoad = createDeferredAction('directory/filters/load')
export const filtersChange = createAction('directory/filters/change')
export const filtersEstimateResultsCount = createDeferredAction(
  'directory/filters/estimate-results-count'
)
export const filtersApply = createAction('directory/filters/apply')
export const filtersReset = createAction('directory/filters/reset')

export const leave = createAction('directory/leave')
