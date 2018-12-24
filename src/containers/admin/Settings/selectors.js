// @flow strict
import * as R from 'ramda'
import { createSelector } from 'reselect'
import { createPlainObjectSelector } from '@frankmoney/utils'
import type { ReduxState } from 'flow/redux'
import { REDUCER_KEY } from './reducer'

const get = (...prop) => (state: ReduxState) =>
  state.getIn([REDUCER_KEY, ...prop])

export const loadingSelector = get('loading')
export const loadedSelector = get('loaded')

export const pidSelector = get('pid')
export const nameSelector = get('name')
export const descriptionSelector = get('description')
export const isPublicSelector = get('isPublic')

export const accountsSelector = createSelector(
  createPlainObjectSelector(get('sources')),
  sources =>
    sources.map(source => ({
      name: source.name,
      bankLogo: source.bankLogo,
      bankName: source.bankName,
      accountName: 'Stub',
      accountFourDigits: 1234,
      accountBalance: 0,
      accountLastUpdate: '20180908',
      accountNextUpdate: '20190908',
      accountStatus: source.status,
    }))
)

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

export const accountCardFormValuesSelector = createSelector(
  nameSelector,
  descriptionSelector,
  isPublicSelector,
  (name, description, isPublic) => ({ name, description, isPrivate: !isPublic })
)
