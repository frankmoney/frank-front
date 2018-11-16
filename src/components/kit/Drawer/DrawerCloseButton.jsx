// @flow strict-local
import React from 'react'
import DrawerHeaderButton from './DrawerHeadButton'
import DrawerContext from './context'
import CloseIcon from './CloseIcon.svg'

const DrawerCloseButton = props => (
  <DrawerContext.Consumer>
    {({ close }) => (
      <DrawerHeaderButton onClick={close} {...props}>
        <CloseIcon />
      </DrawerHeaderButton>
    )}
  </DrawerContext.Consumer>
)

export default DrawerCloseButton
