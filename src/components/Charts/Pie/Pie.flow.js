// @flow
import PropTypes from 'prop-types'

type PieItem = {
  color: ?string,
  name: string,
  value: number,
}

export type PieData = Array<PieItem>

export type Props = {
  activeSegmentIndex: ?number,
  data: PieData,
  size: number,
  // Handlers
  // onClick: // FIXME: not used now,
  onSegmentMouseEnter: ?(number) => void,
  onSegmentMouseLeave: ?() => void,
  // Styles
  classes: Object,
  className: ?string,
}

export type PieSliceProps = {
  color: string,
  index: number,
}

export type FatPieSliceProps = {
  active: boolean,
  color: string,
  index: number,
}

// TODO: remove when migration is over
export const pieDataProp = PropTypes.arrayOf(
  PropTypes.shape({
    color: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  })
)
