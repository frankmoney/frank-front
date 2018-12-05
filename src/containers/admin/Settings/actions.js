import { createAction } from 'redux-actions'
import { createDeferredAction } from '@frankmoney/utils'

export const load = createDeferredAction(
  'admin/settings/load',
  payload => payload || {}
)
export const update = createDeferredAction('admin/settings/update')

export const openCategoryDialog = createAction('admin/settings/open-dialog')
export const closeCategoryDialog = createAction('admin/settings/close-dialog')
export const modifyCategoryList = createDeferredAction(
  'admin/settings/modify-categories'
)

export const leave = createAction('admin/settings/leave')
