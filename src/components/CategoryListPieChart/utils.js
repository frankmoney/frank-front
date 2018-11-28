// @flow strict-local
import * as R from 'ramda'
import type { CategoryListData } from 'components/CategoryList'

interface CategoryLike {
  name: string;
  value: number;
  color?: string;
}

export type Categories = Array<CategoryLike>

type LimitCategoriesFn = number => Categories => CategoryListData

const INDEX_PROP = 'index'
const VALUE_PROP = 'value'

const injectKey = R.addIndex(R.map)(R.flip(R.assoc(INDEX_PROP)))

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

const mergeOthers = items => ({
  name: 'Other categories',
  color: '#B3B3B3',
  [VALUE_PROP]: sumProps(VALUE_PROP)(items),
  index: R.prop(INDEX_PROP, R.head(items)),
})

const doLimit = maxEntries =>
  R.pipe(
    R.splitAt(maxEntries - 1),
    ([items, others]) => ({
      items,
      other: mergeOthers(others),
      tooltipItems: others,
    })
  )

const limitCategories: LimitCategoriesFn = maxEntries =>
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
