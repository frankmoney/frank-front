import React from 'react'
import TextBox from 'components/TextBox'
import DrawerField from 'components/DrawerField'

const EmailField = ({ value, onChange }) => (
  <DrawerField title="Email">
    <TextBox value={value} onChange={({ target }) => onChange(target.value)} />
  </DrawerField>
)

export default EmailField
