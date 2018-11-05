// @flow
import * as React from 'react'
import cx from 'classnames'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import LiveIndicator from './LiveIndicator'

const styles = {
  root: {
    borderBottom: '1px solid #E9EAEC',
    display: 'flex',
    margin: [0, 2, 11],
    minHeight: 64,
    position: 'relative',
  },
}

type Props = {|
  ...InjectStylesProps,
  //
  children?: React.Node,
  live: boolean,
  liveClassName?: string,
|}

const Header = ({
  classes,
  className,
  children,
  live,
  liveClassName,
}: Props) => (
  <div className={cx(classes.root, className)}>
    {children}
    {live && <LiveIndicator className={cx(classes.live, liveClassName)} />}
  </div>
)

Header.defaultProps = {
  live: true,
}

export default injectStyles(styles)(Header)
