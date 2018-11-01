// @flow
import type { InjectStylesProps } from 'utils/styles'

type EmptyCb = () => void

export type Props = {|
  ...InjectStylesProps,
  //
  active?: boolean,
  color?: string,
  name?: string,
  value?: number,
  valueUnit?: string,
  // Handlers
  onClick?: EmptyCb,
  onMouseEnter?: EmptyCb,
  onMouseLeave?: EmptyCb,
  // Styles
  activeClassName?: string,
  iconClassName?: string,
  nameClassName?: string,
  valueClassName?: string,
|}
