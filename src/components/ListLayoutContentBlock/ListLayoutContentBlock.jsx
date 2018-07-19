import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'

const styles = {
  root: {
    marginBottom: ({ grid }) => grid.fixed.gutterSize,
  },
}

const ListLayoutContentBlock = ({
  theme,
  grid,
  classes,
  className,
  ...otherProps
}) => <div className={cx(className, classes.root)} {...otherProps} />

export default injectStyles(styles, { grid: true })(ListLayoutContentBlock)
