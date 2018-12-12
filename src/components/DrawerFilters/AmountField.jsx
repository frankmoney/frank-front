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

const AmountField = ({ classes, min, max, from, to, onChange }) => (
  <Drawer.Field label="Amount">
    <div className={classes.wrap}>
      <TextField
        stretch
        value={from || ''}
        label="min"
        placeholder={min}
        onChange={({ target: { value } }) =>
          onChange({ min: parseNumber(value), max: to })
        }
        className={classes.field}
        adornment="$"
        adornmentWidth={12}
      />
      <TextField
        value={to || ''}
        label="max"
        placeholder={max}
        onChange={({ target: { value } }) =>
          onChange({ min: from, max: parseNumber(value) })
        }
        className={classes.field}
        adornment="$"
        adornmentWidth={12}
      />
    </div>
  </Drawer.Field>
)

export default injectStyles(styles)(AmountField)
