// @flow
import type { BarData } from 'components/Charts/Bar'

type Classes = {
  barChartClassName: ?string,
  contentClassName: ?string,
  paymentBlockClassName: ?string,
  paymentBlockTitleClassName: ?string,
  paymentClassName: ?string,
  paymentListClassName: ?string,
  paymentsPeriodClassName: ?string,
}

export type Props = {
  barsData: ?BarData,
  barsHeight: number,
  barsWidth: number,
  footerPadding: number,
  onCancelCategoryClick: () => void,
  showBarChart: boolean,
} & Classes
