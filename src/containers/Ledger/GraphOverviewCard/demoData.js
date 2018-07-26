import * as R from 'ramda'

const rawData = [
  { date: 'Jan', type: 'spending', value: 67, category: 0 },
  { date: 'Feb', type: 'spending', value: 84, category: 1 },
  { date: 'Mar', type: 'spending', value: 67, category: 2 },
  { date: 'Apr', type: 'spending', value: 36, category: 3 },
  { date: 'May', type: 'spending', value: 50, category: 4 },
  { date: 'Jun', type: 'spending', value: 35, category: 5 },
  { date: 'Jul', type: 'spending', value: 29, category: 0 },
  { date: 'Aug', type: 'spending', value: 0, category: 1 },
  { date: 'Sep', type: 'spending', value: 94, category: 2 },
  { date: 'Oct', type: 'spending', value: 0, category: 3 },

  { date: 'Jan', type: 'income', value: 39, category: 0 },
  { date: 'Feb', type: 'income', value: 49, category: 1 },
  { date: 'Mar', type: 'income', value: 0, category: 2 },
  { date: 'Apr', type: 'income', value: 0, category: 3 },
  { date: 'May', type: 'income', value: 13, category: 4 },
  { date: 'Jun', type: 'income', value: 29, category: 5 },
  { date: 'Jul', type: 'income', value: 0, category: 0 },
  { date: 'Aug', type: 'income', value: 0, category: 2 },
  { date: 'Sep', type: 'income', value: 24, category: 4 },
  { date: 'Oct', type: 'income', value: 0, category: 3 },
]

const categories = {
  0: { color: '#8725FB', name: 'Operational expenses' },
  1: { color: '#21CB61', name: 'Marketing' },
  2: { color: '#0624FB', name: 'Program expenses' },
  3: { color: '#FC1891', name: 'Street outreach' },
  4: { color: '#FF9C28', name: 'Advertising' },
  5: { color: '#00DCEA', name: 'Sales' },
}

const sumCategory = R.pipe(
  R.pluck('value'),
  R.sum
)

const denormalize = ([category, value]) =>
  R.pipe(
    R.prop(category),
    R.assoc('value', value)
  )(categories)

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

const mergeByCategory = R.pipe(
  R.groupBy(R.prop('category')),
  R.map(sumCategory),
  R.pipe(
    R.toPairs,
    R.map(denormalize),
    R.sortBy(R.prop('value')),
    R.reverse,
    scale
  )
)

// example: { color: '#21CB61', name: 'Marketing', value: 25 }
export const categoricalData = R.pipe(
  R.groupBy(R.prop('type')),
  R.map(mergeByCategory)
)(rawData)

const signedValue = ({ date, type, value }) => ({
  date,
  [type === 'income' ? 'value' : 'negativeValue']: value,
})

const mergeDate = R.pipe(
  R.map(signedValue),
  R.mergeAll
)

// example: { name: 'Jan', value: 39, negativeValue: 67 }
export const dualData = R.pipe(
  R.groupBy(R.prop('date')),
  R.map(mergeDate),
  R.values
)(rawData)
