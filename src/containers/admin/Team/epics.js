import { createRouteUrl } from '@frankmoney/utils'
import { identity } from 'ramda'
import { replace as replaceLocation } from 'react-router-redux'
import { ROUTES } from 'const'
import ACTIONS from './actions'
import QUERIES from './queries'
import { inviteTokenSelector, teamIdSelector } from './selectors'

export const loadEpic = (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.load)
    .switchMap(async ({ payload: { inviteToken } }) => {
      let payload

      if (inviteToken) {
        payload = {
          inviteToken,
          ...(await graphql(QUERIES.maybeAcceptInvite, {
            token: inviteToken,
          })),
        }

        const code = payload && payload.code

        if (code === 'accepted') {
          // refresh to update sidebar and show popup
          window.location.reload(true)
          return []
        }

        if (code !== 'lastTeamMember') {
          // act as if there was no invite - remove token from query string
          return [
            ACTIONS.load.success(payload),
            replaceLocation(createRouteUrl(ROUTES.team.root)),
          ]
        }
      } else {
        payload = {
          inviteToken: null,
          ...(await graphql(QUERIES.team)),
        }
      }

      return [ACTIONS.load.success(payload)]
    })
    .mergeMap(identity)
    .catchAndRethrow(ACTIONS.load.error)

export const acceptInviteEpic = (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.acceptInvite)
    .switchMap(async () => {
      const token = inviteTokenSelector(store.getState())

      await graphql(QUERIES.acceptInvite, { token })

      // refresh to update sidebar and show popup
      window.location.reload(true)
      return []
    })
    .mergeMap(identity)
    .catchAndRethrow(ACTIONS.acceptInvite.error)

export const rejectInviteEpic = action$ =>
  action$
    .ofType(ACTIONS.rejectInvite)
    .map(() => replaceLocation(createRouteUrl(ROUTES.team.root)))

export const changePasswordEpic = (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.changePassword)
    .switchMap(({ payload: { newPassword } }) =>
      graphql(QUERIES.changePassword, { password: newPassword })
    )
    .map(ACTIONS.changePassword.success)
    .catchAndRethrow(ACTIONS.changePassword.error)

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
    .catchAndRethrow(ACTIONS.invite.error)
