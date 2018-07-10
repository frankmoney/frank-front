import React from 'react'
import {
  Sidebar,
  SidebarMenuItem,
  responsiveSidebar,
} from '@frankmoney/components'
import { createRouteUrl } from '@frankmoney/utils'
import { PageLayout, ReduxNavLink } from '@frankmoney/webapp'
import { compose, withProps } from 'recompose'
import { ROUTES } from 'const'

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
            href={createRouteUrl(ROUTES.demo.cards)}
            navLinkComponent={ReduxNavLink}
            primaryText="Cards"
          />
          <SidebarMenuItem
            href={createRouteUrl(ROUTES.demo.drawers.root)}
            navLinkComponent={ReduxNavLink}
            primaryText="Drawers"
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
        </>
      ),
    }),
    responsiveSidebar
  )(Sidebar),
})(PageLayout)
