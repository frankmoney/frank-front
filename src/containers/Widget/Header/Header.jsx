// @flow
import * as React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
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

type Props = {
  children: React.Element<any>,
  classes: Object,
  className: ?string,
  live: boolean,
  liveClassName: ?string,
}

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
