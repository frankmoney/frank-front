import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'

const styles = {
  root: {
    display: 'flex',
    borderRight: '1px solid rgba(37, 43, 67, 0.08)',
    marginRight: 20,
    padding: [0, 20, 0, 5],
  },
  icon: {
    width: 24,
    height: 24,
    color: ({ focus, invalid }) =>
      invalid ? '#c40a0a' : focus ? '#484DE7' : 'rgba(37, 43, 67, 0.2)',
    alignSelf: 'center',
  },
}

const FieldIcon = ({
  classes,
  className,
  iconComponent: Icon,
  focus,
  invalid,
  ...otherProps
}) => (
  <div className={cx(className, classes.root)} {...otherProps}>
    <Icon className={classes.icon} />
  </div>
)

export default injectStyles(styles)(FieldIcon)
