import React from 'react'
import { Select2 } from '@frankmoney/components'
import DrawerField from 'components/DrawerField'

const RoleField = ({ value, onChange }) => (
  <DrawerField title="Role">
    <Select2 value={value} underline fullWidth onChange={onChange}>
      <Select2.Option value="admin">Administrator</Select2.Option>
      <Select2.Option value="manager">Manager</Select2.Option>
      <Select2.Option value="observer">Observer</Select2.Option>
    </Select2>
  </DrawerField>
)

export default RoleField
