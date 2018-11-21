import { currentAccountIdSelector } from 'redux/selectors/user'
import * as ACTIONS from '../actions'
import QUERIES from '../queries'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.paymentUpdate)
    .switchMap(({ payload: { paymentId, peer, categoryId, description } }) => {
      const state = store.getState()
      const currentAccountId = currentAccountIdSelector(state)

      const peerId = peer && peer.id
      const peerName = peer && peer.name

      return graphql(QUERIES.paymentUpdate, {
        accountId: currentAccountId,
        paymentId,
        peerId,
        peerName,
        categoryId,
        description,
      })
    })
    .map(ACTIONS.paymentUpdate.success)
