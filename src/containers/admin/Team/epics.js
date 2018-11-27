import ACTIONS from './actions'
import QUERIES from './queries'

export const loadEpic = (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.load)
    .switchMap(() => graphql(QUERIES.team))
    .map(ACTIONS.load.success)

export const changePasswordEpic = (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.changePassword)
    .switchMap(({ payload: { newPassword } }) =>
      graphql(QUERIES.changePassword, { password: newPassword })
    )
    .map(ACTIONS.changePassword.success)
