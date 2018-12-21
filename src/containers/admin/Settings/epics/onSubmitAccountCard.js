import ACTIONS from '../actions'
import QUERIES from '../queries'
import { pidSelector } from '../selectors'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.submitAccountCard)
    .switchMap(async ({ payload: { name, description, isPublic } }) => {
      const state = store.getState()
      const pid = pidSelector(state)

      const { account } = await graphql(QUERIES.updateAccount, {
        pid,
        name,
        description,
        isPublic,
      })

      return ACTIONS.submitAccountCard.success({ account })
    })
    .catchAndRethrow(ACTIONS.submitAccountCard.error)
