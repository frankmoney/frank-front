import React from 'react'
import {
  Sidebar,
  SidebarMenuItem,
  responsiveSidebar,
} from '@frankmoney/components'
import { createRouteUrl } from '@frankmoney/utils'
import { PageLayout, ReduxNavLink } from '@frankmoney/webapp'
import { compose, withProps } from 'recompose'
import CurrencyProvider from 'components/CurrencyProvider'
import { ROUTES } from 'const'

const DemoLayout = props => (
  <CurrencyProvider code="USD">
    <PageLayout {...props} />
  </CurrencyProvider>
)

const logoStyles = {
  position: 'absolute',
  top: 30,
  left: 30,
  fontSize: 32,
  fontWeight: 500,
  color: '#fff',
}

const Logo = () => <div style={logoStyles}>Demo</div>

export default withProps({
  sidebarComponent: compose(
    withProps({
      LogoComponent: Logo,
      renderMainMenuItems: () => (
        <>
          <SidebarMenuItem
            href={createRouteUrl(ROUTES.ledger.root)}
            navLinkComponent={ReduxNavLink}
            primaryText="Application"
          />
          <SidebarMenuItem
            href={createRouteUrl(ROUTES.demo.components)}
            navLinkComponent={ReduxNavLink}
            primaryText="Components"
          />
          <SidebarMenuItem
            href={createRouteUrl(ROUTES.demo.drawers.type1)}
            navLinkComponent={ReduxNavLink}
            primaryText="Drawer 1"
          />
          <SidebarMenuItem
            href={createRouteUrl(ROUTES.demo.drawers.type2)}
            navLinkComponent={ReduxNavLink}
            primaryText="Drawer 2"
          />
          <SidebarMenuItem
            href={createRouteUrl(ROUTES.demo.drawers.type3)}
            navLinkComponent={ReduxNavLink}
            primaryText="Drawer 3"
          />
          <SidebarMenuItem
            href={createRouteUrl(ROUTES.demo.drawers.type4)}
            navLinkComponent={ReduxNavLink}
            primaryText="Drawer 4"
          />
          <SidebarMenuItem
            href={createRouteUrl(ROUTES.demo.comments)}
            navLinkComponent={ReduxNavLink}
            primaryText="Comments"
          />
          <SidebarMenuItem
            href={createRouteUrl(ROUTES.demo.widgets)}
            navLinkComponent={ReduxNavLink}
            primaryText="Widgets"
          />
        </>
      ),
    }),
    responsiveSidebar
  )(Sidebar),
})(DemoLayout)
