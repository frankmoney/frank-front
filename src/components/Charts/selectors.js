import * as R from 'ramda'
import { createSelector } from 'reselect'
import { createPlainObjectSelector } from '@frankmoney/utils'

const getter = (prop, name) => store => store.getIn([name, prop])

export const categoriesSelector = name => getter('categories', name)
export const chartDataSelector = name => getter('chartData', name)
const plainChartDataSelector = name =>
  createPlainObjectSelector(chartDataSelector(name))

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

// categoricalDataShape
export const categoricalDataSelector = name =>
  createSelector(
    plainChartDataSelector(name),
    createPlainObjectSelector(categoriesSelector(name)),
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

// dualDataShape
export const dualDataSelector = name =>
  createSelector(
    plainChartDataSelector(name),
    R.pipe(
      R.groupBy(R.prop('date')),
      R.map(mergeDate),
      R.values
    )
  )
