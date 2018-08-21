import React from 'react'
import { Field } from 'redux-form/immutable'
import TextBox from 'components/TextBox'

const TextAreaField = ({ className, placeholder, input }) => (
  <TextBox
    className={className}
    expand="vertically"
    placeholder={placeholder}
    disableUnderline
    {...input}
  />
)

const BigTextField = ({ ...props }) => (
  <Field component={TextAreaField} {...props} />
)

export default BigTextField
