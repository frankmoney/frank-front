// @flow strict

export type Category = {|
  color: string,
  index: number,
  name: string,
  value: number,
|}

export type CategoryListData = {|
  items: Array<Category>,
  other: ?Category,
  tooltipItems: Array<Category>,
|}

export type CategoryCb = Category => void
