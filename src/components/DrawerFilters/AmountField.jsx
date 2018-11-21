// @flow strict-local
import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import TextField from 'components/kit/TextField'
import Drawer from 'components/kit/Drawer'

const styles = {
  wrap: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  field: {
    flexGrow: 1,
    '&:not(:last-child)': {
      marginRight: 20,
    },
  },
}

const parseNumber = value => {
  const number = parseInt(value, 10)
  return isNaN(number) ? null : number
}

const AmountField = ({ classes, from, to, onChange }) => (
  <Drawer.Field label="Amount">
    <div className={classes.wrap}>
      <TextField
        stretch
        value={from || ''}
        label="min"
        onChange={value => onChange({ min: parseNumber(value), max: to })}
        className={classes.field}
      />
      <TextField
        value={to || ''}
        label="max"
        onChange={value => onChange({ min: from, max: parseNumber(value) })}
        className={classes.field}
      />
    </div>
  </Drawer.Field>
)

export default injectStyles(styles)(AmountField)
