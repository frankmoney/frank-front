import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
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

const Header = ({ classes, className, children, live, liveClassName }) => (
  <div className={cx(classes.root, className)}>
    {children}
    {live && <LiveIndicator className={cx(classes.live, liveClassName)} />}
  </div>
)

Header.propTypes = {
  live: PropTypes.bool,
  liveClassName: PropTypes.string,
}

Header.defaultProps = {
  live: true,
}

export default injectStyles(styles)(Header)
