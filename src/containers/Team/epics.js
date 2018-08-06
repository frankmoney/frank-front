import { createRouteUrl } from '@frankmoney/utils'
import { push } from 'react-router-redux'
import { ROUTES } from 'const'
import ACTIONS from './actions'
import QUERIES from './queries'
import EditRoleActions from './EditRoleDrawer/actions'

export const loadEpic = (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.load)
    .switchMap(() => graphql(QUERIES.team))
    .map(ACTIONS.load.success)

export const openInviteDrawerEpic = action$ =>
  action$.ofType(ACTIONS.openInviteDrawer).map(() => push(ROUTES.team.invite))

export const openEditRoleDrawerEpic = action$ =>
  action$
    .ofType(ACTIONS.openEditRoleDrawer)
    .map(({ payload: { id } }) =>
      push(createRouteUrl(ROUTES.team.match, { action: 'edit-role', id }))
    )

export const editRoleDoneEpic = action$ =>
  action$.ofType(EditRoleActions.submit.success).map(() => ACTIONS.load())
