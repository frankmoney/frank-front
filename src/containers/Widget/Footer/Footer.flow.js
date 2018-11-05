// @flow
import type { InjectStylesProps } from 'utils/styles'

export type FooterClasses = {|
  root: string,
  seeAll: string,
|}

export type FooterProps = {|
  hideIcon?: boolean,
  hideVerifiedBy?: boolean,
|}

type EmptyCb = () => void

export type Props = {|
  ...FooterProps,
  ...InjectStylesProps,
  //
  Classes: ?FooterClasses,
  onSeeAllClick?: EmptyCb,
  categoryCount?: number,
  paymentCount?: number,
|}
