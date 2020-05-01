import { createRouteUrl } from '@frankmoney/utils'
import { identity } from 'ramda'
import { push as pushLocation } from 'react-router-redux'
import { ROUTES } from 'const'
import ACTIONS from './actions'
import { tokenSelector, currentUserPidSelector } from './selectors'

export const loadEpic = (action$, store, { http }) =>
  action$
    .ofType(ACTIONS.load)
    .switchMap(async ({ payload: { token } }) => {
      const invite = await http.get(`/http/invite-info?token=${token}`)
      if (invite && invite.existingUser) {
        const currentUserPid = currentUserPidSelector(store.getState())
        if (`${invite.existingUser.pid}` === `${currentUserPid}`) {
          window.location = createRouteUrl(ROUTES.team.root, null, { i: token })
          return []
        }
        return [
          pushLocation(
            createRouteUrl(ROUTES.auth.login, null, {
              e: invite.email,
              r: createRouteUrl(ROUTES.auth.acceptInvitation, { token }),
            })
          ),
        ]
      }
      return [ACTIONS.load.success({ token, invite })]
    })
    .mergeMap(identity)
    .catchAndRethrow(ACTIONS.load.error)

export const createUserEpic = (action$, store, { http }) =>
  action$
    .ofType(ACTIONS.createUser)
    .switchMap(
      async ({ payload: { phone, firstName, lastName, email, password } }) => {
        const state = store.getState()
        const token = tokenSelector(state)

        const { code } = await http.post('/http/sign-up', {
          inviteToken: token,
          user: {
            email,
            password,
            lastName,
            firstName,
            phone,
          },
        })

        if (code === 'signed_in') {
          window.location = '/team'
          return [
            // ACTIONS.submit.success(),
          ]
        }

        throw new Error(`Unexpected server response code: ${code}`)
      }
    )
    .mergeMap(identity)
    .catchAndRethrow(ACTIONS.createUser.error)
