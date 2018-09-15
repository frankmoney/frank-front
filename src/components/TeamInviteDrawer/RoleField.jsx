import React from 'react'
import { Select2 } from '@frankmoney/components'
import DrawerField from 'components/DrawerField'
import { ROLES } from 'const'

const RoleField = ({ value, onChange }) => (
  <DrawerField title="Role">
    <Select2 value={value} underline fullWidth onChange={onChange}>
      {Array.from(ROLES.values()).map(({ role, title }) => (
        <Select2.Option key={role} value={role}>
          {title}
        </Select2.Option>
      ))}
    </Select2>
  </DrawerField>
)

export default RoleField
