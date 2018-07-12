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

const Layout = props => (
  <CurrencyProvider code="USD">
    <PageLayout {...props} />
  </CurrencyProvider>
)

export default withProps({
  sidebarComponent: compose(
    withProps({
      renderMainMenuItems: () => (
        <>
          <SidebarMenuItem
            href={createRouteUrl(ROUTES.demo.components)}
            navLinkComponent={ReduxNavLink}
            primaryText="Components"
          />
          <SidebarMenuItem
            href={createRouteUrl(ROUTES.inbox.root)}
            navLinkComponent={ReduxNavLink}
            primaryText="Inbox"
          />
          <SidebarMenuItem
            href={createRouteUrl(ROUTES.ledger.root)}
            navLinkComponent={ReduxNavLink}
            primaryText="Ledger"
          />
        </>
      ),
    }),
    responsiveSidebar
  )(Sidebar),
})(Layout)
