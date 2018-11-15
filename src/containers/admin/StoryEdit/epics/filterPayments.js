import { currentAccountIdSelector } from 'redux/selectors/user'
import ACTIONS from '../actions'
import QUERIES from '../queries'
import { paymentsFiltersSelector } from '../selectors'
import { PAGE_SIZE } from '../constants'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.filterPayments)
    .switchMap(async () => {
      const state = store.getState()
      const accountPid = currentAccountIdSelector(state)
      const {
        dateMin: postedOnMin,
        dateMax: postedOnMax,
      } = paymentsFiltersSelector(state)

      const result = await Promise.all([
        graphql(QUERIES.getPayments, { accountPid, postedOnMin, postedOnMax }),
        graphql(QUERIES.countPayments, {
          accountPid,
          postedOnMin,
          postedOnMax,
          take: PAGE_SIZE,
        }),
      ])

      const [payments, totalCount] = result

      return { payments, totalCount }
    })
    .map(ACTIONS.filterPayments.success)
