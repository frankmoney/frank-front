// @flow
import PropTypes from 'prop-types'

type BarItem = {
  name: string,
  negativeValue: number,
  value: number,
}

export type BarData = Array<BarItem>

export type Props = {
  barColor: string,
  data: BarData,
  dual: ?boolean,
  footerPadding: number,
  height: number,
  hideBaseLine: ?boolean,
  labelKey: string,
  positiveBarColor: string,
  showBars: boolean,
  width: number,
}

// TODO: remove when migration is over
export const barDataProp = PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    negativeValue: PropTypes.number.isRequired,
  })
)
