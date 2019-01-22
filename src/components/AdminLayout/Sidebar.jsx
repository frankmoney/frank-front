import { createRouteUrl } from '@frankmoney/utils'
import { ReduxNavLink } from '@frankmoney/webapp'
import { responsiveSidebar } from '@frankmoney/components'
import { Help as HelpIcon, RecentActors as TeamIcon } from 'material-ui-icons'
import React from 'react'
import { compose, withProps } from 'recompose'
import { ROUTES } from '../../const'
import { Sidebar, SidebarMenuItem } from '../Sidebar'
import AccountsSwitchMenu from './AccountsSwitchMenu'
import BottomMenu from './BottomMenu'
import SidebarLogo from './SidebarLogo'

const AppSidebar = compose(
  withProps({
    LogoComponent: SidebarLogo,
    AccountsSwitchMenuComponent: AccountsSwitchMenu,
    BottomMenuComponent: BottomMenu,
    panelProps: { delimiter: true },
    renderGlobalMenuItems: () => (
      <>
        <SidebarMenuItem
          navLinkComponent={ReduxNavLink}
          href={createRouteUrl(ROUTES.team.root)}
          primaryText="Team"
          leftIcon={TeamIcon}
        />
        <SidebarMenuItem
          navLinkComponent={ReduxNavLink}
          primaryText="How it works"
          leftIcon={HelpIcon}
          disabled
        />
      </>
    ),
  }),
  responsiveSidebar
)(Sidebar)

export default AppSidebar
