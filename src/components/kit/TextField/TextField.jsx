// @flow strict-local
import React from 'react'
import TextBox, { type TextBoxProps } from 'components/kit/TextBox'
import Field, { type FieldProps } from 'components/kit/fields/Field'

type Props = {
  ...TextBoxProps,
  ...FieldProps,
}

export type TextFieldProps = Props

const TextField = ({
  multiLine,
  readOnly,
  type,
  name,
  ...otherProps
}: Props) => (
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