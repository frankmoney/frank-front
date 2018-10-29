import { currentAccountIdSelector } from 'redux/selectors/user'
import ACTIONS from '../actions'
import { PAGE_SIZE } from '../constants'
import QUERIES from '../queries'
import { paymentsLoadedPagesCounterSelector } from '../selectors'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.load)
    .switchMap(({ payload: storyId }) => {
      const state = store.getState()
      const page = paymentsLoadedPagesCounterSelector(state)

      return graphql(
        QUERIES.getStoryAndPaymentsAndTotalCount({
          storyId,
          payments: true,
          totalCount: true,
        }),
        {
          accountId: currentAccountIdSelector(store.getState()),
          storyId,
          first: PAGE_SIZE,
          skip: page * PAGE_SIZE,
          verified: true,
        }
      )
    })
    .map(ACTIONS.load.success)
