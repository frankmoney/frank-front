import ACTIONS from './actions'
import QUERIES from './queries'
import { teamIdSelector } from './selectors'

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

export const inviteMember = (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.invite)
    .switchMap(({ payload: { email, note } }) =>
      graphql(QUERIES.sendInvite, {
        email,
        note,
        teamId: teamIdSelector(store.getState()),
      })
    )
    .map(ACTIONS.invite.success)
