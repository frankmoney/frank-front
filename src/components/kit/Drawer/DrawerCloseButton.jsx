// @flow strict-local
import React from 'react'
import CloseIcon from 'components/icons/CloseIcon.svg'
import DrawerHeaderButton from './DrawerHeadButton'
import DrawerContext from './context'

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
