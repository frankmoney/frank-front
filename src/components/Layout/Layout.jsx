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
            isHeader
            href={createRouteUrl(ROUTES.demo.root)}
            navLinkComponent={ReduxNavLink}
            primaryText="DEMO"
          />
        </>
      ),
    }),
    responsiveSidebar
  )(Sidebar),
})(PageLayout)
