import { createRouteUrl } from '@frankmoney/utils'
import { identity } from 'ramda'
import { push } from 'react-router-redux'
import { ROUTES } from 'const'
import ACTIONS from './actions'

export const loadEpic = (action$, store, { http }) =>
  action$
    .ofType(ACTIONS.load)
    .switchMap(async ({ payload: { token } }) => {
      const res = await http.get(
        `/http/reset-password?token=${encodeURIComponent(token)}`
      )

      return ACTIONS.load.success(res)
    })
    .catchAndRethrow(ACTIONS.load.error)

export const onSubmitEpic = (action$, store, { http }) =>
  action$
    .ofType(ACTIONS.submit)
    .switchMap(async ({ payload: { token, password } }) => {
      await http.post('/http/reset-password', {
        token,
        password,
      })

      return [
        ACTIONS.submit.success(),
        push(createRouteUrl(ROUTES.auth.resetPasswordSuccess)),
      ]
    })
    .mergeMap(identity)
    .catchAndRethrow(ACTIONS.submit.error)
