// @flow
import type { BarData } from 'components/Charts/Bar'

export type Props = {
  currentCategoryColor: string,
  currentCategoryName: string,
  barsData: ?BarData,
  barsHeight: number,
  barsWidth: number,
  footerPadding: number,
  showBarChart: boolean,
  // Handlers
  onCancelCategoryClick: () => void,
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
