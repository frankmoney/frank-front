// @flow strict-local
import React from 'react'
import DrawerHeaderButton from './DrawerHeaderButton'
import MaximizeIcon from './MaximizeIcon.svg'

const DrawerMaximizeButton = props => (
  <DrawerHeaderButton {...props}>
    <MaximizeIcon />
  </DrawerHeaderButton>
)

export default DrawerMaximizeButton
