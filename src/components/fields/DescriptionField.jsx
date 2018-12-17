import React from 'react'
import { Subject as DescriptionIcon } from 'material-ui-icons'
import TextBox, { type TextBoxProps } from 'components/kit/TextBox'
import IconField, { type IconFieldProps } from 'components/kit/fields/IconField'

type Props = {
  ...TextBoxProps,
  ...IconFieldProps,
}

const DescriptionField = ({
  name,
  inputComponent: Input,
  ...otherProps
}: Props) => (
  <IconField stretch icon={DescriptionIcon} {...otherProps}>
    {Input ? (
      <Input />
    ) : (
      <TextBox multiline disableAutoComplete disableEnter name={name} />
    )}
  </IconField>
)

export default DescriptionField
