import React from 'react'
import { Page404 as NotFound } from '@frankmoney/components'
import { compose, withProps } from 'recompose'
import { Redirect } from 'react-router-dom'
import Helmet from 'react-helmet'
import WidgetDemo from 'containers/Widget/Demo'
import Layout from 'components/Layout'
import CommentsDemo from 'containers/Comments/CommentsDemo'
import ComponentsDemo from 'containers/ComponentsDemo'
import DrawerDemo from 'containers/DrawerDemo'
import Inbox from 'containers/Inbox'
import Ledger from 'containers/Ledger'
import Directory from 'containers/Directory'
import Recipient from 'containers/Recipient'
import Team from 'containers/Team'
import { DEFAULT_TITLE, ROUTES } from './const'

const withLayout = Component => props => (
  <Layout>
    <Component {...props} />
    <Helmet title={DEFAULT_TITLE} />
  </Layout>
)

export default [
  {
    component: withProps({ to: ROUTES.demo.root })(Redirect),
    path: ROUTES.root,
    exact: true,
  },
  {
    component: withProps({ to: ROUTES.demo.components })(Redirect),
    path: ROUTES.demo.root,
    exact: true,
  },
  {
    component: withLayout(Inbox),
    path: ROUTES.inbox.root,
    exact: true,
  },
  {
    component: withLayout(Ledger),
    path: ROUTES.ledger.root,
    exact: true,
  },
  {
    component: withLayout(Directory),
    path: ROUTES.directory.root,
    exact: true,
  },
  {
    component: withLayout(Recipient),
    path: ROUTES.directory.recipient,
    exact: true,
  },
  {
    component: withLayout(Team),
    path: ROUTES.team.match,
    exact: true,
  },
  {
    component: withLayout(ComponentsDemo),
    path: ROUTES.demo.components,
    exact: true,
  },
  {
    component: withLayout(DrawerDemo),
    path: ROUTES.demo.drawers.root,
    exact: true,
  },
  {
    component: compose(
      withLayout,
      withProps({ type: 'type-1' })
    )(DrawerDemo),
    path: ROUTES.demo.drawers.type1,
    exact: true,
  },
  {
    component: compose(
      withLayout,
      withProps({ type: 'type-2' })
    )(DrawerDemo),
    path: ROUTES.demo.drawers.type2,
    exact: true,
  },
  {
    component: compose(
      withLayout,
      withProps({ type: 'type-3' })
    )(DrawerDemo),
    path: ROUTES.demo.drawers.type3,
    exact: true,
  },
  {
    component: compose(
      withLayout,
      withProps({ type: 'type-4' })
    )(DrawerDemo),
    path: ROUTES.demo.drawers.type4,
    exact: true,
  },
  {
    component: withLayout(CommentsDemo),
    path: ROUTES.demo.comments,
    exact: true,
  },
  {
    component: withLayout(WidgetDemo),
    path: ROUTES.demo.widgets,
    exact: true,
  },
  {
    component: NotFound,
  },
]
