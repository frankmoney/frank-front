import { createAction } from 'redux-actions'
import { createDeferredAction } from '@frankmoney/utils'

export const load = createDeferredAction('ledger/load')
export const searchTyping = createAction('ledger/search')

export const filtersOpen = createAction('ledger/filters/open')
export const filtersLoad = createDeferredAction('ledger/filters/load')
export const filtersChange = createAction('ledger/filters/change')
export const filtersEstimateResultsCount = createDeferredAction(
  'ledger/filters/estimate-results-count'
)
export const filtersApply = createAction('ledger/filters/apply')
export const filtersReset = createAction('ledger/filters/reset')
export const filtersClose = createAction('ledger/filters/close')

export const leave = createAction('ledger/leave')
