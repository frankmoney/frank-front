// @flow

type Category = {
  color: string,
  index: number,
  name: string,
  value: number,
}

export type CategoryListData = {
  items: Array<Category>,
  other: ?Category,
  tooltipItems: Array<Category>,
}

export type CategoryCb = Category => void

export type Handlers = {
  onCategoryClick: ?CategoryCb,
  onLabelMouseEnter: ?(number) => void,
  onLabelMouseLeave: ?() => void,
}

export type CategoryListProps = {
  activeCategoryIndex: ?number,
  data: CategoryListData,
  valueUnit: ?string,
} & Handlers

type Classes = {
  iconClassName: ?string,
  itemClassName: ?string,
  nameClassName: ?string,
  valueClassName: ?string,
}

export type Props = CategoryListProps & Classes
