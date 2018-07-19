import React from 'react'
import TextBox from 'components/TextBox'
import Field from './Field'

const NoteField = ({ value, onChange }) => (
  <Field title="Note">
    <TextBox
      expand="vertically"
      value={value}
      onChange={({ target }) => onChange(target.value)}
    />
  </Field>
)

export default NoteField
