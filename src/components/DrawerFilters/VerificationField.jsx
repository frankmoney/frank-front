import React from 'react'
import Drawer from 'components/kit/Drawer'
import SelectField from 'components/kit/SelectField'
import { MenuItem } from 'components/kit/Menu'

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
  <Drawer.Field label="Verification">
    <SelectField
      value={parseValue(value)}
      onChange={v => onChange(formatValue(v))}
    >
      <MenuItem value="all" label="All payments" />
      <MenuItem value="verified" label="Verified only" />
      <MenuItem value="not_verified" label="Not verified only" />
    </SelectField>
  </Drawer.Field>
)

export default VerificationField
