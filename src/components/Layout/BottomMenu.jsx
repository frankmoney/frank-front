import React from 'react'
import { compose } from 'recompose'
import { currentUserSelector } from '@frankmoney/webapp'
import { SidebarBottomMenu, SidebarBottomMenuItem } from 'components/Sidebar'
import reconnect from 'utils/reconnect'
import { ROUTES } from 'const'

const SidebarBottomUserMenu = ({ user, children, ...otherProps }) => (
  <SidebarBottomMenu {...otherProps}>
    <SidebarBottomMenuItem
      key="user"
      text={[user.firstName, user.lastName].join(' ')}
    />
    <SidebarBottomMenuItem
      key="logout"
      text="Sign out"
      type="danger"
      href={ROUTES.auth.logout}
    />
  </SidebarBottomMenu>
)

export default compose(
  reconnect({
    user: currentUserSelector,
  })
)(SidebarBottomUserMenu)
