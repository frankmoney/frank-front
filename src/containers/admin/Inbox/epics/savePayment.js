import { currentAccountIdSelector } from 'redux/selectors/user'
import ACTIONS from '../actions'
import QUERIES from '../queries'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.paymentSave)
    .switchMap(
      ({ payload: { paymentId, peerName, categoryId, description } }) => {
        const state = store.getState()
        const currentAccountId = currentAccountIdSelector(state)

        return graphql(QUERIES.paymentUpdate, {
          accountId: currentAccountId,
          paymentId,
          // peerId,
          peerName,
          categoryId,
          description,
        })
      }
    )
    .map(ACTIONS.paymentSave.success)
