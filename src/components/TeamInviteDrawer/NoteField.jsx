import React from 'react'
import TextBox from 'components/TextBox/index'
import DrawerField from 'components/DrawerField/index'

const NoteField = ({ value, onChange }) => (
  <DrawerField title="Note">
    <TextBox
      placeholder="Please help me out with connecting our bank account to Frank"
      expand="vertically"
      value={value}
      onChange={({ target }) => onChange(target.value)}
      minLines={2}
    />
  </DrawerField>
)

export default NoteField
