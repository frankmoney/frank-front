// @flow strict
import * as R from 'ramda'
import type { Category } from 'data/models/category'

export const sumProp = (propName: string) =>
  R.pipe(
    R.map(R.prop(propName)),
    R.sum
  )

const percentOf = (value: number, total: number): number =>
  Math.round((100 * value) / total)

const fixEmptyCategory: (?Category) => Category = R.when(
  R.isNil,
  R.always({
    color: '#B3B3B3',
    id: '#Uncategorized',
    name: '#Uncategorized',
  })
)

const sortByValueDescend = R.sortBy(
  R.pipe(
    R.prop('value'),
    R.negate
  )
)

export type PieChartCategory = {|
  ...Category,
  value: number,
|}

export type GroupedPieData = {|
  income: Array<PieChartCategory>,
  spending: Array<PieChartCategory>,
|}

type GraphqlPieData = {
  category: ?Category,
  revenue: number,
  spending: number,
}

type LocalPieData = {|
  category: ?Category,
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
      R.map(
        ({ income: value, category }: LocalPieData): PieChartCategory => ({
          value: percentOf(value, totalIncome),
          ...fixEmptyCategory(category),
        })
      ),
      sortByValueDescend
    ),
    R.pipe(
      R.filter(({ expenses }) => expenses > 0),
      R.map(
        ({ expenses: value, category }: LocalPieData): PieChartCategory => ({
          value: percentOf(value, totalExpenses),
          ...fixEmptyCategory(category),
        })
      ),
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
