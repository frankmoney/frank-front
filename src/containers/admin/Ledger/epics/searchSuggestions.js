import { currentAccountIdSelector } from 'redux/selectors/user'
import * as ACTIONS from '../actions'
import QUERIES from '../queries'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.searchSuggestions)
    .debounceTime(500)
    .switchMap(({ payload: { search, peers, descriptions } }) => {
      console.log('epic', { search, peers, descriptions })
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
    .map(({ peers, descriptions }) => {
      console.log('searchSuggestions.success', { peers, descriptions })
      return ACTIONS.searchSuggestions.success({ peers, descriptions })
    })
