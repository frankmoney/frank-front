// @flow

type EmptyCb = () => void

export type Props = {
  active: ?boolean,
  color: ?string,
  name: ?string,
  value: ?number,
  valueUnit: ?string,
  // Handlers
  onClick: ?EmptyCb,
  onMouseEnter: ?EmptyCb,
  onMouseLeave: ?EmptyCb,
  // Classes
  classes: Object,
  className: ?string,
  activeClassName: ?string,
  iconClassName: ?string,
  nameClassName: ?string,
  valueClassName: ?string,
}
