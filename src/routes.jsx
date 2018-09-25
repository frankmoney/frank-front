import React from 'react'
import { Page404 as NotFound } from '@frankmoney/components'
import { connect } from 'react-redux'
import { currentUserSelector } from '@frankmoney/webapp'
import { compose, withProps, branch, renderComponent } from 'recompose'
import { Redirect } from 'react-router-dom'
import Helmet from 'react-helmet'
import Layout from 'components/Layout'
import Login from 'containers/Login'
import Inbox from 'containers/Inbox'
import Ledger from 'containers/Ledger'
import Stories from 'containers/Stories'
import StoryPreview from 'containers/StoryPreview'
import StoryEdit from 'containers/StoryEdit'
import Directory from 'containers/Directory'
import Recipient from 'containers/Recipient'
import Team from 'containers/Team'
import Onboarding from 'containers/Onboarding'
import demoRoutes from 'demo/routes'
import { BASE_TITLE, ROUTES } from './const'

const withLayout = Component => props => (
  <Layout>
    <Component {...props} />
    <Helmet title={BASE_TITLE} />
  </Layout>
)

const RedirectToLogin = withProps({ to: ROUTES.auth.login })(Redirect)

const protectedRoute = compose(
  connect(state => ({
    user: currentUserSelector(state),
  })),
  branch(props => !props.user, renderComponent(RedirectToLogin))
)

const ComposedStoryEdit = compose(
  withProps(props => ({
    storyId: props.match.params.id,
  }))
)(StoryEdit)

const ComposedStoryPreview = compose(
  withProps(props => ({
    storyId: props.match.params.id,
  }))
)(StoryPreview)

const ComposedRecipient = compose(
  withProps(props => ({
    peerId: props.match.params.id,
  }))
)(Recipient)

export default [
  {
    component: withProps({ to: ROUTES.ledger.root })(Redirect),
    path: ROUTES.root,
    exact: true,
  },
  {
    component: Login,
    path: ROUTES.auth.login,
    exact: true,
  },
  {
    component: protectedRoute(withLayout(Inbox)),
    path: ROUTES.inbox.root,
    exact: true,
  },
  {
    component: protectedRoute(withLayout(Ledger)),
    path: ROUTES.ledger.root,
    exact: true,
  },
  {
    component: protectedRoute(withLayout(Directory)),
    path: ROUTES.directory.root,
    exact: true,
  },
  {
    component: protectedRoute(withLayout(ComposedRecipient)),
    path: ROUTES.directory.recipient,
    exact: true,
  },
  {
    component: protectedRoute(withLayout(Stories)),
    path: ROUTES.stories.root,
    exact: true,
  },
  {
    component: protectedRoute(withLayout(StoryEdit)),
    path: ROUTES.stories.storyNew,
    exact: true,
  },
  {
    component: protectedRoute(withLayout(ComposedStoryEdit)),
    path: ROUTES.stories.storyEdit,
    exact: true,
  },
  {
    component: protectedRoute(withLayout(ComposedStoryPreview)),
    path: ROUTES.stories.storyPreview,
    exact: true,
  },
  {
    component: protectedRoute(withLayout(Team)),
    path: ROUTES.team.root,
    exact: true,
  },
  {
    component: protectedRoute(Onboarding),
    path: ROUTES.onboarding.root,
    exact: true,
  },
  ...demoRoutes,
  {
    component: NotFound,
  },
]
