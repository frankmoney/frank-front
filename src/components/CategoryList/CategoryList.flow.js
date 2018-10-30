// @flow

export interface Category {
  color: string;
  index: number;
  name: string;
  value: number;
}

export type CategoryListData = {|
  items: Array<Category>,
  other: ?Category,
  tooltipItems: Array<Category>,
|}

export type CategoryCb = Category => void
type IndexCb = number => void
type EmptyCb = () => void

export type CategoryListProps = {|
  activeCategoryIndex: ?number,
  data: CategoryListData,
  valueUnit?: string,
  // Handlers
  onCategoryClick?: CategoryCb,
  onLabelMouseEnter?: IndexCb,
  onLabelMouseLeave?: EmptyCb,
  // Styles
  className?: string,
|}

type Classes = {|
  classes: Object,
  iconClassName?: string,
  itemClassName?: string,
  nameClassName?: string,
  valueClassName?: string,
|}

export type Props = {
  ...CategoryListProps,
  ...Classes,
}
