import { DEFAULT_DRAWER_PAYMENTS_PAGE_SIZE as PAGE_SIZE } from 'components/drawers/constants'
import { mapSimilarBasedOnDescription } from 'data/models/payment'
import { currentAccountIdSelector } from 'redux/selectors/user'
import QUERIES from 'containers/public/Payment/queries'
import * as ACTIONS from '../actions'
import { SIMILAR } from '../selectors'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.loadMoreSimilarPayments)
    .switchMap(async ({ payload: { paymentId } }) => {
      const state = store.getState()
      const accountId = currentAccountIdSelector(state)

      const page = SIMILAR.loadedPagesCounterSelector(state)

      const payments = await graphql(QUERIES.getSimilarPayments, {
        accountId,
        paymentId,
        first: PAGE_SIZE,
        skip: page * PAGE_SIZE,
      })

      return mapSimilarBasedOnDescription(paymentId, payments)
    })
    .map(ACTIONS.loadMoreSimilarPayments.success)
