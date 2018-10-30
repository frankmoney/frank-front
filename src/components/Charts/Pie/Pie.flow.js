// @flow
import type { InjectStylesProps } from 'utils/styles'

type PieItem = {|
  color?: string,
  name: string,
  value: number,
|}

export type PieData = Array<PieItem>

type EmptyCb = () => void
type NumberCb = number => void

export type Props = {|
  ...InjectStylesProps,
  //
  activeSegmentIndex?: number,
  data: PieData,
  size: number,
  // Handlers
  // onClick: // FIXME: not used now,
  onSegmentMouseEnter?: NumberCb,
  onSegmentMouseLeave?: EmptyCb,
|}

export type PieSliceProps = {|
  color: string,
  index: number,
|}

export type FatPieSliceProps = {|
  active: boolean,
  color: string,
  index: number,
|}
