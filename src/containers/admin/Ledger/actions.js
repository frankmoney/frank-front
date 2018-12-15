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
export const selectPieTotal = createAction('admin/ledger/select-pie-total')
export const selectCategory = createAction('admin/ledger/select-category')
export const cancelCategory = createAction('admin/ledger/cancel-category')

export const filtersOpen = createAction('admin/ledger/filters/open')

export const barZoomIn = createAction('admin/ledger/bars/zoom-in')

export const leave = createAction('admin/ledger/leave')
