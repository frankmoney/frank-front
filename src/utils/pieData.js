import * as R from 'ramda'

export const sumProp = propName =>
  R.pipe(
    R.map(R.prop(propName)),
    R.sum
  )

const percentOf = (value, total) => Math.round((100 * value) / total)

const mapCategory = R.when(
  R.isNil,
  R.always({ color: '#B3B3B3', name: '#Uncategorized' })
)

const sortByValueDescend = R.sortBy(
  R.pipe(
    R.prop('value'),
    R.negate
  )
)

export const remapPieData = (list, totalExpenses, totalIncome) =>
  R.converge((...args) => R.zipObj(['income', 'spending'], args), [
    R.pipe(
      R.filter(({ income }) => income > 0),
      R.map(({ income: value, category }) => ({
        value: percentOf(value, totalIncome),
        ...mapCategory(category),
      })),
      sortByValueDescend
    ),
    R.pipe(
      R.filter(({ expenses }) => expenses > 0),
      R.map(({ expenses: value, category }) => ({
        value: percentOf(value, totalExpenses),
        ...mapCategory(category),
      })),
      sortByValueDescend
    ),
  ])(list)

export const convertGraphqlPieData = R.map(
  ({ category, revenue, spending }) => ({
    category,
    income: revenue,
    expenses: spending,
  })
)
