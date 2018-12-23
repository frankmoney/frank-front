import * as R from 'ramda'
import { mapPayment } from 'data/models/payment'
import { formatDate } from 'utils/dates'
import { currentAccountIdSelector } from 'redux/selectors/user'
import ACTIONS from '../actions'
import { PAGE_SIZE } from '../constants'
import QUERIES from '../queries'
import * as SELECTORS from '../selectors'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.load)
    .switchMap(() => {
      const state = store.getState()
      const currentAccountId = currentAccountIdSelector(state)
      // const search = searchTextSelector(state)
      const page = SELECTORS.currentPage(state)
      const {
        amountMin,
        amountMax,
        dateMin,
        dateMax,
        pending,
      } = SELECTORS.currentFilters(state)

      return graphql(QUERIES.listNewPayments, {
        accountId: currentAccountId,
        take: PAGE_SIZE,
        skip: (page - 1) * PAGE_SIZE,
        // search,
        amountMin,
        amountMax,
        dateMin: dateMin && formatDate(dateMin),
        dateMax: dateMax && formatDate(dateMax),
        pending: pending ? null : false, // show all payments if pending on, exclude pending when filter is off
      })
    })
    .map(R.evolve({ payments: R.map(mapPayment) }))
    .map(ACTIONS.load.success)
