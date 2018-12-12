// @flow strict-local
import type {
  CategoryListComponent,
  CategoryListPieChartRootComponent,
  OverviewPieChartProps,
} from 'components/OverviewPieChart'
import { type LedgerPieChart } from 'data/models/pieData'
import type { FooterClasses, FooterProps } from 'containers/widgets/Footer'

export type Props = {|
  ...OverviewPieChartProps,
  // FIXME: placeholders
  rawPayments: Array<Object>, // flowlint-line unclear-type:off
  rawPieData: LedgerPieChart,
  //
  barsFooterPadding: number,
  barsHeight: number,
  barsWidth: number,
  CategoryList?: CategoryListComponent,
  pieChartRootComponent?: CategoryListPieChartRootComponent,
  showBarChart: boolean,
  showCategoryCount: boolean,
  showOverviewTotals?: boolean,
  widgetSize: number,
  // Styles
  barChartClassName?: string,
  className?: string,
  contentClassName?: string,
  overviewChartClassName?: string,
  paymentBlockClassName?: string,
  paymentBlockTitleClassName?: string,
  paymentClassName?: string,
  paymentListClassName?: string,
  paymentsPeriodClassName?: string,
  pieChartClassName?: string,
  //
  OverviewFooterClasses?: FooterClasses,
  OverviewFooterProps?: FooterProps,
|}
