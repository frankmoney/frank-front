import { Page404 as NotFound } from '@frankmoney/components'
import { withProps } from 'recompose'
import { Redirect } from 'react-router-dom'
import LoginDev from 'containers/auth/LoginDev'
import Login from 'containers/auth/SignIn'
import SignUp from 'containers/auth/SignUp'
import adminRoutes from 'containers/admin/routes'
import publicRoutes from 'containers/public/routes'
import demoRoutes from 'demo/routes'
import { ROUTES } from './const'

export default [
  {
    component: withProps({ to: ROUTES.manage.ledger.root })(Redirect),
    path: ROUTES.root,
    exact: true,
  },
  {
    component: LoginDev,
    path: ROUTES.auth.loginDev,
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
  ...adminRoutes,
  ...publicRoutes,
  ...demoRoutes,
  {
    component: NotFound,
  },
]
