// @flow
import React from 'react'
import { compose, withProps } from 'recompose'
import {
  MoveToInbox as NewIcon,
  ChromeReaderMode as LedgerIcon,
  BurstMode as StoriesIcon,
  Domain as DirectoryIcon,
  InsertChart as WidgetsIcon,
  Tune as SettingsIcon,
} from 'material-ui-icons'
import { createRouteUrl } from '@frankmoney/utils'
import { ReduxNavLink } from '@frankmoney/webapp'
import reconnect from 'utils/reconnect'
import {
  userAccountsSelector,
  currentAccountIdSelector,
} from 'redux/selectors/user'
import * as USER_ACTIONS from 'redux/actions/user'
import { AccountItem, SidebarMenuItem } from 'components/Sidebar'
import { ROUTES } from 'const'

const ComposedAccountItem = withProps({
  renderAccountMenuItems: () => (
    <>
      <SidebarMenuItem
        href={createRouteUrl(ROUTES.manage.inbox.root)}
        navLinkComponent={ReduxNavLink}
        primaryText="New"
        leftIcon={NewIcon}
        disabled
      />
      <SidebarMenuItem
        href={createRouteUrl(ROUTES.manage.ledger.root)}
        navLinkComponent={ReduxNavLink}
        primaryText="Ledger"
        leftIcon={LedgerIcon}
      />
      <SidebarMenuItem
        href={createRouteUrl(ROUTES.manage.stories.root)}
        navLinkComponent={ReduxNavLink}
        primaryText="Stories"
        leftIcon={StoriesIcon}
      />
      <SidebarMenuItem
        href={createRouteUrl(ROUTES.manage.directory.root)}
        navLinkComponent={ReduxNavLink}
        primaryText="Directory"
        leftIcon={DirectoryIcon}
      />
      <SidebarMenuItem
        navLinkComponent={ReduxNavLink}
        primaryText="Widgets"
        leftIcon={WidgetsIcon}
        disabled
      />
      <SidebarMenuItem
        navLinkComponent={ReduxNavLink}
        primaryText="Settings"
        leftIcon={SettingsIcon}
        disabled
      />
    </>
  ),
})(AccountItem)

const AccountsSwitchMenu = ({
  accounts = [],
  selectedAccountId,
  handleAccountSelect,
}) => (
  <>
    {accounts.map(({ id, name }) => (
      <ComposedAccountItem
        key={id}
        label={name}
        onClick={() => handleAccountSelect(id)}
        compact={id !== selectedAccountId}
      />
    ))}
  </>
)

export default compose(
  reconnect(
    {
      selectedAccountId: currentAccountIdSelector,
      accounts: userAccountsSelector,
    },
    {
      handleAccountSelect: USER_ACTIONS.selectAccount,
    }
  )
)(AccountsSwitchMenu)

/*



 */
