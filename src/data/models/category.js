// @flow strict

export type Category = {|
  color: string,
  id: string,
  name: string,
|}

export type GraphqlCategoryType = 'revenue' | 'spending'

export type CategoryType = 'income' | 'spending'
