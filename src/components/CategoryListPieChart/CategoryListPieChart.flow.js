// @flow
import * as React from 'react'
import type { CategoryListProps, CategoryCb } from 'components/CategoryList'
import type { Categories } from 'components/CategoryListPieChart'

export type CategoryListComponent = React.ComponentType<CategoryListProps>

export type CategoryListPieChartRootComponent = React.ComponentType<any>

export type Props = {
  CategoryList: CategoryListComponent,
  categoryType: string,
  categoryTypeSelectLabel: ?string,
  chartSize: number,
  component: CategoryListPieChartRootComponent,
  data: Categories,
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
