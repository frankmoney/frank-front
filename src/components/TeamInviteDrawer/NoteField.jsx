import React from 'react'
import TextField from 'components/kit/TextField'
import Drawer from 'components/kit/Drawer'

const NoteField = ({ value, onChange }) => (
  <Drawer.Field label="Note">
    <TextField
      placeholder="Please help me out with connecting our bank account to Frank"
      multiLine
      minLines={2}
      value={value}
      onChange={onChange}
    />
  </Drawer.Field>
)

export default NoteField
