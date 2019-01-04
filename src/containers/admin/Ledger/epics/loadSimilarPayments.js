import { currentAccountIdSelector } from 'redux/selectors/user'
import { DEFAULT_DRAWER_PAYMENTS_PAGE_SIZE as PAGE_SIZE } from 'components/drawers/constants'
import { mapSimilarBasedOnDescription } from 'data/models/payment'
import QUERIES from 'containers/public/Payment/queries'
import * as ACTIONS from '../actions'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.loadSimilarPayments)
    .switchMap(async ({ payload: { paymentId } }) => {
      const state = store.getState()
      const accountId = currentAccountIdSelector(state)

      const payments = await graphql(QUERIES.getSimilarPayments, {
        accountId,
        paymentId,
        first: PAGE_SIZE,
        skip: 0,
      })

      return mapSimilarBasedOnDescription(paymentId, payments)
    })
    .map(ACTIONS.loadSimilarPayments.success)
