// @flow
import * as React from 'react'
import type { CategoryListProps, CategoryCb } from 'components/CategoryList'
import type { PieData } from 'components/Charts/Pie'

export type Props = {
  CategoryList: React.ComponentType<CategoryListProps>,
  categoryType: string,
  categoryTypeSelectLabel: ?string,
  chartSize: number,
  component: React.ComponentType<any>,
  data: PieData,
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
