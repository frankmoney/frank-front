import React from 'react'
import TextBox from 'components/kit/TextBox'
import Field from 'components/kit/fields/Field'

const TextField = ({ multiLine, readOnly, type, name, ...otherProps }) => (
  <Field {...otherProps}>
    <TextBox
      multiLine={multiLine}
      readOnly={readOnly}
      type={type}
      name={name}
    />
  </Field>
)

export default TextField
