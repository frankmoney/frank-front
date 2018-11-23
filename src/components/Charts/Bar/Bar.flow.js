// @flow
import type { InjectStylesProps } from 'utils/styles'

export type { FormattedBarLabels } from 'data/models/barData'

export type JSONString = string

type BarItem = {|
  date: JSONString,
  negativeValue?: number,
  value: number,
  //
  name?: string, // this is only a default key. it is actually the `labelKey`
|}

export type BarData = Array<BarItem>

export type BarZoomInCb = (dateFrom: ?string, dateTo: ?string) => void

export type Props = {|
  ...InjectStylesProps,
  //
  barColor: string,
  clickable: boolean,
  data: BarData,
  dual?: boolean,
  footerPadding: number,
  height: number,
  hideBaseLine?: boolean,
  labelKey: string,
  onZoomIn?: BarZoomInCb,
  positiveBarColor: string,
  showBars: boolean,
  width: number,
|}
