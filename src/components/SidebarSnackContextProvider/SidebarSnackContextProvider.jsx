import React from 'react'
import { SideBarContext } from '@frankmoney/components'
import SnackContext from 'components/kit/Snack/SnackContext'

const SidebarSnackContextProvider = ({ children }) => (
  <SideBarContext.Consumer>
    {sidebar => (
      <SnackContext.Provider
        value={{
          viewportOffsetHorizontal: 10 + (sidebar.open ? sidebar.width : 0),
        }}
      >
        {children}
      </SnackContext.Provider>
    )}
  </SideBarContext.Consumer>
)

export default SidebarSnackContextProvider
