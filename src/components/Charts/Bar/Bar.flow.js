// @flow

type BarItem = {
  name: string,
  negativeValue: ?number,
  value: number,
}

export type BarData = Array<BarItem>

export type Props = {
  barColor: string,
  classes: Object,
  className: ?string,
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
