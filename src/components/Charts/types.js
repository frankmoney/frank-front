// @flow
import PropTypes from 'prop-types'

type PieItem = {
  color: ?string,
  name: string,
  value: number,
}

export type PieData = Array<PieItem>

type BarItem = {
  name: string,
  negativeValue: number,
  value: number,
}

export type BarData = Array<BarItem>

// TODO: remove when migration is over
export const pieDataProp = PropTypes.arrayOf(
  PropTypes.shape({
    color: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  })
)

export const barDataProp = PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    negativeValue: PropTypes.number.isRequired,
  })
)
