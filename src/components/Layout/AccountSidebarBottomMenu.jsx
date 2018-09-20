import React from 'react'
import {
  SidebarBottomMenu,
  SidebarBottomMenuItem,
} from '@frankmoney/components'
import { compose, withHandlers } from 'recompose'
import { currentUserSelector } from '@frankmoney/webapp'
import cookies from 'browser-cookies'
import reconnect from 'utils/reconnect'
import {
  userAccountsSelector,
  currentAccountIdSelector,
} from 'redux/selectors/user'
import { ROUTES, ACCOUNT_COOKIE_NAME } from '../../const'

const SidebarBottomUserMenu = ({
  user,
  accounts = [],
  selectedAccountId,
  children,
  handleAccountSelect,
  ...otherProps
}) => (
  <SidebarBottomMenu {...otherProps}>
    <SidebarBottomMenuItem
      key="user"
      text={[user.firstName, user.lastName].join(' ')}
    />
    {accounts.map(({ id, name }) => (
      <SidebarBottomMenuItem
        key={id}
        text={`${id === selectedAccountId ? '>> ' : ''}${name}`}
        onClick={() => handleAccountSelect(id)}
      />
    ))}
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
    selectedAccountId: currentAccountIdSelector,
    accounts: userAccountsSelector,
  }),
  withHandlers({
    handleAccountSelect: () => accountId => {
      cookies.set(ACCOUNT_COOKIE_NAME, accountId)
      window.location.reload()
    },
  })
)(SidebarBottomUserMenu)
