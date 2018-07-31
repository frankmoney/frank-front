import * as R from 'ramda'
import { createSelector } from 'reselect'
import { createPlainObjectSelector } from '@frankmoney/utils'
import { name } from './reducer'

const getter = prop => store => store.getIn([name, prop])
const getters = {
  categories: getter('categories'),
  chartData: getter('chartData'),
}

export const chartDataSelector = getters.chartData
const plainChartDataSelector = createPlainObjectSelector(chartDataSelector)
export const categoriesSelector = getters.categories

const sumCategory = R.pipe(
  R.pluck('value'),
  R.sum
)

const scale = items => {
  const total = sumCategory(items)
  return R.map(
    R.over(
      R.lensProp('value'),
      R.pipe(
        R.divide(R.__, total),
        R.multiply(100),
        Math.round
      )
    )
  )(items)
}

const mergeByCategory = categories =>
  R.pipe(
    R.groupBy(R.prop('category')),
    R.map(sumCategory),
    R.toPairs,
    R.map(([category, value]) => ({
      ...R.prop(category, categories),
      value,
    })),
    R.sortBy(R.prop('value')),
    R.reverse,
    scale
  )

// example: { color: '#21CB61', name: 'Marketing', value: 25 }
export const categoricalDataSelector = createSelector(
  plainChartDataSelector,
  createPlainObjectSelector(categoriesSelector),
  (data, categories) =>
    R.pipe(
      R.groupBy(R.prop('type')),
      R.map(mergeByCategory(categories))
    )(data)
)

const signedValue = ({ date, type, value }) => ({
  date,
  [type === 'income' ? 'value' : 'negativeValue']: value,
})

const mergeDate = R.pipe(
  R.map(signedValue),
  R.mergeAll
)

// example: { name: 'Jan', value: 39, negativeValue: 67 }
export const dualDataSelector = createSelector(
  plainChartDataSelector,
  R.pipe(
    R.groupBy(R.prop('date')),
    R.map(mergeDate),
    R.values
  )
)
