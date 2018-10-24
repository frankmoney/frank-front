// @flow

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
