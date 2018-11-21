import React from 'react'
import Drawer from 'components/kit/Drawer'
import { MenuItem } from 'components/kit/Menu'
import SelectField from 'components/kit/SelectField'
import { ORDERED_TEAM_ROLES, TEAM_ROLE_TITLES } from 'const'

const RoleField = ({ value, onChange }) => (
  <Drawer.Field label="Role">
    <SelectField stretch value={value} onChange={onChange}>
      {ORDERED_TEAM_ROLES.map(role => (
        <MenuItem value={role} label={TEAM_ROLE_TITLES[role]} />
      ))}
    </SelectField>
  </Drawer.Field>
)

export default RoleField
