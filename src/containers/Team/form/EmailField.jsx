import React from 'react'
import TextBox from 'components/TextBox'
import Field from './Field'

const EmailField = ({ value }) => (
  <Field title="Email">
    <TextBox value={value} />
  </Field>
)

export default EmailField
