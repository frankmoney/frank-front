// @flow
import * as R from 'ramda'
import { createSelector } from 'reselect'
import type { Store } from 'redux'
import { createPlainObjectSelector } from '@frankmoney/utils'
import { remapPieData, sumProp } from 'data/models/pieData'
import { REDUCER_KEY } from './reducer'

const get = (...prop) => (store: Store) => store.getIn([REDUCER_KEY, ...prop])

const rawPieDataSelector = createPlainObjectSelector(get('pieData'))
const totalExpensesSelector = createSelector(
  rawPieDataSelector,
  sumProp('expenses')
)
const totalIncomeSelector = createSelector(
  rawPieDataSelector,
  sumProp('income')
)
export const pieChartDataSelector = createSelector(
  rawPieDataSelector,
  totalExpensesSelector,
  totalIncomeSelector,
  remapPieData
)

export const barChartDataSelector = createPlainObjectSelector(get('barsData'))

export const categoryTypeSelector = get('categoryType')
export const periodSelector = get('period')
export const periodsSelector = createPlainObjectSelector(get('periods'))
export const tabSelector = get('tab')

export const activeCategoriesSelector = createSelector(
  pieChartDataSelector,
  categoryTypeSelector,
  (data, categoryType) => data[categoryType]
)

export const categoryCountSelector = createSelector(
  activeCategoriesSelector,
  R.length
)

const selectedAllCategories = get('selectedAll')

const currentCategorySelector = createPlainObjectSelector(
  get('currentCategory')
)

export const selectedCategorySelector = createSelector(
  selectedAllCategories,
  currentCategorySelector,
  (selectedAll, category) =>
    selectedAll ? { name: 'Payments', id: null } : category
)

export const currentCategoryNameSelector = createSelector(
  selectedCategorySelector,
  R.prop('name')
)

export const currentCategoryColorSelector = createSelector(
  selectedCategorySelector,
  R.prop('color')
)

const currentCategoryIdSelector = createSelector(
  selectedCategorySelector,
  R.prop('id')
)

const rawPaymentsSelector = createPlainObjectSelector(get('payments'))

export const paymentCountSelector = createSelector(
  rawPaymentsSelector,
  R.length
)

export const paymentsSelector = createSelector(
  rawPaymentsSelector,
  currentCategoryIdSelector,
  // TODO: filter by period too
  (items, categoryId) =>
    categoryId === null
      ? items
      : R.filter(R.pathEq(['category', 'id'], categoryId))(items)
)

export const showCategoriesSelector = createSelector(
  currentCategoryIdSelector,
  R.isNil
)
