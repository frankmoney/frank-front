import { currentAccountIdSelector } from 'redux/selectors/user'
import ACTIONS from '../actions'
import { PAGE_SIZE } from '../constants'
import QUERIES from '../queries'
import { paymentsLoadedPagesCounterSelector } from '../selectors'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.loadMorePayments)
    .switchMap(() => {
      const state = store.getState()
      const page = paymentsLoadedPagesCounterSelector(state)

      return graphql(
        QUERIES.getStoryAndPaymentsAndTotalCount({
          payments: true,
        }),
        {
          accountId: currentAccountIdSelector(store.getState()),
          first: PAGE_SIZE,
          skip: page * PAGE_SIZE,
          verified: true,
        }
      )
    })
    .map(ACTIONS.loadMorePayments.success)
