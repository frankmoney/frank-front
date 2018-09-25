import { createAction } from 'redux-actions'
import { createDeferredAction } from '@frankmoney/utils'

export const load = createDeferredAction(
  'stories/load',
  payload => payload || {}
)
export const toggleShareDialog = createAction('stories/toggle-share-dialog')
export const leave = createAction('stories/leave')
