import * as R from 'ramda'
import PropTypes from 'prop-types'

const DEFAULT_LIMIT = 5
const VALUE_PROP = 'value'
const OTHER_TEMPLATE = {
  name: 'Other categories',
  color: '#B3B3B3',
}

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
      return {
        items: primary,
        other,
        tooltipItems: rest,
      }
    }
  )

export const customLimitCategories = (otherTemplate, valueProp) => maxEntries =>
  R.ifElse(
    R.pipe(
      R.length,
      R.gte(maxEntries)
    ),
    items => ({ items, other: null, tooltipItems: [] }),
    doLimit(otherTemplate, valueProp, maxEntries)
  )

export const limitCategoriesTo = customLimitCategories(
  OTHER_TEMPLATE,
  VALUE_PROP
)

export const categoryProps = {
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.number,
}

export const categoryShape = PropTypes.shape(categoryProps)

export const limitedCategoriesProps = {
  items: PropTypes.arrayOf(categoryShape),
  other: categoryShape,
  tooltipItems: PropTypes.arrayOf(categoryShape),
}

export default limitCategoriesTo(DEFAULT_LIMIT)
