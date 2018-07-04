import React from 'react'
import { Page404 as NotFound } from '@frankmoney/components'
import { withProps } from 'recompose'
import { Redirect } from 'react-router-dom'
import Helmet from 'react-helmet'
import Layout from 'components/Layout'
import DemoPage from 'containers/DemoPage'
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
    component: withLayout(DemoPage),
    path: ROUTES.demo.root,
    exact: true,
  },
  {
    component: NotFound,
  },
]
