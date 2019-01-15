// @flow
import React from 'react'
import { connect } from 'react-redux'
import { createRouteUrl } from '@frankmoney/utils'
import {
  currentUserSelector,
  locationSelector,
  queryParamSelector,
  mediaTypeSelector,
} from '@frankmoney/webapp'
import {
  compose,
  withProps,
  withPropsOnChange,
  branch,
  renderComponent,
} from 'recompose'
import { Redirect, Switch, Route } from 'react-router-dom'
import Helmet from 'react-helmet'
import { withMobileLayout } from 'containers/mobile/Layout'
import MobileLedger from 'containers/mobile/Ledger'
import MobilePayment from 'containers/mobile/Payment'
import MobileStory from 'containers/mobile/Story'
import { userAccountsSelector } from 'redux/selectors/user'
import { BASE_TITLE, ROUTES } from 'const'
import Inbox from 'containers/admin/Inbox'
import Widgets from 'containers/admin/Widgets'
import Ledger from 'containers/admin/Ledger'
import Stories from 'containers/admin/Stories'
import StoryPreview from 'containers/admin/Story'
import StoryEdit from 'containers/admin/StoryEdit'
import Directory from 'containers/admin/Directory'
import Recipient from 'containers/admin/Recipient'
import Settings from 'containers/admin/Settings'
import Team from 'containers/admin/Team'
import Onboarding from 'containers/admin/Onboarding'
import Layout from 'components/Layout'
import PublicPayment from 'containers/public/Payment'
import PublicStory from 'containers/public/Story'
import PublicLedger from 'containers/public/Ledger'
import { parseQueryStringBool } from 'utils/querystring'

// todo refactor

const delimiterSidebarProps = {
  sidebarProps: { panelProps: { delimiter: true } },
}

const withLayout = (
  layoutProps = delimiterSidebarProps
) => Component => props => (
  <Layout {...layoutProps}>
    <Component {...props} />
    <Helmet title={BASE_TITLE} />
  </Layout>
)

const RedirectToLogin = compose(
  connect(state => ({
    location: locationSelector(state),
  })),
  withPropsOnChange(['location'], ({ location }) => ({
    to: createRouteUrl(ROUTES.auth.login, null, {
      r: `${location.pathname || ''}${location.search || ''}`,
    }),
  }))
)(Redirect)

const RedirectToDefaultAccount = compose(
  connect(state => ({
    accounts: userAccountsSelector(state),
  })),
  withProps(props => ({
    to: createRouteUrl(ROUTES.account.idRoot, {
      accountId: props.accounts.length > 0 ? props.accounts[0].id : 'new',
    }),
  }))
)(Redirect)

const protectedRoute = compose(
  connect(state => ({
    user: currentUserSelector(state),
  })),
  branch(props => !props.user, renderComponent(RedirectToLogin))
)

const branchPublic = PublicComponent =>
  compose(
    connect(state => ({
      user: currentUserSelector(state),
      public: queryParamSelector('public')(state),
    })),
    branch(
      props => parseQueryStringBool(props.public) === true || !props.user,
      renderComponent(PublicComponent)
    )
  )

const branchMobile = MobileComponent =>
  compose(
    connect(state => {
      const media = mediaTypeSelector(state)

      return {
        mobile: media === 'phoneLandscape' || media === 'phonePortrait',
      }
    }),
    branch(
      props => props.mobile,
      compose(
        renderComponent,
        withMobileLayout
      )(MobileComponent)
    )
  )

const routeMappers = {
  account: withProps(props => ({
    accountId: props.match.params.accountId,
  })),
  payment: withProps(props => ({
    accountId: props.match.params.accountId,
    paymentId: props.match.params.paymentId,
  })),
  story: withProps(props => ({
    accountId: props.match.params.accountId,
    storyId: props.match.params.storyId,
  })),
  recipient: withProps(props => ({
    accountId: props.match.params.accountId,
    peerId: props.match.params.id,
  })),
}

const ComposedProtectedLedger = compose(
  routeMappers.account,
  withLayout()
)(Ledger)
const ComposedProtectedStories = compose(
  routeMappers.account,
  withLayout()
)(Stories)

const LedgerRouter = () => (
  <Switch>
    <Route
      exact
      path={ROUTES.account.stories.root}
      component={ComposedProtectedStories}
    />
    <Route component={ComposedProtectedLedger} />
  </Switch>
)

export default [
  {
    component: protectedRoute(Onboarding),
    path: ROUTES.account.onboarding,
    exact: true,
  },
  {
    component: protectedRoute(withLayout()(Team)),
    path: ROUTES.team.root,
    exact: true,
  },
  // Account dependent
  {
    component: compose(
      protectedRoute,
      withLayout(),
      routeMappers.account
    )(Widgets),
    path: ROUTES.account.widget,
    exact: true,
  },
  {
    component: compose(
      protectedRoute,
      withLayout(),
      routeMappers.account
    )(Inbox),
    path: ROUTES.account.inbox.root,
    exact: true,
  },
  {
    component: compose(
      compose(
        branchMobile,
        routeMappers.account
      )(MobileLedger),
      compose(
        branchPublic,
        routeMappers.account
      )(PublicLedger)
    )(LedgerRouter),
    path: ROUTES.account.idRootTab,
    exact: true,
  },
  {
    component: compose(
      protectedRoute,
      withLayout(),
      routeMappers.account
    )(Directory),
    path: ROUTES.account.directory.root,
    exact: true,
  },
  {
    component: compose(
      protectedRoute,
      withLayout(),
      routeMappers.recipient
    )(Recipient),
    path: ROUTES.account.directory.recipient,
    exact: true,
  },
  {
    component: compose(
      protectedRoute,
      withLayout(delimiterSidebarProps),
      routeMappers.account
    )(StoryEdit),
    path: ROUTES.account.stories.idRootNew,
    exact: true,
  },
  {
    component: compose(
      protectedRoute,
      withLayout(delimiterSidebarProps),
      routeMappers.story
    )(StoryEdit),
    path: ROUTES.account.stories.idRootEdit,
    exact: true,
  },
  {
    component: compose(
      routeMappers.story,
      branchMobile(MobileStory),
      branchPublic(PublicStory),
      withLayout(delimiterSidebarProps)
    )(StoryPreview),
    path: ROUTES.account.stories.idRoot,
    exact: true,
  },
  {
    component: compose(
      protectedRoute,
      withLayout(),
      routeMappers.account
    )(Settings),
    path: ROUTES.account.settings.root,
    exact: true,
  },
  {
    component: compose(
      compose(
        branchMobile,
        routeMappers.payment
      )(MobilePayment),
      routeMappers.payment
    )(PublicPayment),
    path: ROUTES.account.payment.idRoot,
    exact: true,
  },
  {
    component: protectedRoute(RedirectToDefaultAccount),
    path: ROUTES.account.root,
    exact: true,
  },
]
