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
  editingCategoryTypeSelector,
  get('editingCategoryId'),
  (spending, income, categoryType, categoryId) =>
    categoryId
      ? R.find(
          R.propEq('id', categoryId),
          categoryType === 'spending' ? spending : income
        )
      : null
)
