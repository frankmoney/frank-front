// @flow
import type { InjectStylesProps } from 'utils/styles'

export type JSONString = string

export type FormattedBarLabels = {|
  axisLabel: string,
  tooltipLabel: string,
|}

type BarItem = {|
  date: JSONString,
  negativeValue?: number,
  value: number,
  //
  name?: string, // this is only a default key. it is actually the `labelKey`
|}

export type BarData = Array<BarItem>

export type Props = {|
  ...InjectStylesProps,
  //
  barColor: string,
  data: BarData,
  dual?: boolean,
  footerPadding: number,
  height: number,
  hideBaseLine?: boolean,
  labelKey: string,
  positiveBarColor: string,
  showBars: boolean,
  width: number,
|}
