import { identity } from 'ramda'
import { ROUTES } from 'const'
import ACTIONS from './actions'

export const onSubmitEpic = (action$, store, { http }) =>
  action$
    .ofType(ACTIONS.submit)
    .switchMap(
      async ({
        payload: {
          teamName,
          teamSize,
          city,
          phone,
          firstName,
          lastName,
          email,
          password,
        },
      }) => {
        try {
          const { code } = await http.post('/http/sign-up', {
            team: {
              name: teamName,
              city,
              size: teamSize,
            },
            user: {
              email,
              password,
              lastName,
              firstName,
              phone,
            },
          })

          if (code === 'signed_in') {
            window.location = ROUTES.account.root
            return [
              // ACTIONS.submit.success(),
            ]
          }

          throw new Error(`Unexpected server response code: ${code}`)
        } catch (exc) {
          try {
            const { code } = exc.response.data

            if (code === 'email_in_use') {
              return [
                ACTIONS.submit.error({
                  email: 'Email is in use',
                }),
              ]
            }
          } catch (exc2) {
            // ignore
          }

          throw exc
        }
      }
    )
    .mergeMap(identity)
    .catchAndRethrow(ACTIONS.submit.error)
