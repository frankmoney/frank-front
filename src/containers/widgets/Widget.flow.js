// @flow strict-local
import type {
  CategoryCb,
  CategoryListComponent,
  CategoryListPieChartRootComponent,
  OverviewPieChartProps,
  PieChartCategories,
} from 'components/OverviewPieChart'
import type { BarData } from 'components/Charts/Bar'
import type { FooterClasses, FooterProps } from 'containers/widgets/Footer'

type EmptyCb = () => void
type TabSwitchCb = string => void

export type Props = {|
  ...OverviewPieChartProps,
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
  // Handlers
  onCategoryClick: CategoryCb,
  onSeeAllClick: EmptyCb,
  onTabSwitch: TabSwitchCb,
  onCancelCategoryClick: EmptyCb,
  // Selectors
  barsData: BarData,
  currentCategoryColor?: string,
  currentCategoryName?: string,
  paymentCount?: number,
  pieItems: PieChartCategories,
  tab: 'overview' | 'payments' | 'stories' | 'about',
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
