import React from 'react'
import { Currency, Paper } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import CurrencyAndSign from 'components/CurrencyAndSign'

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
      <CurrencyAndSign value={1} />
    </Item>
    <Item>
      <Currency value={1625.4} />
    </Item>

    <div style={{ background: '#fff', color: '#ccc', padding: 5 }}>
      <div>
        <CurrencyAndSign value={1} />
      </div>
      <div>
        <CurrencyAndSign value={-1} />
      </div>
      <div>
        <CurrencyAndSign value={0} />
      </div>
    </div>
  </div>
)

export default ComponentsDemo
