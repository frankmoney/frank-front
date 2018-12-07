// @flow strict
import * as R from 'ramda'
import type { Category } from 'data/models/category'

type LedgerPieChartItem = {|
  category: ?Category,
  spending: number,
|}

export type LedgerPieChart = {|
  items: Array<LedgerPieChartItem>,
  totalRevenue: number,
  totalSpending: number,
|}

export type PieTotal = 'income' | 'spending'
export const DEFAULT_PIE_TOTAL: PieTotal = 'income'
export const PIE_TOTAL_PARAMETER_NAME = 'total'

export type PieChartCategory = {|
  ...Category,
  value: number,
|}

export type PieChartItems = Array<PieChartCategory>

const UNCATEGORIZED: Category = {
  color: '#B3B3B3',
  id: '#Uncategorized',
  name: '#Uncategorized',
}

export const FILLER: Category = {
  color: '#EFEFEF',
  id: '#filler',
  name: '*FILLER*',
}

const percentOf = (value: number, total: number): number =>
  total <= 0
    ? 0 // нечего показывать, все категории обнулены. должен получится пустой пай
    : (100 * value) / total

const roundValues = R.map(R.over(R.lensProp('value'), Math.round))

const sortByValueDescend: PieChartItems => PieChartItems = R.sortBy(
  R.pipe(
    R.prop('value'),
    R.negate
  )
)

const toPieChartCategory = (
  category: ?Category,
  value: number,
  total: number
): PieChartCategory => ({
  value: percentOf(value, total),
  ...(category || UNCATEGORIZED),
})

type AddFillerFn = number => PieChartItems => PieChartItems

const addFiller: AddFillerFn = total => items => {
  if (total <= 0) {
    return [toPieChartCategory(FILLER, 1, 1)]
  }
  const sum = R.reduce((x, item) => x + R.prop('value', item), 0, items)
  return sum < 100
    ? R.append(toPieChartCategory(FILLER, 100 - sum, 100), items)
    : items
}

type RemapFn = (percentageOf: PieTotal, data: LedgerPieChart) => PieChartItems

export const remapPieData: RemapFn = (
  percentageOf,
  { items, totalRevenue, totalSpending }
) => {
  const total = percentageOf === 'spending' ? totalSpending : totalRevenue
  return R.pipe(
    R.map(({ spending, category }: LedgerPieChartItem) =>
      toPieChartCategory(category, spending, total)
    ),
    sortByValueDescend,
    addFiller(total),
    roundValues
  )(items)
}

type ForceFn = (percentageOf: PieTotal, data: LedgerPieChart) => PieTotal

export const forceValidPieTotal: ForceFn = (
  total,
  { totalRevenue, totalSpending }
) =>
  total === 'income'
    ? totalRevenue >= totalSpending
      ? 'income'
      : 'spending'
    : 'spending'
