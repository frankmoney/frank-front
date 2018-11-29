// @flow
import type {
  CategoryCb,
  CategoryListComponent,
  CategoryListPieChartRootComponent,
  PieChartCategories,
} from 'components/OverviewPieChart'
import type { InjectStylesProps } from 'utils/styles'

export type Props = {|
  ...InjectStylesProps,
  //
  CategoryList?: CategoryListComponent,
  categoryType: string,
  data: PieChartCategories,
  onCategoryClick: CategoryCb,
  onCategoryTypeChange: CategoryCb,
  pieChartRootComponent?: CategoryListPieChartRootComponent,
  widgetSize: 375 | 500 | 625 | 800,
  // Styles
  periodSelectClassName?: string,
  pieClassName?: string,
|}
