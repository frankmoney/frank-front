import * as R from 'ramda'
import { createSelector } from 'reselect'
import { createPlainObjectSelector } from '@frankmoney/utils'
import { REDUCER_KEY } from './reducer'

const get = (...prop) => store => store.getIn([REDUCER_KEY, ...prop])

export const pieChartDataSelector = createPlainObjectSelector(get('pieData'))
export const barChartDataSelector = createPlainObjectSelector(get('barsData'))

export const categoryTypeSelector = get('categoryType')
export const periodSelector = get('period')

export const activeCategoriesSelector = createSelector(
  pieChartDataSelector,
  categoryTypeSelector,
  (data, categoryType) => data[categoryType]
)

export const entriesCountSelector = createSelector(
  activeCategoriesSelector,
  R.pipe(
    // FIXME: placeholder
    R.length,
    R.multiply(3)
  )
)

export const selectedCategorySelector = createPlainObjectSelector(
  get('currentCategory')
)

export const currentCategoryNameSelector = createSelector(
  selectedCategorySelector,
  R.prop('name')
)

export const currentCategoryColorSelector = createSelector(
  selectedCategorySelector,
  R.prop('color')
)
