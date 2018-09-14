import React from 'react'
import TextBox from 'components/TextBox/index'
import DrawerField from 'components/DrawerField/index'

const EmailField = ({ value, onChange }) => (
  <DrawerField title="Email">
    <TextBox
      placeholder="example@mail.com"
      value={value}
      onChange={({ target }) => onChange(target.value)}
    />
  </DrawerField>
)

export default EmailField
