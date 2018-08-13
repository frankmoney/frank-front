import React from 'react'
import { CheckedMenuItem } from '@frankmoney/components'
import SelectField from 'components/SelectField'
import Field from './Field'

const VerificationField = ({ value, onChange }) => (
  <Field title="Verification">
    <SelectField
      value={value || 'all'}
      fullWidth
      onChange={({ target }) => onChange(target.value)}
    >
      <CheckedMenuItem value="all">All payments</CheckedMenuItem>
      <CheckedMenuItem value="verified">Verified only</CheckedMenuItem>
      <CheckedMenuItem value="not_verified">Not verified only</CheckedMenuItem>
    </SelectField>
  </Field>
)

export default VerificationField
