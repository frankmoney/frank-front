// @flow strict-local
import React from 'react'
import { isNil } from 'ramda'
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

const formattedValue = value => (isNil(value) ? '' : value)

const AmountField = ({ classes, min, max, from, to, onChange }) => (
  <Drawer.Field label="Amount">
    <div className={classes.wrap}>
      <TextField
        stretch
        value={formattedValue(from)}
        label="min"
        placeholder={min}
        onChange={({ target: { value } }) => onChange({ min: value, max: to })}
        className={classes.field}
        adornment="$"
        adornmentWidth={12}
        numeric
      />
      <TextField
        value={formattedValue(to)}
        label="max"
        placeholder={max}
        onChange={({ target: { value } }) =>
          onChange({ min: from, max: value })
        }
        className={classes.field}
        adornment="$"
        adornmentWidth={12}
        numeric
      />
    </div>
  </Drawer.Field>
)

export default injectStyles(styles)(AmountField)
