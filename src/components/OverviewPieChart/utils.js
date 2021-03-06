// @flow strict
import * as R from 'ramda'
import type { Category } from 'data/models/category'
import { FILLER, type PieChartCategory } from 'data/models/pieData'

const INDEX_PROP = 'index'
const VALUE_PROP = 'value'

export const OTHER: Category = {
  name: 'Other categories',
  id: '#other',
  color: '#B3B3B3',
}

export type IndexedPieChartCategory = {|
  ...PieChartCategory,
  index: number,
|}

export type CategoryCb = IndexedPieChartCategory => void

export type CategoryListData = {|
  filler?: IndexedPieChartCategory,
  items: Array<IndexedPieChartCategory>,
  other: ?IndexedPieChartCategory,
  tooltipItems: Array<IndexedPieChartCategory>,
|}

export type PieChartCategories = Array<PieChartCategory>

type injectKeyFn = PieChartCategories => Array<PieChartCategory>

const injectKey: injectKeyFn = R.addIndex(R.map)((category, i) =>
  R.assoc(INDEX_PROP, i)(category)
)

const sumProps = prop =>
  R.pipe(
    R.pluck(prop),
    R.sum
  )

const sortDescBy = prop =>
  R.pipe(
    R.sortBy(R.prop(prop)),
    R.reverse
  )

const roundValues = R.over(R.lensProp(VALUE_PROP), Math.round)

type mergeOthersFn = (items: PieChartCategories) => IndexedPieChartCategory

const mergeOthers: mergeOthersFn = items => ({
  ...OTHER,
  [VALUE_PROP]: sumProps(VALUE_PROP)(items),
  index: R.prop(INDEX_PROP, R.head(items)),
})

type LimitCategoriesFn = PieChartCategories => CategoryListData

const doLimit = (maxEntries: number): LimitCategoriesFn =>
  R.pipe(
    R.splitAt(maxEntries - 1),
    ([items, others]) => ({
      items,
      other: mergeOthers(others),
      tooltipItems: others,
    })
  )

const limitRealCategories = (maxEntries: number): LimitCategoriesFn =>
  R.pipe(
    sortDescBy(VALUE_PROP),
    injectKey,
    R.map(roundValues),
    R.ifElse(
      R.pipe(
        R.length,
        R.gte(maxEntries)
      ),
      items => ({ items, other: null, tooltipItems: [] }),
      doLimit(maxEntries)
    )
  )

export const fillerIndex = (maxEntries: number) => maxEntries + 2

const limitCategories = (maxEntries: number): LimitCategoriesFn => items => {
  const [fillers, categories] = R.partition(R.eqProps('id', FILLER), items)
  const filler = R.head(fillers)
  const result = limitRealCategories(maxEntries)(categories)
  return filler
    ? {
        ...result,
        filler: R.assoc('index', fillerIndex(maxEntries), filler),
      }
    : result
}

export default limitCategories
