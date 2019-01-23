// @flow strict-local
import React from 'react'
import TextBox, { type TextBoxProps } from 'components/kit/TextBox'
import Field, { type FieldProps } from 'components/kit/fields/Field'

type Props = {
  ...TextBoxProps,
  ...FieldProps,
  //
  textBoxProps?: TextBoxProps,
}

const TextField = ({
  multiLine,
  readOnly,
  type,
  name,
  minLines,
  disableAutoComplete,
  disableEnter,
  numeric,
  textBoxProps,
  ...otherProps
}: Props) => (
  <Field {...otherProps}>
    <TextBox
      multiLine={multiLine}
      minLines={minLines}
      disableAutoComplete={disableAutoComplete}
      disableEnter={disableEnter}
      readOnly={readOnly}
      type={type}
      name={name}
      numeric={numeric}
      {...textBoxProps}
    />
  </Field>
)

export default TextField
