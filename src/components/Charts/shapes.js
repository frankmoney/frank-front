import PropTypes from 'prop-types'

export const pieChartDataShape = PropTypes.shape({
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
})

export const barChartDataShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  negativeValue: PropTypes.number.isRequired,
})
