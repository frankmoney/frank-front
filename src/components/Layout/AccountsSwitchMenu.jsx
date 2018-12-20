// @flow
import React from 'react'
import { compose, withPropsOnChange } from 'recompose'
import {
  MoveToInbox as NewIcon,
  ChromeReaderMode as LedgerIcon,
  BurstMode as StoriesIcon,
  Domain as DirectoryIcon,
  InsertChart as WidgetsIcon,
  Tune as SettingsIcon,
  Add as PlusIcon,
} from 'material-ui-icons'
import { createRouteUrl } from '@frankmoney/utils'
import { ReduxNavLink } from '@frankmoney/webapp'
import { Link, NavLink } from 'react-router-dom'
import reconnect from 'utils/reconnect'
import {
  userAccountsSelector,
  currentAccountIdSelector,
} from 'redux/selectors/user'
import { AccountItem, SidebarMenuItem } from 'components/Sidebar'
import { ROUTES } from 'const'

const ComposedAccountItem = withPropsOnChange(
  ['accountId'],
  ({ accountId }) => ({
    renderAccountMenuItems: () => (
      <>
        <SidebarMenuItem
          href={createRouteUrl(ROUTES.account.inbox.root, { accountId })}
          navLinkComponent={ReduxNavLink}
          primaryText="New"
          leftIcon={NewIcon}
        />
        <SidebarMenuItem
          href={createRouteUrl(ROUTES.account.idRoot, { accountId })}
          navLinkComponent={NavLink}
          primaryText="Ledger"
          exact
          leftIcon={LedgerIcon}
        />
        <SidebarMenuItem
          href={createRouteUrl(ROUTES.account.stories.root, { accountId })}
          navLinkComponent={ReduxNavLink}
          primaryText="Stories"
          leftIcon={StoriesIcon}
        />
        <SidebarMenuItem
          href={createRouteUrl(ROUTES.account.directory.root, { accountId })}
          navLinkComponent={ReduxNavLink}
          primaryText="Directory"
          leftIcon={DirectoryIcon}
          disabled
        />
        <SidebarMenuItem
          navLinkComponent={ReduxNavLink}
          primaryText="Widgets"
          leftIcon={WidgetsIcon}
          disabled
        />
        <SidebarMenuItem
          href={createRouteUrl(ROUTES.account.settings.root, { accountId })}
          navLinkComponent={ReduxNavLink}
          primaryText="Settings"
          leftIcon={SettingsIcon}
        />
      </>
    ),
  })
)(AccountItem)

const AccountsSwitchMenu = ({ accounts = [], selectedAccountId }) => (
  <>
    {accounts.map(({ id, name }) => (
      <ComposedAccountItem
        key={id}
        label={name}
        accountId={id}
        compact={id !== selectedAccountId}
      />
    ))}
    <AccountItem
      accountId="new"
      compact
      label="Add new account"
      icon={<PlusIcon />}
    />
  </>
)

export default compose(
  reconnect({
    selectedAccountId: currentAccountIdSelector,
    accounts: userAccountsSelector,
  })
)(AccountsSwitchMenu)
