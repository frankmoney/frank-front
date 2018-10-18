// @flow
import * as React from 'react'
import type {
  Category,
  CategoryListProps,
  CategoryCb,
} from 'components/CategoryList'

export type CategoryListComponent = React.ComponentType<CategoryListProps>

export type CategoryListPieChartRootComponent = React.ComponentType<any>

export type Props = {
  CategoryList: CategoryListComponent,
  categoryType: string,
  categoryTypeSelectLabel: ?string,
  chartSize: number,
  component: CategoryListPieChartRootComponent,
  data: Array<Category>,
  // Handlers
  onCategoryClick: ?CategoryCb,
  onCategoryTypeChange: ?CategoryCb,
  // Styles
  classes: Object,
  className: ?string,
  categoryTypeSelectClassName: ?string,
  chartClassName: ?string,
}

export type State = {
  activeCategoryIndex: ?number,
}
