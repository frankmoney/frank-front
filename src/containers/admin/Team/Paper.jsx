import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import ListLayoutContentPaper from 'components/ListLayoutContentPaper'

const styles = {
  root: {
    padding: 0,
  },
}

const Paper = ({ theme, classes, className, ...otherProps }) => (
  <ListLayoutContentPaper
    className={cx(className, classes.root)}
    {...otherProps}
  />
)

export default injectStyles(styles)(Paper)
