import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'

const styles = {
  root: {
    position: 'absolute',
    right: 0,
    top: 2,
    color: '#C70000',
    fontSize: 14,
    lineHeight: 14,
    transition: 'opacity 0.1s linear, color 0.1s linear',
  },
  active: {},
}

const Error = ({ classes, active, className, children }) => (
  <div className={cx(classes.root, active && classes.active, className)}>
    {children}
  </div>
)

export default injectStyles(styles)(Error)
