import React from 'react'
import { Select2 } from '@frankmoney/components'
import DrawerField from 'components/DrawerField'
import { ORDERED_TEAM_ROLES, TEAM_ROLE_TITLES } from 'const'

const RoleField = ({ value, onChange }) => (
  <DrawerField title="Role">
    <Select2 value={value} underline fullWidth onChange={onChange}>
      {ORDERED_TEAM_ROLES.map(role => (
        <Select2.Option key={role} value={role}>
          {TEAM_ROLE_TITLES[role]}
        </Select2.Option>
      ))}
    </Select2>
  </DrawerField>
)

export default RoleField
