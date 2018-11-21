// @flow strict-local
import React from 'react'
import Drawer from 'components/kit/Drawer'
import SelectField from 'components/kit/SelectField'
import { MenuItem } from 'components/kit/Menu'

type Value = 'verified' | 'not_verified' | 'all'

type Props = {|
  value: Value,
  onChange: (?boolean) => void,
|}

const formatValue = (value: Value) => {
  switch (value) {
    case 'verified':
      return true
    case 'not_verified':
      return false
    default:
      return null
  }
}

const parseValue = (value: Value) => {
  switch (value) {
    case true:
      return 'verified'
    case false:
      return 'not_verified'
    default:
      return 'all'
  }
}

const VerificationField = ({ value, onChange }: Props) => (
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
