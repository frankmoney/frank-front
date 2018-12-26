import { createRouteUrl } from '@frankmoney/utils'
import { identity } from 'ramda'
import { push } from 'react-router-redux'
import { ROUTES } from 'const'
import ACTIONS from './actions'

export const onSubmitEpic = (action$, store, { http }) =>
  action$
    .ofType(ACTIONS.submit)
    .switchMap(async ({ payload: { email } }) => {
      await http.post('/http/recover-password', { email })
      return [
        ACTIONS.submit.success(),
        push(createRouteUrl(ROUTES.auth.recoverPasswordSuccess)),
      ]
    })
    .mergeMap(identity)
    .catchAndRethrow(ACTIONS.submit.error)
