// @flow strict
import * as R from 'ramda'
import type { Category } from 'data/models/category'
import { UNCATEGORIZED_CATEGORY } from 'const'

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

type PieDataMapperOptions = {|
  nameEmptyCategoryAs: string,
|}

type PieDataMapperFn = (
  percentageOf: PieTotal,
  data: LedgerPieChart
) => PieChartItems

type CreatePieDataMapperFn = PieDataMapperOptions => PieDataMapperFn

type AddFillerFn = number => PieChartItems => PieChartItems

type ForceFn = (percentageOf: PieTotal, data: LedgerPieChart) => PieTotal

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
  total: number,
  uncategorizedName
): PieChartCategory => ({
  value: percentOf(value, total),
  ...(category || { ...UNCATEGORIZED_CATEGORY, name: uncategorizedName }),
})

const addFiller: AddFillerFn = total => items => {
  if (total <= 0) {
    return [toPieChartCategory(FILLER, 1, 1)]
  }
  const sum = R.reduce((x, item) => x + R.prop('value', item), 0, items)
  return sum < 100
    ? R.append(toPieChartCategory(FILLER, 100 - sum, 100), items)
    : items
}

export const createPieDataMapper: CreatePieDataMapperFn = ({
  nameEmptyCategoryAs = 'Uncategorized',
}) => (percentageOf, { items, totalRevenue, totalSpending }) => {
  const total = percentageOf === 'spending' ? totalSpending : totalRevenue

  return R.pipe(
    R.map(({ spending, category }: LedgerPieChartItem) =>
      toPieChartCategory(category, spending, total, nameEmptyCategoryAs)
    ),
    sortByValueDescend,
    addFiller(total),
    roundValues
  )(items)
}

export const forceValidPieTotal: ForceFn = (
  total,
  { totalRevenue, totalSpending }
) =>
  total === 'income'
    ? totalRevenue >= totalSpending
      ? 'income'
      : 'spending'
    : 'spending'
