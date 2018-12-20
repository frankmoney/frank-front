import { identity } from 'ramda'
import { stopAsyncValidation } from 'redux-form'
import ACTIONS from './actions'
import { FORM_NAME } from './const'

export const signInEpic = (action$, store, { http }) =>
  action$
    .ofType(ACTIONS.signIn)
    .switchMap(async ({ payload: { email, password } }) => {
      try {
        const { code } = await http.post('/http/sign-in', {
          username: email,
          password,
        })

        if (code === 'signed_in') {
          window.location = '/'
          return [ACTIONS.signIn.success()]
        }

        throw new Error('Unexpected server response code')
      } catch (exc) {
        // eslint-disable-next-line no-console
        console.error(exc)

        return [
          ACTIONS.signIn.error({ error: exc }),
          stopAsyncValidation(FORM_NAME, { email: 'Invalid credentials' }),
        ]
      }
    })
    .mergeMap(identity)
