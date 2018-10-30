import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { ArrowDropDown } from 'material-ui-icons'

const styles = theme => ({
  root: {
    color: 'rgba(37, 43, 67, 0.7)',
    height: 40,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  value: {
    ...theme.fontMedium(18, 26),
  },
  arrow: {
    marginLeft: 5,
  },
})

const SelectValue = ({ classes, className, theme, value, ...otherProps }) => (
  <div className={cx(classes.root, className)} {...otherProps}>
    <div className={classes.value}>{value}</div>
    <ArrowDropDown className={classes.arrow} />
  </div>
)

export default injectStyles(styles)(SelectValue)
