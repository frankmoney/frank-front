import { currentAccountIdSelector } from 'redux/selectors/user'
import ACTIONS from '../actions'
import { PAGE_SIZE } from '../constants'
import QUERIES from '../queries'
import {
  paymentsFiltersSelector,
  paymentsLoadedPagesCounterSelector,
} from '../selectors'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.loadMorePayments)
    .switchMap(() => {
      const state = store.getState()
      const accountPid = currentAccountIdSelector(state)
      const page = paymentsLoadedPagesCounterSelector(state)
      const {
        dateMin: postedOnMin,
        dateMax: postedOnMax,
      } = paymentsFiltersSelector(state)

      return graphql(QUERIES.getPayments, {
        accountPid,
        postedOnMin,
        postedOnMax,
        take: PAGE_SIZE,
        skip: page * PAGE_SIZE,
      })
    })
    .map(ACTIONS.loadMorePayments.success)
