import { Page404 as NotFound } from '@frankmoney/components'
import { withProps } from 'recompose'
import { Redirect } from 'react-router-dom'
import SignIn from 'containers/auth/SignIn'
import SignUp from 'containers/auth/SignUp'
import RecoverPassword, {
  RecoverPasswordMailSent,
} from 'containers/auth/RecoverPassword'
import ResetPassword from 'containers/auth/ResetPassword'
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
    component: RecoverPasswordMailSent,
    path: ROUTES.auth.recoverPasswordMailSent,
    exact: true,
  },
  {
    component: RecoverPassword,
    path: ROUTES.auth.recoverPassword,
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
