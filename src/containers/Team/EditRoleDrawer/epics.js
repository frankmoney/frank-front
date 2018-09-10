import { push } from 'react-router-redux'
import { ROUTES } from 'const'
import ACTIONS from './actions'
import QUERIES from './queries'
import {
  idSelector,
  adminSelector,
  canInviteSelector,
  accountIdsSelector,
} from './selectors'

export const loadEpic = (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.load)
    .switchMap(({ payload: { id } }) =>
      graphql(QUERIES.accountsAndMember, { memberId: id })
    )
    .map(ACTIONS.load.success)

export const cancelEpic = action$ =>
  action$.ofType(ACTIONS.cancel).map(() => push(ROUTES.team.root))

export const submitEpic = (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.submit)
    .switchMap(() => {
      const state = store.getState()

      const args = {
        id: idSelector(state),
        admin: adminSelector(state),
        canInvite: canInviteSelector(state),
        accountIds: accountIdsSelector(state),
      }

      return graphql(QUERIES.editRole, args)
    })
    .switchMap(profile => [
      ACTIONS.submit.success(profile),
      push(ROUTES.team.root),
    ])
