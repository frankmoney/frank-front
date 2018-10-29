import React from 'react'
import { connect } from 'react-redux'
import { currentUserSelector } from '@frankmoney/webapp'
import { compose, withProps, branch, renderComponent } from 'recompose'
import { Redirect } from 'react-router-dom'
import Helmet from 'react-helmet'
import Ledger from 'containers/public/Ledger'
import Layout from 'components/Layout'
import { BASE_TITLE, ROUTES } from 'const'

const withLayout = Component => props => (
  <Layout>
    <Component {...props} />
    <Helmet title={BASE_TITLE} />
  </Layout>
)

const ComposedLedger = compose(
  withProps(props => ({
    accountId: props.match.params.id,
  }))
)(Ledger)

export default [
  {
    component: ComposedLedger,
    path: ROUTES.public.ledger.root,
    exact: true,
  },
]
