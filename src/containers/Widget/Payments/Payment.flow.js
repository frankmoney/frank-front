// @flow
import type { InjectStylesProps } from 'utils/styles'
import type { Category } from 'data/models/category'

export type PaymentProps = {|
  amount: number,
  category: Category,
  description: string,
  peerName: string,
  postedOn: string,
|}

export type Props = {|
  ...PaymentProps,
  ...InjectStylesProps,
  //
  showCategory: boolean,
|}
