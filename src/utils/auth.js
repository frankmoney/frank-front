import { createRouteUrl } from '@frankmoney/utils'
import { currentUserSelector, locationSelector } from '@frankmoney/webapp'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  branch,
  compose,
  renderComponent,
  withPropsOnChange,
  withProps,
} from 'recompose'
import { ROUTES } from 'const'

export const RedirectToLogin = compose(
  connect(state => ({
    location: locationSelector(state),
  })),
  withPropsOnChange(['location'], ({ location }) => ({
    to: createRouteUrl(ROUTES.auth.login, null, {
      r: `${location.pathname || ''}${location.search || ''}`,
    }),
  }))
)(Redirect)

export const protectedRoute = compose(
  connect(state => ({
    user: currentUserSelector(state),
  })),
  branch(props => !props.user, renderComponent(RedirectToLogin))
)

export const redirectIfLoggedIn = path =>
  compose(
    connect(state => ({
      user: currentUserSelector(state),
    })),
    branch(
      props => !!props.user,
      renderComponent(withProps({ to: path })(Redirect))
    )
  )
