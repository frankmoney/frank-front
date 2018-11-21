import React from 'react'
import TextField from 'components/kit/TextField'
import Drawer from 'components/kit/Drawer'

const EmailField = ({ value, onChange }) => (
  <Drawer.Field label="Email">
    <TextField
      placeholder="example@mail.com"
      value={value}
      onChange={onChange}
      stretch
    />
  </Drawer.Field>
)

export default EmailField
