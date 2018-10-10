import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'

const styles = {
  root: {
    display: 'block', // override if root component set to 'a' for example
    cursor: 'pointer',
    width: 130,
    height: 130,
  },
  selected: {
    cursor: 'unset',
    opacity: 0.5,
  },
}

const ImageListItem = ({
  classes,
  className,
  selected,
  value,
  ...otherProps
}) => (
  <img
    className={cx(classes.root, selected && classes.selected, className)}
    {...otherProps}
  />
)

export default injectStyles(styles)(ImageListItem)
