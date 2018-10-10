import * as R from 'ramda'

const OTHER_TEMPLATE = {
  name: 'Other categories',
  color: '#B3B3B3',
}

const PROP = 'value'

const injectKey = R.addIndex(R.map)(R.flip(R.assoc('index')))

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

const roundValues = R.over(R.lensProp(PROP), Math.round)

const doLimit = maxEntries =>
  R.pipe(
    R.splitAt(maxEntries - 1),
    ([items, others]) => ({
      items,
      other: R.assoc(PROP, sumProps(PROP)(others), OTHER_TEMPLATE),
      tooltipItems: others, // injectKey(rest),
    })
  )

const limitCategories = maxEntries =>
  R.pipe(
    sortDescBy(PROP),
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
