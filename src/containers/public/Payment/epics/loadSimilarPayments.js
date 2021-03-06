import { DEFAULT_DRAWER_PAYMENTS_PAGE_SIZE as PAGE_SIZE } from 'components/drawers/constants'
import { mapSimilarBasedOnDescription } from 'data/models/payment'
import ACTIONS from '../actions'
import QUERIES from '../queries'
import { accountSelector, paymentSelector } from '../selectors'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.loadSimilarPayments)
    .switchMap(async () => {
      const state = store.getState()
      const accountId = accountSelector(state).id
      const paymentId = paymentSelector(state).id

      const payments = await graphql(QUERIES.getSimilarPayments, {
        accountId,
        paymentId,
        first: PAGE_SIZE,
        skip: 0,
      })

      return mapSimilarBasedOnDescription(paymentId, payments)
    })
    .map(ACTIONS.loadSimilarPayments.success)
