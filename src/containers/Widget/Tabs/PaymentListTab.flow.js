// @flow
import type { BarData } from 'components/Charts/Bar'
import type { InjectStylesProps } from 'utils/styles'

type EmptyCb = () => void

export type Props = {|
  ...InjectStylesProps,
  //
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
  barChartClassName: ?string,
  contentClassName: ?string,
  paymentBlockClassName: ?string,
  paymentBlockTitleClassName: ?string,
  paymentClassName: ?string,
  paymentListClassName: ?string,
  paymentsPeriodClassName: ?string,
|}
