import React from 'react'
import { connect } from 'react-redux'
import { currentUserSelector } from '@frankmoney/webapp'
import { compose, withProps, branch, renderComponent } from 'recompose'
import { Redirect } from 'react-router-dom'
import Helmet from 'react-helmet'
import Inbox from 'containers/admin/Inbox'
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
import { BASE_TITLE, ROUTES } from 'const'

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
    component: protectedRoute(withLayout(Inbox)),
    path: ROUTES.manage.inbox.root,
    exact: true,
  },
  {
    component: protectedRoute(withLayout(Ledger)),
    path: ROUTES.manage.ledger.root,
    exact: true,
  },
  {
    component: protectedRoute(withLayout(Directory)),
    path: ROUTES.manage.directory.root,
    exact: true,
  },
  {
    component: protectedRoute(withLayout(ComposedRecipient)),
    path: ROUTES.manage.directory.recipient,
    exact: true,
  },
  {
    component: protectedRoute(withLayout(Stories)),
    path: ROUTES.manage.stories.root,
    exact: true,
  },
  {
    component: protectedRoute(withLayout(StoryEdit)),
    path: ROUTES.manage.stories.storyNew,
    exact: true,
  },
  {
    component: protectedRoute(withLayout(ComposedStoryEdit)),
    path: ROUTES.manage.stories.storyEdit,
    exact: true,
  },
  {
    component: protectedRoute(withLayout(ComposedStoryPreview)),
    path: ROUTES.manage.stories.storyPreview,
    exact: true,
  },
  {
    component: protectedRoute(withLayout(Settings)),
    path: ROUTES.manage.settings.root,
    exact: true,
  },
  {
    component: protectedRoute(withLayout(Team)),
    path: ROUTES.manage.team.root,
    exact: true,
  },
  {
    component: protectedRoute(Onboarding),
    path: ROUTES.manage.onboarding.root,
    exact: true,
  },
]
