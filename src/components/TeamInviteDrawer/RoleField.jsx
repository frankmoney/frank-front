import React from 'react'
import { Select2 } from '@frankmoney/components'
import DrawerField from 'components/DrawerField'
import { TEAM_ROLE_TEXT, TEAM_ROLE } from 'const'

const renderTeamRoleOption = role => (
  <Select2.Option value={role}>{TEAM_ROLE_TEXT[role]}</Select2.Option>
)

const RoleField = ({ value, onChange }) => (
  <DrawerField title="Role">
    <Select2 value={value} underline fullWidth onChange={onChange}>
      {renderTeamRoleOption(TEAM_ROLE.admin)}
      {renderTeamRoleOption(TEAM_ROLE.manager)}
      {renderTeamRoleOption(TEAM_ROLE.observer)}
    </Select2>
  </DrawerField>
)

export default RoleField
