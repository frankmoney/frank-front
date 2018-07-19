import React from 'react'
import { Switch } from '@frankmoney/components'
import colors from 'styles/colors'
import Field from './Field'

const CanInviteField = ({ checked, onChange }) => (
  <Field title="Can invite teammates">
    <Switch
      color={colors.green}
      checked={checked}
      onChange={({ target }) => onChange(target.checked)}
    />
  </Field>
)

export default CanInviteField
