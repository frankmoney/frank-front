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

export const toggleRecipients = createAction('directory/toggle-recipients')
export const toggleDonors = createAction('directory/toggle-donors')
export const changeSorting = createAction('directory/change-sorting')

export const leave = createAction('directory/leave')
