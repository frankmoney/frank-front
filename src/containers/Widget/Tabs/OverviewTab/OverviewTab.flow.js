// @flow
import type {
  CategoryListComponent,
  CategoryListPieChartRootComponent,
} from 'components/CategoryListPieChart'
import type { CategoryCb } from 'components/CategoryList'
import type { FooterClasses, FooterProps } from 'containers/Widget/Footer'
import type { GroupedPieData } from 'data/models/pieData'

type EmptyCb = () => void

export type Props = {|
  categoryCount: ?number,
  CategoryList: ?CategoryListComponent,
  categoryType: string,
  data: GroupedPieData,
  paymentCount: ?number,
  pieChartRootComponent: ?CategoryListPieChartRootComponent,
  showTotals: ?boolean,
  widgetSize: 375 | 400 | 500 | 625 | 800,
  // Handlers
  onCategoryClick: CategoryCb,
  onCategoryTypeChange: CategoryCb,
  onSeeAllClick: EmptyCb,
  // Styles
  classes: Object,
  className: ?string,
  chartClassName: ?string,
  contentClassName: ?string,
  periodSelectClassName: ?string,
  pieClassName: ?string,
  //
  FooterClasses: ?FooterClasses,
  FooterProps: ?FooterProps,
|}
