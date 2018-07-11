import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'

const styles = {
  root: {
    color: ({ color }) => color,
  },
  icon: {
    display: 'inline-block',
    content: '" "',
    width: ({ size }) => size,
    height: ({ size }) => size,
    borderRadius: '50%',
    background: ({ color }) => color,
    stroke: ({ color }) => color,
    fill: ({ color }) => color,
  },
  name: {
    paddingLeft: 10,
  },
}

const CategoryLabel = ({ className, classes, name }) => (
  <div className={cx(classes.root, className)}>
    <span className={classes.icon} />
    <span className={classes.name}>{name}</span>
  </div>
)

export default injectStyles(styles)(CategoryLabel)
