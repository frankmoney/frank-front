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

export type Handlers = {
  onCategoryClick: ?(Category) => void,
  onLabelMouseEnter: ?(number) => void,
  onLabelMouseLeave: ?(number) => void,
}

export type Props = {
  activeCategoryIndex: ?number,
  data: CategoryListData,
  valueUnit: ?string,
} & Handlers

export type Classes = {
  iconClassName: ?string,
  itemClassName: ?string,
  nameClassName: ?string,
  valueClassName: ?string,
}
