import ACTIONS from './actions'

export const onSubmitEpic = (action$, store, { http }) =>
  action$
    .ofType(ACTIONS.submit)
    .switchMap(async ({ payload: { email } }) => {
      await http.post('/http/recover-password', { email })
      return ACTIONS.submit.success({ email })
    })
    .catchAndRethrow(ACTIONS.submit.error)
