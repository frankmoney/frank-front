import * as R from 'ramda'
import { currentAccountIdSelector } from 'redux/selectors/user'
import * as ACTIONS from '../actions'
import { PAGE_SIZE } from '../constants'
import QUERIES from '../queries'
import { searchTextSelector, currentPageSelector } from '../selectors'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.load)
    .switchMap(() => {
      const state = store.getState()
      const search = searchTextSelector(state)
      const page = currentPageSelector(state)

      return graphql(QUERIES.getDirectoryRecipients, {
        accountId: currentAccountIdSelector(store.getState()),
        first: PAGE_SIZE,
        skip: (page - 1) * PAGE_SIZE,
        search,
      })
    })
    // .map(R.evolve({ payments: R.map(mapPayment) }))
    .map(ACTIONS.load.success)
