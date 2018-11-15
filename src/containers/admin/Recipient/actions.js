import { createAction } from 'redux-actions'
import { createDeferredAction } from '@frankmoney/utils'

export const load = createDeferredAction(
  'admin/recipient/load',
  payload => payload || {}
)
export const editName = createDeferredAction('admin/recipient/edit-name')
export const selectPage = createAction('admin/recipient/select-page')
export const changeSorting = createAction('admin/recipient/change-sorting')
export const leave = createAction('admin/recipient/leave')
