import React from 'react'
import { Drawer as KitDrawer } from '@frankmoney/components'
import { compose, setStatic } from 'recompose'
import DrawerContext from 'contexts/DrawerContext'
import Body from './Body'
import CloseButton from './CloseButton'
import MaximizeButton from './MaximizeButton'
import Title from './Title'
import Footer from './Footer'
import Header from './Header'

const Drawer = ({ children, onClose, ...otherProps }) => (
  <KitDrawer raw onClose={onClose} {...otherProps}>
    <DrawerContext.Provider value={{ onClose }}>
      {children}
    </DrawerContext.Provider>
  </KitDrawer>
)

export default compose(
  setStatic('Body', Body),
  setStatic('CloseButton', CloseButton),
  setStatic('MaximizeButton', MaximizeButton),
  setStatic('Title', Title),
  setStatic('Footer', Footer),
  setStatic('Header', Header)
)(Drawer)
