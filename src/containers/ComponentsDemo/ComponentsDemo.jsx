import React from 'react'
import { Currency, Paper } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'

const Item = injectStyles({
  root: {
    margin: 5,
    padding: 5,
    background: '#e9e9e9',
  },
  wrap: {
    background: '#efefef',
  },
})(({ classes, children }) => (
  <Paper className={classes.root}>
    <div className={classes.wrap}>{children}</div>
  </Paper>
))

const ComponentsDemo = () => (
  <div>
    <Item>
      <Currency value={1625.4} />
    </Item>
  </div>
)

export default ComponentsDemo
