import * as R from 'ramda'
import { mapPayment } from 'data/models/payment'
import { currentAccountIdSelector } from 'redux/selectors/user'
import * as ACTIONS from '../actions'
import { PAGE_SIZE } from '../constants'
import QUERIES from '../queries'
import {
  currentFiltersSelector,
  searchTextSelector,
  chartsVisibleSelector,
} from '../selectors'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.load)
    .switchMap(
      () => {
        const state = store.getState()
        const search = searchTextSelector(state)
        const { amountMin, amountMax, verified } = currentFiltersSelector(state)
        const needLoadCharts = chartsVisibleSelector(state)

        return graphql(
          QUERIES.getPaymentsAndTotalCount({
            payments: true,
            totalCount: true,
            barChart: needLoadCharts,
            pieChart: needLoadCharts,
          }),
          {
            accountId: currentAccountIdSelector(store.getState()),
            first: PAGE_SIZE,
            search,
            amountMin,
            amountMax,
            verified,
          }
        )
      }

      // Promise.resolve({
      //   payments: [],
      //   totalCount: 0,
      // })
    )
    .map(R.evolve({ payments: R.map(mapPayment) }))
    .map(ACTIONS.load.success)
