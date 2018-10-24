// @flow
import type { CategoryListData } from 'components/CategoryList'

interface CategoryLike {
  name: string;
  value: number;
  color: ?string;
}

export type Categories = Array<CategoryLike>

export type LimitCategoriesFn = number => Categories => CategoryListData
