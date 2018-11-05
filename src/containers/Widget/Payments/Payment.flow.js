// @flow
import type { InjectStylesProps } from 'utils/styles'

type Category = {|
  name: string,
  color: string,
|}

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
