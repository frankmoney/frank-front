import React from 'react'
import { CheckedMenuItem } from '@frankmoney/components'
import SelectField from 'components/SelectField'
import Field from './Field'

const DateRangeField = ({ value, onChange }) => (
  <Field title="Date range">
    <SelectField
      value={value || 'all'}
      fullWidth
      onChange={({ target }) => onChange(target.value)}
    >
      <CheckedMenuItem value="all">All</CheckedMenuItem>
      <CheckedMenuItem value="2018">2018</CheckedMenuItem>
      <CheckedMenuItem value="2017">2017</CheckedMenuItem>
      <CheckedMenuItem value="12_months">Last 12 months</CheckedMenuItem>
      <CheckedMenuItem value="3_months">Last 3 months</CheckedMenuItem>
      <CheckedMenuItem value="may_2018">May 2018</CheckedMenuItem>
      <CheckedMenuItem value="april_2018">April 2018</CheckedMenuItem>
    </SelectField>
  </Field>
)

export default DateRangeField
