// @flow strict-local
import * as React from 'react'
import cx from 'classnames'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import LiveIndicator from './LiveIndicator'

const styles = {
  root: {
    borderBottom: '1px solid #E9EAEC',
    display: 'flex',
    margin: [0, 2, 11],
    minHeight: 65,
    position: 'relative',
  },
  small: {
    minHeight: 59,
    margin: [0, 1, 8],
  },
}

type Props = {|
  ...InjectStylesProps,
  //
  children: React.Node,
  live: boolean,
  liveClassName?: string,
  small?: boolean,
|}

const Header = ({
  classes,
  className,
  children,
  live,
  liveClassName,
  small,
}: Props) => (
  <div className={cx(classes.root, { [classes.small]: small }, className)}>
    {React.Children.map(
      children,
      headerItem =>
        headerItem &&
        React.cloneElement(headerItem, {
          small,
        })
    )}
    {live &&
      !small && <LiveIndicator className={cx(classes.live, liveClassName)} />}
  </div>
)

Header.defaultProps = {
  live: true,
}

export default injectStyles(styles)(Header)
