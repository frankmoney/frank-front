import { currentAccountIdSelector } from 'redux/selectors/user'
import QUERIES from './queries'
import ACTIONS from './actions'
import * as SELECTORS from './selectors'

export const publish = (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.confirmChangePublish)
    .switchMap(() => {
      const state = store.getState()
      return graphql(QUERIES.updatePayments, {
        accountId: currentAccountIdSelector(state),
        paymentIds: SELECTORS.paymentIds(state),
        verified: SELECTORS.publishValue(state),
      })
    })
    .map(ACTIONS.updateSuccess)
    .catch(() => ACTIONS.updateFail())

export const edit = (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.confirmEdit)
    .switchMap(({ payload: { peerName, categoryId, description } }) => {
      const state = store.getState()
      return graphql(QUERIES.updatePayments, {
        accountId: currentAccountIdSelector(state),
        paymentIds: SELECTORS.paymentIds(state),
        peerName,
        categoryId,
        description,
      })
    })
    .map(ACTIONS.updateSuccess)
    .catch(() => ACTIONS.updateFail())
