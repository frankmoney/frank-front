import React from 'react'
import TextField from 'components/kit/TextField/index'
import Drawer from 'components/kit/Drawer/index'

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
