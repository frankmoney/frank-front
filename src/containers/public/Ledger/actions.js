import { createAction } from 'redux-actions'
import { createDeferredAction } from '@frankmoney/utils'

export const load = createDeferredAction(
  'public/ledger/load',
  payload => payload || {}
)
export const update = createDeferredAction('public/ledger/update')
export const resetSearch = createDeferredAction('public/ledger/resetSearch')
export const searchTyping = createAction('public/ledger/search')
export const selectPage = createAction('public/ledger/select-page')
export const selectCategoryType = createAction(
  'public/ledger/select-category-type'
)
export const selectCategory = createAction('public/ledger/select-category')
export const cancelCategory = createAction('public/ledger/cancel-category')

export const filtersOpen = createAction('public/ledger/filters/open')

export const barZoomIn = createAction('public/ledger/bars/zoom-in')

export const leave = createAction('public/ledger/leave')
