import { createAction } from 'redux-actions'
import { createDeferredAction } from '@frankmoney/utils'

export const load = createDeferredAction(
  'admin/directory/load',
  payload => payload || {}
)
export const update = createDeferredAction('admin/directory/update')
export const resetSearch = createDeferredAction('admin/directory/resetSearch')
export const searchTyping = createAction('admin/directory/search')
export const selectPage = createAction('admin/directory/select-page')

export const changePeerFilter = createAction('admin/directory/filter-peer')
export const changeSorting = createAction('admin/directory/change-sorting')

export const leave = createAction('admin/directory/leave')
