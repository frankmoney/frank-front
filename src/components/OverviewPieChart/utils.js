// @flow strict
import * as R from 'ramda'
import type { PieChartCategory } from 'data/models/pieData'

export type IndexedPieChartCategory = {|
  ...PieChartCategory,
  index: number,
|}

export type CategoryCb = IndexedPieChartCategory => void

export type CategoryListData = {|
  items: Array<IndexedPieChartCategory>,
  other: ?IndexedPieChartCategory,
  tooltipItems: Array<IndexedPieChartCategory>,
|}

export type PieChartCategories = Array<PieChartCategory>

const INDEX_PROP = 'index'
const VALUE_PROP = 'value'
export const OTHER_ID = '#other'

const injectKey: PieChartCategories => Array<PieChartCategory> = R.addIndex(
  R.map
)(R.flip(R.assoc(INDEX_PROP)))

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

const mergeOthers = (items: PieChartCategories): IndexedPieChartCategory => ({
  name: 'Other categories',
  id: OTHER_ID,
  color: '#B3B3B3',
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

const limitCategories = (maxEntries: number): LimitCategoriesFn =>
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

export default limitCategories
