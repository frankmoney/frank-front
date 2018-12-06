// @flow strict
import * as R from 'ramda'
import { createSelector } from 'reselect'
import { createPlainObjectSelector } from '@frankmoney/utils'
import {
  remapPieData,
  type LedgerPieChart,
  type PieChartItems,
} from 'data/models/pieData'
import type { Selector, Store } from 'flow/redux'
import { REDUCER_KEY } from './reducer'

const get = (...prop) => (store: Store) => store.getIn([REDUCER_KEY, ...prop])

const demoPieDataSelector = createPlainObjectSelector(get('pieData'))

const sumProp = (propName: string) =>
  R.pipe(
    R.map(R.prop(propName)),
    R.sum
  )

const rawPieDataSelector: Selector<LedgerPieChart> = createSelector(
  demoPieDataSelector,
  items => ({
    items,
    totalRevenue: sumProp('revenue')(items),
    totalSpending: sumProp('spending')(items),
  })
)

export const barChartDataSelector = createPlainObjectSelector(get('barsData'))

export const pieTotalSelector = get('pieTotal')
export const periodSelector = get('period')
export const periodsSelector = createPlainObjectSelector(get('periods'))
export const tabSelector = get('tab')

export const pieItemsSelector: Selector<PieChartItems> = createSelector(
  pieTotalSelector,
  rawPieDataSelector,
  remapPieData
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
