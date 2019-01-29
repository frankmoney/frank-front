// @flow
import { withProps } from 'recompose'
import { Redirect } from 'react-router-dom'
import NotFound from 'components/ErrorPage'
import SignIn from 'containers/auth/SignIn'
import SignUp from 'containers/auth/SignUp'
import AcceptInvitation from 'containers/auth/AcceptInvitation'
import RecoverPassword from 'containers/auth/RecoverPassword'
import ResetPassword, {
  ResetPasswordSuccess,
} from 'containers/auth/ResetPassword'
import appRoutes from 'containers/routes'
import demoRoutes from 'demo/routes'
import { ROUTES } from './const'

export default [
  {
    component: withProps({ to: ROUTES.account.root })(Redirect),
    path: ROUTES.root,
    exact: true,
  },
  {
    component: SignIn,
    path: ROUTES.auth.login,
    exact: true,
  },
  {
    component: SignUp,
    path: ROUTES.auth.register,
    exact: true,
  },
  {
    component: AcceptInvitation,
    path: ROUTES.auth.acceptInvitation,
    exact: true,
  },
  {
    component: RecoverPassword,
    path: ROUTES.auth.recoverPassword,
    exact: true,
  },
  {
    component: ResetPasswordSuccess,
    path: ROUTES.auth.resetPasswordSuccess,
    exact: true,
  },
  {
    component: ResetPassword,
    path: ROUTES.auth.resetPassword,
    exact: true,
  },
  ...appRoutes,
  ...demoRoutes,
  {
    component: NotFound,
  },
]
