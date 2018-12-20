import { Page404 as NotFound } from '@frankmoney/components'
import { withProps } from 'recompose'
import { Redirect } from 'react-router-dom'
import Login from 'containers/auth/SignIn'
import SignUp from 'containers/auth/SignUp'
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
    component: Login,
    path: ROUTES.auth.login,
    exact: true,
  },
  {
    component: SignUp,
    path: ROUTES.auth.register,
    exact: true,
  },
  ...appRoutes,
  ...demoRoutes,
  {
    component: NotFound,
  },
]
