import { createAction } from 'redux-actions'

export const selectCategoryType = createAction('widget/select-category-type')

export const selectCategory = createAction('widget/select-category')
export const cancelCategory = createAction('widget/cancel-category')

export const selectPeriod = createAction('widget/select-period')
