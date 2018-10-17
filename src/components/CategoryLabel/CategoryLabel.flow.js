// @flow

type Classes = {
  activeClassName: ?string,
  iconClassName: ?string,
  nameClassName: ?string,
  valueClassName: ?string,
}

export type Props = {
  active: ?boolean,
  color: ?string,
  name: ?string,
  value: ?number,
  valueUnit: ?string,
} & Classes
