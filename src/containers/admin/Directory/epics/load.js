import * as R from 'ramda'
import { currentAccountIdSelector } from 'redux/selectors/user'
import * as ACTIONS from '../actions'
import { PAGE_SIZE, SORT_BY } from '../constants'
import QUERIES from '../queries'
import {
  searchTextSelector,
  currentPageSelector,
  peerTypeFilterSelector,
  sortByFilterSelector,
} from '../selectors'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.load)
    .switchMap(() => {
      const state = store.getState()
      const search = searchTextSelector(state)
      const page = currentPageSelector(state)
      const peerFilter = peerTypeFilterSelector(state)
      const sortBy = R.pipe(
        R.find(R.propEq('query', sortByFilterSelector(state))),
        R.prop('graph')
      )(SORT_BY)

      return graphql(QUERIES.getDirectoryRecipients, {
        accountId: currentAccountIdSelector(store.getState()),
        first: PAGE_SIZE,
        skip: (page - 1) * PAGE_SIZE,
        search,
        recipients: peerFilter === 'all' || peerFilter === 'recipients',
        donors: peerFilter === 'all' || peerFilter === 'donors',
        sortBy,
      })
    })
    .map(ACTIONS.load.success)
