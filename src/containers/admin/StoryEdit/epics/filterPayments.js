import { currentAccountIdSelector } from 'redux/selectors/user'
import ACTIONS from '../actions'
import QUERIES from '../queries'
import {
  paymentsFiltersSelector,
  paymentsLoadedPagesCounterSelector,
} from '../selectors'
import { PAGE_SIZE } from '../constants'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.filterPayments)
    .switchMap(() => {
      const state = store.getState()
      const page = paymentsLoadedPagesCounterSelector(state)
      const { dateMin, dateMax } = paymentsFiltersSelector(state)

      console.log('ACTIONS.filterPayments')
      console.log({ dateMin, dateMax })

      return graphql(
        QUERIES.getStoryAndPaymentsAndTotalCount({
          payments: true,
          totalCount: true,
        }),
        {
          accountId: currentAccountIdSelector(store.getState()),
          first: PAGE_SIZE,
          skip: page * PAGE_SIZE,
          dateMin,
          dateMax,
          verified: true,
        }
      )
    })
    .map(ACTIONS.filterPayments.success)
