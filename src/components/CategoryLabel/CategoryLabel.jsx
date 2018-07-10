import React from 'react'
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

const CategoryLabel = ({ classes, name }) => (
  <div className={classes.root}>
    <span className={classes.icon} />
    <span className={classes.name}>{name}</span>
  </div>
)

export default injectStyles(styles)(CategoryLabel)
