// @flow
import React from 'react'
import { connect } from 'react-redux'
import { createRouteUrl } from '@frankmoney/utils'
import { createSelector } from 'reselect'
import {
  currentUserSelector,
  queryParamSelector,
  mediaTypeSelector,
} from '@frankmoney/webapp'
import { compose, withProps, branch, renderComponent } from 'recompose'
import { Redirect, Switch, Route } from 'react-router-dom'
import Helmet from 'react-helmet'
import { protectedRoute } from 'utils/auth'
import reconnect from 'utils/reconnect'
import { withMobileLayout } from 'containers/mobile/Layout'
import HowItWorks from 'components/guidies/HowItWorks'
import MobileLedger from 'containers/mobile/Ledger'
import MobilePayment from 'containers/mobile/Payment'
import MobileStory from 'containers/mobile/Story'
import { userAccountsSelector } from 'redux/selectors/user'
import { BASE_TITLE, ROUTES } from 'const'
import Inbox from 'containers/admin/Inbox'
import Widgets from 'containers/admin/WidgetSettings'
import Ledger from 'containers/admin/Ledger'
import Stories from 'containers/admin/Stories'
import StoryPreview from 'containers/admin/Story'
import StoryEdit from 'containers/admin/StoryEdit'
import Directory from 'containers/admin/Directory'
import Recipient from 'containers/admin/Recipient'
import Settings from 'containers/admin/Settings'
import Team from 'containers/admin/Team'
import ReconnectSource from 'containers/admin/SourceReconnect'
import Onboarding from 'containers/admin/Onboarding'
import AdminLayout from 'components/AdminLayout'
import PublicPayment from 'containers/public/Payment'
import PublicStory from 'containers/public/Story'
import PublicLedger from 'containers/public/Ledger'
import { parseQueryStringBool } from 'utils/querystring'
import UnexpectedErrorManager from 'components/UnexpectedErrorManager'
import SnackContext from 'components/kit/Snack/SnackContext'

// todo refactor

const withAdminLayout = Component => props => (
  <AdminLayout>
    <Component {...props} />
    <Helmet title={BASE_TITLE} />
    {/* error reporting snack should be inside Sidebar context */}
    <UnexpectedErrorManager />
  </AdminLayout>
)

const withPublicLayout = Component => props => (
  <>
    <Component {...props} />
    <Helmet title={BASE_TITLE} />
    <UnexpectedErrorManager />
  </>
)

const withOnboardingLayout = Component => props => (
  <>
    <SnackContext.Provider
      value={{
        viewportOffsetVertical: 100,
      }}
    >
      <Component {...props} />
      <Helmet title={BASE_TITLE} />
      <UnexpectedErrorManager />
    </SnackContext.Provider>
  </>
)

const RedirectToDefaultAccount = compose(
  connect(state => ({
    accounts: userAccountsSelector(state),
  })),
  withProps(props => ({
    to:
      props.accounts.length > 0
        ? createRouteUrl(ROUTES.account.idRoot, {
            accountId: props.accounts[0].id,
          })
        : ROUTES.account.onboarding,
  }))
)(Redirect)

export const withMobile = connect(state => {
  const media = mediaTypeSelector(state)
  return {
    mobile: media === 'phoneLandscape' || media === 'phonePortrait',
  }
})

const publicSelector = createSelector(
  currentUserSelector,
  queryParamSelector('public'),
  (user, publicParam) => parseQueryStringBool(publicParam) === true || !user
)

const withPublic = reconnect({ public: publicSelector })

const branchPublic = PublicComponent =>
  compose(
    withPublic,
    branch(props => props.public, renderComponent(PublicComponent))
  )

const branchMobile = MobileComponent =>
  compose(
    withMobile,
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
  source: withProps(props => ({
    accountId: props.match.params.accountId,
    sourceId: props.match.params.sourceId,
  })),
}

const ComposedProtectedLedger = compose(
  routeMappers.account,
  withAdminLayout
)(Ledger)
const ComposedProtectedStories = compose(
  routeMappers.account,
  withAdminLayout
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
    component: protectedRoute(withOnboardingLayout(Onboarding)),
    path: ROUTES.account.onboarding,
    exact: true,
  },
  {
    component: protectedRoute(withAdminLayout(Team)),
    path: ROUTES.team.root,
    exact: true,
  },
  {
    component: protectedRoute(withAdminLayout(HowItWorks)),
    path: ROUTES.howItWorks,
    exact: true,
  },
  // Account dependent
  {
    component: compose(
      protectedRoute,
      withOnboardingLayout,
      routeMappers.source
    )(ReconnectSource),
    path: ROUTES.account.source.reconnect,
    exact: true,
  },
  {
    component: compose(
      protectedRoute,
      withAdminLayout,
      routeMappers.account
    )(Widgets),
    path: ROUTES.account.widget,
    exact: true,
  },
  {
    component: compose(
      protectedRoute,
      withAdminLayout,
      routeMappers.account
    )(Inbox),
    path: ROUTES.account.inbox.root,
    exact: true,
  },
  {
    component: compose(
      routeMappers.account,
      branchMobile(MobileLedger),
      branchPublic(withPublicLayout(PublicLedger))
    )(LedgerRouter),
    path: ROUTES.account.idRootTab,
    exact: true,
  },
  {
    component: compose(
      protectedRoute,
      withAdminLayout,
      routeMappers.account
    )(Directory),
    path: ROUTES.account.directory.root,
    exact: true,
  },
  {
    component: compose(
      protectedRoute,
      withAdminLayout,
      routeMappers.recipient
    )(Recipient),
    path: ROUTES.account.directory.recipient,
    exact: true,
  },
  {
    component: compose(
      protectedRoute,
      withAdminLayout,
      routeMappers.account
    )(StoryEdit),
    path: ROUTES.account.stories.idRootNew,
    exact: true,
  },
  {
    component: compose(
      protectedRoute,
      withAdminLayout,
      routeMappers.story
    )(StoryEdit),
    path: ROUTES.account.stories.idRootEdit,
    exact: true,
  },
  {
    component: compose(
      routeMappers.story,
      branchMobile(MobileStory),
      branchPublic(withPublicLayout(PublicStory)),
      withAdminLayout
    )(StoryPreview),
    path: ROUTES.account.stories.idRoot,
    exact: true,
  },
  {
    component: compose(
      protectedRoute,
      withAdminLayout,
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
    )(withPublicLayout(PublicPayment)),
    path: ROUTES.account.payment.idRoot,
    exact: true,
  },
  {
    component: protectedRoute(RedirectToDefaultAccount),
    path: ROUTES.account.root,
    exact: true,
  },
]
