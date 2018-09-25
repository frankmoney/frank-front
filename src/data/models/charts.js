import PropTypes from 'prop-types'

const pieData = PropTypes.shape({
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
})

export const pieDataProp = PropTypes.objectOf(PropTypes.arrayOf(pieData))

const barData = PropTypes.shape({
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  negativeValue: PropTypes.number.isRequired,
})

export const barDataProp = PropTypes.arrayOf(barData)
