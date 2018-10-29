// @flow

export type FooterClasses = {|
  root: ?string,
  seeAll: ?string,
|}

export type FooterProps = {|
  hideIcon: ?boolean,
  hideVerifiedBy: ?boolean,
|}

type EmptyCb = () => void

export type Props = FooterProps & {|
  Classes: ?FooterClasses,
  classes: Object,
  className: ?string,
  onSeeAllClick: ?EmptyCb,
  categoryCount: ?number,
  paymentCount: number,
|}
