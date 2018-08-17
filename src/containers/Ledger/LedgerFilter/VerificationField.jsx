import React from 'react'
import { CheckedMenuItem } from '@frankmoney/components'
import SelectField from 'components/SelectField'
import Field from './Field'

const formatValue = value => {
  switch (value) {
    case 'verified':
      return true
    case 'not_verified':
      return false
    default:
      return null
  }
}

const parseValue = value => {
  switch (value) {
    case true:
      return 'verified'
    case false:
      return 'not_verified'
    default:
      return 'all'
  }
}

const VerificationField = ({ value, onChange }) => (
  <Field title="Verification">
    <SelectField
      value={parseValue(value)}
      fullWidth
      onChange={({ target }) => onChange(formatValue(target.value))}
    >
      <CheckedMenuItem value="all">All payments</CheckedMenuItem>
      <CheckedMenuItem value="verified">Verified only</CheckedMenuItem>
      <CheckedMenuItem value="not_verified">Not verified only</CheckedMenuItem>
    </SelectField>
  </Field>
)

export default VerificationField
