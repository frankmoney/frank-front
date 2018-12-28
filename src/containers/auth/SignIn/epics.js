import ACTIONS from './actions'

export const onSubmitEpic = (action$, store, { http }) =>
  action$
    .ofType(ACTIONS.submit)
    .switchMap(async ({ payload: { email, password } }) => {
      const { code } = await http.post('/http/sign-in', {
        username: email,
        password,
      })

      if (code === 'signed_in') {
        window.location = '/'
        return ACTIONS.submit.success()
      }

      if (code === 'invalid_credentials') {
        return ACTIONS.submit.error({
          code: 'invalid_credentials',
        })
      }

      throw new Error(`Unexpected server response code: ${code}`)
    })
    .catchAndRethrow(ACTIONS.submit.error)
