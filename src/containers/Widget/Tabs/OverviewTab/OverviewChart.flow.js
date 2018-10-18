// @flow
import type {
  CategoryListComponent,
  CategoryListPieChartRootComponent,
} from 'components/CategoryListPieChart'
import type { Category, CategoryCb } from 'components/CategoryList'

export type Props = {
  CategoryList: ?CategoryListComponent,
  categoryType: string,
  data: Array<Category>,
  onCategoryClick: CategoryCb,
  onCategoryTypeChange: CategoryCb,
  pieChartRootComponent: ?CategoryListPieChartRootComponent,
  widgetSize: 375 | 500 | 625 | 800,
  // Styles
  classes: Object,
  className: ?string,
  periodSelectClassName: ?string,
  pieClassName: ?string,
}
