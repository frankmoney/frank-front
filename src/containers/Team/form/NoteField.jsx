import React from 'react'
import TextBox from 'components/TextBox'
import DrawerField from 'components/DrawerField'

const NoteField = ({ value, onChange }) => (
  <DrawerField title="Note">
    <TextBox
      expand="vertically"
      value={value}
      onChange={({ target }) => onChange(target.value)}
    />
  </DrawerField>
)

export default NoteField
