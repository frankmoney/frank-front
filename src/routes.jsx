import React from 'react'
import { Page404 as NotFound } from '@frankmoney/components'
import { withProps } from 'recompose'
import { Redirect } from 'react-router-dom'
import Helmet from 'react-helmet'
import Layout from 'components/Layout'
import ComponentsDemo from 'containers/ComponentsDemo'
import Ledger from 'containers/Ledger'
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
    component: withLayout(Ledger),
    path: ROUTES.ledger.root,
    exact: true,
  },
  {
    component: withLayout(ComponentsDemo),
    path: ROUTES.demo.components,
    exact: true,
  },
  {
    component: NotFound,
  },
]
