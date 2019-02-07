import React from 'react'
import { SideBarContext } from '@frankmoney/components'
import ButtonWidget from 'components/widgets/ButtonWidget'

const SidebarButtonWidget = props => (
  <SideBarContext.Consumer>
    {sidebar => (
      <ButtonWidget
        horizontalOffset={
          props.position === 'left'
            ? (sidebar.open ? sidebar.width : 0) + 20
            : undefined
        }
        {...props}
      />
    )}
  </SideBarContext.Consumer>
)

export default SidebarButtonWidget
