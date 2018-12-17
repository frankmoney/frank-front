import React from 'react'
import { Title as TitleIcon } from 'material-ui-icons'
import TextBox, { type TextBoxProps } from 'components/kit/TextBox'
import IconField, { type IconFieldProps } from 'components/kit/fields/IconField'

type Props = {
  ...TextBoxProps,
  ...IconFieldProps,
}

const TitleField = ({ name, ...otherProps }: Props) => (
  <IconField stretch larger icon={TitleIcon} {...otherProps}>
    <TextBox multiline disableAutoComplete disableEnter name={name} />
  </IconField>
)

export default TitleField
