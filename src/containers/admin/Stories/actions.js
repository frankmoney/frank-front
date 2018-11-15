import { createAction } from 'redux-actions'
import { createDeferredAction } from '@frankmoney/utils'

export const load = createDeferredAction(
  'admin/stories/load',
  payload => payload || {}
)
export const toggleShareDialog = createAction(
  'admin/stories/toggle-share-dialog'
)
export const leave = createAction('admin/stories/leave')
