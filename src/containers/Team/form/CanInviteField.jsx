import React from 'react'
import { Switch } from '@frankmoney/components'
import colors from 'styles/colors'
import DrawerField from 'components/DrawerField'

const CanInviteField = ({ checked, onChange }) => (
  <DrawerField title="Can invite teammates">
    <Switch
      color={colors.green}
      checked={checked}
      onChange={({ target }) => onChange(target.checked)}
    />
  </DrawerField>
)

export default CanInviteField
