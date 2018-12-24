import ACTIONS from './actions'

export const loadEpic = (action$, store, { http }) =>
  action$
    .ofType(ACTIONS.load)
    .switchMap(async ({ payload: { token } }) => {
      await http.get(`/http/reset-password?token=${encodeURIComponent(token)}`)
      return ACTIONS.load.success()
    })
    .catchAndRethrow(ACTIONS.load.error)
