import React from 'react'
import TextBox from 'components/TextBox'
import Field from './Field'

const EmailField = ({ value, onChange }) => (
  <Field title="Email">
    <TextBox value={value} onChange={({ target }) => onChange(target.value)} />
  </Field>
)

export default EmailField
