import React from 'react'
import { Page404 as NotFound } from '@frankmoney/components'
import { withProps } from 'recompose'
import { Redirect } from 'react-router-dom'
import Helmet from 'react-helmet'
import Layout from 'components/Layout'
import CardsDemo from 'containers/CardsDemo'
import ComponentsDemo from 'containers/ComponentsDemo'
import DrawersDemo from 'containers/DrawersDemo'
import { DEFAULT_TITLE, ROUTES } from './const'

const withLayout = Component => props => (
  <Layout>
    <Component {...props} />
    <Helmet title={DEFAULT_TITLE} />
  </Layout>
)

const AppLevelRedirect = withProps({
  to: ROUTES.demo.root,
})(Redirect)

export default [
  {
    component: AppLevelRedirect,
    path: ROUTES.root,
    exact: true,
  },
  {
    component: withLayout(ComponentsDemo),
    path: ROUTES.demo.components,
    exact: true,
  },
  {
    component: withLayout(CardsDemo),
    path: ROUTES.demo.cards,
    exact: true,
  },
  {
    component: withLayout(DrawersDemo),
    path: ROUTES.demo.drawers.parameterized,
    exact: true,
  },
  {
    component: NotFound,
  },
]
