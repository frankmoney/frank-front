import { identity } from 'ramda'
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
          window.location = '/'
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
