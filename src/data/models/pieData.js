// @flow strict-local
import * as R from 'ramda'
import type { PieData } from 'components/Charts/Pie'
import type { Category } from 'data/models/category'

export const sumProp = (propName: string) =>
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

export type GroupedPieData = {|
  income: PieData,
  spending: PieData,
|}

type GraphqlPieData = {
  category: Category,
  revenue: number,
  spending: number,
}

type LocalPieData = {|
  category: Category,
  expenses: number,
  income: number,
|}

export const remapPieData = (
  list: Array<LocalPieData>,
  totalExpenses: number,
  totalIncome: number
): GroupedPieData =>
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
  ({ category, revenue, spending }: GraphqlPieData): LocalPieData => ({
    category,
    income: revenue,
    expenses: spending,
  })
)
