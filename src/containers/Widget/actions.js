// @flow strict
import { createAction } from 'redux-actions'

export const selectPieTotal = createAction('widget/select-pie-total')

export const selectCategory = createAction('widget/select-category')
export const selectAllCategories = createAction('widget/select-all-categories')
export const cancelCategory = createAction('widget/cancel-category')

export const selectPeriod = createAction('widget/select-period')

export const switchTab = createAction('widget/switch-tab')
