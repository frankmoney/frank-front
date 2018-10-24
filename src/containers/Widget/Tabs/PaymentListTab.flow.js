// @flow
import type { BarData } from 'components/Charts/Bar'

type EmptyCb = () => void

export type Props = {
  currentCategoryColor: string,
  currentCategoryName: string,
  barsData: ?BarData,
  barsHeight: number,
  barsWidth: number,
  footerPadding: number,
  showBarChart: boolean,
  // Handlers
  onCancelCategoryClick: EmptyCb,
  // Styles
  classes: Object,
  barChartClassName: ?string,
  contentClassName: ?string,
  paymentBlockClassName: ?string,
  paymentBlockTitleClassName: ?string,
  paymentClassName: ?string,
  paymentListClassName: ?string,
  paymentsPeriodClassName: ?string,
}
