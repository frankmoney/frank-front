import React from 'react'
import { TextField } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import Field from './Field'

const styles = {
  wrap: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  field: {
    width: 155,
  },
}

const DateRangeField = ({ classes, from, to, onChange }) => (
  <Field title="Amount">
    <div className={classes.wrap}>
      <TextField
        value={from || ''}
        label="min"
        type="currency"
        onChange={({ target }) => onChange({ min: target.value, max: to })}
        className={classes.field}
      />
      <TextField
        value={to || ''}
        label="max"
        type="currency"
        onChange={({ target }) => onChange({ min: from, max: target.value })}
        className={classes.field}
      />
    </div>
  </Field>
)

export default injectStyles(styles)(DateRangeField)
