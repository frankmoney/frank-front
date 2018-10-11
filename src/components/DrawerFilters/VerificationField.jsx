import React from 'react'
import { CheckedMenuItem } from '@frankmoney/components'
import DrawerField from 'components/DrawerField'
import SelectField from 'components/SelectField'

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
  <DrawerField title="Verification">
    <SelectField
      value={parseValue(value)}
      fullWidth
      onChange={({ target }) => onChange(formatValue(target.value))}
    >
      <CheckedMenuItem value="all">All payments</CheckedMenuItem>
      <CheckedMenuItem value="verified">Verified only</CheckedMenuItem>
      <CheckedMenuItem value="not_verified">Not verified only</CheckedMenuItem>
    </SelectField>
  </DrawerField>
)

export default VerificationField
