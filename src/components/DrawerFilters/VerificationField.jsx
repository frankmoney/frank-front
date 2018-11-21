// @flow strict-local
import React from 'react'
import Drawer from 'components/kit/Drawer'
import SelectField from 'components/kit/SelectField'
import { MenuItem } from 'components/kit/Menu'

export type VerificationValue = 'verified' | 'not_verified' | 'all'

type Props = {|
  value?: boolean,
  onChange: (?boolean) => void,
|}

const formatValue = (value: VerificationValue): ?boolean => {
  switch (value) {
    case 'verified':
      return true
    case 'not_verified':
      return false
    default:
      return null
  }
}

const parseValue = (value: ?boolean): VerificationValue => {
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
      stretch
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
