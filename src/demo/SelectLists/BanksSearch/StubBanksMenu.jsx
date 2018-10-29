import React from 'react'
import Menu from 'components/kit/Menu'
import SwitchMenuItem from 'components/kit/Menu/SwitchMenuItem'
import data from './banks.json'

export default props => (
  <Menu multiple {...props}>
    {data.map(({ code, name }) => (
      <SwitchMenuItem key={name} value={code} label={name} />
    ))}
  </Menu>
)
