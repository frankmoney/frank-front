import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'baseline',
    margin: [0, 30],
    marginBottom: 35,
    flexShrink: 0,
  },
  label: {
    width: 140,
    minWidth: 140,
    marginBottom: 0,
    color: '#252b43',
    flexShrink: 0,
    marginRight: 10,
    ...theme.fontMedium(18, 26),
  },
  control: {
    flex: 1,
  },
})

const DrawerField = ({
  theme,
  classes,
  className,
  label,
  children,
  ...otherProps
}) => (
  <div className={cx(classes.root, className)} {...otherProps}>
    {label && <div className={classes.label}>{label}</div>}
    <div className={classes.control}>{children}</div>
  </div>
)

export default injectStyles(styles)(DrawerField)
