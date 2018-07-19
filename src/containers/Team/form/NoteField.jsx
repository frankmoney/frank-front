import React from 'react'
import TextBox from 'components/TextBox'
import Field from './Field'

const NoteField = ({ value }) => (
  <Field title="Note">
    <TextBox expand="vertically" value={value} />
  </Field>
)

export default NoteField
