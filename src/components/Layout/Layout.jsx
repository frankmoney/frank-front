import React from 'react'
import cx from 'classnames'
import { responsiveSidebar } from '@frankmoney/components'
import { createRouteUrl } from '@frankmoney/utils'
import { PageLayout, ReduxNavLink } from '@frankmoney/webapp'
import { compose, withProps } from 'recompose'
import { RecentActors as TeamIcon, Help as HelpIcon } from 'material-ui-icons'
import { Sidebar, SidebarMenuItem } from 'components/Sidebar'
import CurrencyProvider from 'components/CurrencyProvider'
import { ROUTES } from 'const'
import { injectStyles } from 'utils/styles'
import AccountsSwitchMenu from './AccountsSwitchMenu'
import BottomMenu from './BottomMenu'
import FrankLogo from './FrankLogo.svg'

const Layout = props => (
  <CurrencyProvider code="USD">
    <PageLayout {...props} />
  </CurrencyProvider>
)

const logoStyles = {
  logo: {
    color: '#20284A',
  },
}

const Logo = injectStyles(logoStyles)(({ classes, className }) => (
  <div className={cx(classes.logo, className)}>
    <FrankLogo />
  </div>
))

export default withProps({
  sidebarComponent: compose(
    withProps({
      LogoComponent: Logo,
      AccountsSwitchMenuComponent: AccountsSwitchMenu,
      BottomMenuComponent: BottomMenu,
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
  )(Sidebar),
})(Layout)
