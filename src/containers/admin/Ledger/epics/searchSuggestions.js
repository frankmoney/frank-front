import { currentAccountIdSelector } from 'redux/selectors/user'
import * as ACTIONS from '../actions'
import QUERIES from '../queries'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.searchSuggestions)
    .debounceTime(500)
    .switchMap(({ payload: { search, peers, descriptions } }) => {
      const state = store.getState()
      const currentAccountId = currentAccountIdSelector(state)

      return graphql(
        QUERIES.getSuggestions({
          peers,
          descriptions,
        }),
        {
          accountId: currentAccountId,
          search,
        }
      )
    })
    .map(ACTIONS.searchSuggestions.success)
