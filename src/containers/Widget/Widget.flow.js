// @flow
import type {
  CategoryListComponent,
  CategoryListPieChartRootComponent,
} from 'components/CategoryListPieChart'
import type { BarData } from 'components/Charts/Bar'
import type { CategoryCb } from 'components/CategoryList'
import type { FooterClasses, FooterProps } from 'containers/Widget/Footer'
import type { GroupedPieData } from 'data/models/pieData'

type EmptyCb = () => void
type TabSwitchCb = string => void

export type Props = {
  barsFooterPadding: number,
  barsHeight: number,
  barsWidth: number,
  CategoryList: ?CategoryListComponent,
  pieChartRootComponent: ?CategoryListPieChartRootComponent,
  showBarChart: boolean,
  showCategoryCount: boolean,
  showOverviewTotals: ?boolean,
  widgetSize: number,
  // Handlers
  onCategoryClick: CategoryCb,
  onCategoryTypeChange: CategoryCb,
  onSeeAllClick: EmptyCb,
  onTabSwitch: TabSwitchCb,
  onCancelCategoryClick: EmptyCb,
  // Selectors
  barsData: BarData,
  categoryCount: ?number,
  categoryType: ?string,
  currentCategoryColor: ?string,
  currentCategoryName: ?string,
  paymentCount: ?number,
  pieData: GroupedPieData,
  tab: 'overview' | 'payments' | 'stories' | 'about',
  // Styles
  barChartClassName: ?string,
  className: ?string,
  contentClassName: ?string,
  overviewChartClassName: ?string,
  paymentBlockClassName: ?string,
  paymentBlockTitleClassName: ?string,
  paymentClassName: ?string,
  paymentListClassName: ?string,
  paymentsPeriodClassName: ?string,
  pieChartClassName: ?string,
  //
  OverviewFooterClasses: ?FooterClasses,
  OverviewFooterProps: ?FooterProps,
}
