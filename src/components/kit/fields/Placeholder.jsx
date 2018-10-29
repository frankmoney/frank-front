import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'

const styles = theme => ({
  root: {
    color: 'rgba(37, 43, 67, 0.2)',
    whiteSpace: 'wrap',
    transition: [theme.transition('opacity'), theme.transition('color')].join(
      ','
    ),
    font: 'inherit',
    pointerEvents: 'none',
    opacity: 1,
  },
  active: {
    color: 'rgba(37, 43, 67, 0.1)',
  },
})

const Placeholder = ({
  classes,
  active,
  className,
  children,
  theme,
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
