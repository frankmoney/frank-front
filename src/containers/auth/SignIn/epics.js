import { querySelector } from '@frankmoney/webapp'
import { identity } from 'ramda'
import { ROUTES } from 'const'
import ACTIONS from './actions'

export const onSubmitEpic = (action$, store, { http }) =>
  action$
    .ofType(ACTIONS.submit)
    .switchMap(async ({ payload: { email, password } }) => {
      try {
        const { code } = await http.post('/http/sign-in', {
          username: email,
          password,
        })

        if (code === 'signed_in') {
          const query = querySelector(store.getState())
          window.location = (query && query.r) || ROUTES.account.root
          return [
            // ACTIONS.submit.success(),
          ]
        }

        throw new Error(`Unexpected server response code: ${code}`)
      } catch (exc) {
        try {
          const { code } = exc.response.data

          if (code === 'invalid_credentials') {
            return [
              ACTIONS.submit.error({
                password: 'Invalid credentials',
              }),
            ]
          }
        } catch (exc2) {
          // ignore
        }

        throw exc
      }
    })
    .mergeMap(identity)
    .catchAndRethrow(ACTIONS.submit.error)
