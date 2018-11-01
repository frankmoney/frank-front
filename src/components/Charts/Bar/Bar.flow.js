// @flow
import type { InjectStylesProps } from 'utils/styles'

type BarItem = {|
  name?: string, // this is only a default key. it is actually the `labelKey`
  negativeValue?: number,
  value: number,
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
