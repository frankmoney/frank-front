import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'

const styles = theme => ({
  root: {
    color: '#20284A',
    opacity: 0.2,
    whiteSpace: 'wrap',
    transition: theme.transition('opacity'),
    font: 'inherit',
    pointerEvents: 'none',
  },
  active: {
    opacity: 0.1,
  },
})

const Placeholder = ({
  classes,
  active,
  className,
  children,
  ...otherProps
}) => (
  <span
    className={cx(classes.root, active && classes.active, className)}
    {...otherProps}
  >
    {children}
  </span>
)

export default injectStyles(styles)(Placeholder)
