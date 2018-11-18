import { createAction } from 'redux-actions'
import { createDeferredAction } from '@frankmoney/utils'

export const load = createDeferredAction(
  'admin/ledger/load',
  payload => payload || {}
)
export const update = createDeferredAction('admin/ledger/update')
export const resetSearch = createDeferredAction('admin/ledger/resetSearch')
export const searchTyping = createAction('admin/ledger/search')
export const selectPage = createAction('admin/ledger/select-page')
export const selectCategoryType = createAction(
  'admin/ledger/select-category-type'
)
export const selectCategory = createAction('admin/ledger/select-category')
export const cancelCategory = createAction('admin/ledger/cancel-category')

export const filtersOpen = createAction('admin/ledger/filters/open')
export const filtersLoad = createDeferredAction('admin/ledger/filters/load')
export const filtersChange = createAction('admin/ledger/filters/change')
export const filtersEstimateResultsCount = createDeferredAction(
  'admin/ledger/filters/estimate-results-count'
)
export const filtersApply = createAction('admin/ledger/filters/apply')
export const filtersReset = createAction('admin/ledger/filters/reset')
export const filtersClose = createAction('admin/ledger/filters/close')

export const searchSuggestions = createDeferredAction(
  'admin/ledger/card/search-suggestions'
)
export const paymentPublish = createDeferredAction('admin/ledger/card/publish')
export const paymentUpdate = createDeferredAction('admin/ledger/card/update')

export const leave = createAction('admin/ledger/leave')
