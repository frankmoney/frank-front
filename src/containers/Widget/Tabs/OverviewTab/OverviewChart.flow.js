// @flow
import type {
  CategoryListComponent,
  CategoryListPieChartRootComponent,
} from 'components/CategoryListPieChart'
import type { Category, CategoryCb } from 'components/CategoryList'
import type { InjectStylesProps } from 'utils/styles'

export type Props = {|
  ...InjectStylesProps,
  //
  CategoryList?: CategoryListComponent,
  categoryType: string,
  data: Array<Category>,
  onCategoryClick: CategoryCb,
  onCategoryTypeChange: CategoryCb,
  pieChartRootComponent?: CategoryListPieChartRootComponent,
  widgetSize: 375 | 500 | 625 | 800,
  // Styles
  periodSelectClassName?: string,
  pieClassName?: string,
|}
