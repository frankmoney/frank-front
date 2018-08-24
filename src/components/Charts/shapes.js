import PropTypes from 'prop-types'

export const categoriesShape = PropTypes.objectOf(
  PropTypes.shape({
    color: PropTypes.string,
    name: PropTypes.string.isRequired,
  })
)

export const categoricalDataShape = PropTypes.shape({
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
})

export const dualDataShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  negativeValue: PropTypes.number.isRequired,
})
