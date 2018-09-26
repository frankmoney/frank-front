import * as R from 'ramda'
import PropTypes from 'prop-types'

const VALUE_PROP = 'value'
const OTHER_TEMPLATE = {
  name: 'Other categories',
  color: '#B3B3B3',
}

const injectKey = R.addIndex(R.map)(R.flip(R.assoc('key')))

const sumProps = prop =>
  R.pipe(
    R.pluck(prop),
    R.sum
  )

const doLimit = (otherTemplate, valueProp, maxEntries) =>
  R.pipe(
    R.splitAt(maxEntries - 1),
    ([primary, rest]) => {
      const other = R.assoc(valueProp, sumProps(valueProp)(rest), otherTemplate)
      const allItems = injectKey([...primary, other])
      return {
        items: R.init(allItems),
        other: R.last(allItems),
        tooltipItems: injectKey(rest),
      }
    }
  )

const roundValues = R.over(R.lensProp('value'), Math.round)

export const customLimitCategories = (otherTemplate, valueProp) => maxEntries =>
  R.pipe(
    R.ifElse(
      R.pipe(
        R.length,
        R.gte(maxEntries)
      ),
      items => ({ items: injectKey(items), other: null, tooltipItems: [] }),
      doLimit(otherTemplate, valueProp, maxEntries)
    ),
    ({ items, other, tooltipItems }) => ({
      items: R.map(roundValues, items),
      other: other && roundValues(other),
      tooltipItems: R.map(roundValues, tooltipItems),
    })
  )

export const limitCategoriesTo = customLimitCategories(
  OTHER_TEMPLATE,
  VALUE_PROP
)

export const categoryProps = {
  color: PropTypes.string,
  key: PropTypes.number,
  name: PropTypes.string.isRequired,
  value: PropTypes.number,
}

const categoryShape = PropTypes.shape(categoryProps)

export const categoriesProp = PropTypes.shape({
  items: PropTypes.arrayOf(categoryShape),
  other: categoryShape,
  tooltipItems: PropTypes.arrayOf(categoryShape),
})
