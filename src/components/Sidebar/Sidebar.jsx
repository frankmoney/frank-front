// @flow
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react'
import { SidebarProvider } from '@frankmoney/components'
import SidebarContainer from './SidebarContainer'

const Sidebar = ({
  open,
  overlayOn,
  width,
  onToggleOpen,
  onToggleOverlay,
  ...props
}) => (
  <SidebarProvider
    open={open}
    overlayOn={overlayOn}
    width={width}
    onToggleOpen={onToggleOpen}
    onToggleOverlay={onToggleOverlay}
  >
    {sidebar => (
      <SidebarContainer
        {...props}
        {...sidebar}
        panelWidth={width}
        onBackdropClick={sidebar.toggleOpenOff}
      />
    )}
  </SidebarProvider>
)

export default Sidebar
