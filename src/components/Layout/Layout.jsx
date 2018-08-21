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
            href={createRouteUrl(ROUTES.inbox.root)}
            navLinkComponent={ReduxNavLink}
            primaryText="Inbox"
          />
          <SidebarMenuItem
            href={createRouteUrl(ROUTES.ledger.root)}
            navLinkComponent={ReduxNavLink}
            primaryText="Ledger"
          />
          <SidebarMenuItem
            href={createRouteUrl(ROUTES.team.root)}
            navLinkComponent={ReduxNavLink}
            primaryText="Team"
          />
          <SidebarMenuItem
            href={createRouteUrl(ROUTES.stories.root)}
            navLinkComponent={ReduxNavLink}
            primaryText="Stories"
          />
          <SidebarMenuItem
            href={createRouteUrl(ROUTES.stories.storyPreview)}
            navLinkComponent={ReduxNavLink}
            primaryText="Stories :: Preview Page"
          />
          <SidebarMenuItem
            href={createRouteUrl(ROUTES.directory.root)}
            navLinkComponent={ReduxNavLink}
            primaryText="Directory"
          />
          <SidebarMenuItem
            href={createRouteUrl(ROUTES.directory.recipient)}
            navLinkComponent={ReduxNavLink}
            primaryText="Directory :: Recipient"
          />
          <SidebarMenuItem
            href={createRouteUrl(ROUTES.team.root)}
            navLinkComponent={ReduxNavLink}
            primaryText="Team"
          />
        </>
      ),
    }),
    responsiveSidebar
  )(Sidebar),
})(Layout)
