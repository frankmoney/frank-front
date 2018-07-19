import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'

const styles = {
  root: {
    width: ({ grid }) => grid.fixed.contentWidth,
    margin: [0, 'auto'],
    paddingTop: 110,
  },
}

const ListLayoutContent = ({
  theme,
  grid,
  classes,
  className,
  ...otherProps
}) => <div className={cx(className, classes.root)} {...otherProps} />

export default injectStyles(styles, { grid: true })(ListLayoutContent)
