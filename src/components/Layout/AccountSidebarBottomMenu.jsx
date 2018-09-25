import React from 'react'
import {
  SidebarBottomMenu,
  SidebarBottomMenuItem,
} from '@frankmoney/components'
import { compose } from 'recompose'
import { currentUserSelector } from '@frankmoney/webapp'
import reconnect from 'utils/reconnect'
import {
  userAccountsSelector,
  currentAccountIdSelector,
} from 'redux/selectors/user'
import * as USER_ACTIONS from 'redux/actions/user'
import { ROUTES } from '../../const'

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
  reconnect(
    {
      user: currentUserSelector,
      selectedAccountId: currentAccountIdSelector,
      accounts: userAccountsSelector,
    },
    {
      handleAccountSelect: USER_ACTIONS.selectAccount,
    }
  )
)(SidebarBottomUserMenu)
