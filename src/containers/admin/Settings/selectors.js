import * as R from 'ramda'
import { createSelector } from 'reselect'
import { createPlainObjectSelector } from '@frankmoney/utils'
import { REDUCER_KEY } from './reducer'

const get = (...prop) => store => store.getIn([REDUCER_KEY, ...prop])

export const isLoadingSelector = get('loading')
export const loadedSelector = get('loaded')

export const nameSelector = get('name')
export const descriptionSelector = get('description')

export const spendingCategoriesSelector = createPlainObjectSelector(
  get('spendingCategories')
)
export const incomeCategoriesSelector = createPlainObjectSelector(
  get('incomeCategories')
)
export const openCategoryDialogSelector = get('openCategoryDialog')

export const editingCategoryTypeSelector = get('editingCategoryType')

export const editingCategorySelector = createSelector(
  spendingCategoriesSelector,
  incomeCategoriesSelector,
  get('editingCategoryId'),
  (spending, income, categoryId) =>
    categoryId
      ? R.find(R.propEq('id', categoryId), R.concat(spending, income))
      : null
)
