import { currentAccountIdSelector } from 'redux/selectors/user'
import ACTIONS from '../actions'
import QUERIES from '../queries'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.load)
    .switchMap(() => {
      const state = store.getState()
      const accountId = currentAccountIdSelector(state)

      return graphql(QUERIES.getAccountInfo, { accountId })
    })

    .map(ACTIONS.load.success)
