import { createAction } from 'redux-actions'

export const changeType = createAction('admin/widget/change-widget-type')
export const changeSize = createAction('admin/widget/change-size')
export const changeColor = createAction('admin/widget/change-color')
export const changePosition = createAction('admin/widget/change-position')

export const leave = createAction('admin/widget/leave')
