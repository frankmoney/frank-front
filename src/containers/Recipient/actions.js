import { createAction } from 'redux-actions'
import { createDeferredAction } from '@frankmoney/utils'

export const load = createDeferredAction(
  'recipient/load',
  payload => payload || {}
)
export const editName = createDeferredAction('recipient/edit-name')
export const selectPage = createAction('recipient/select-page')
export const changeSorting = createAction('recipient/change-sorting')
export const leave = createAction('recipient/leave')
