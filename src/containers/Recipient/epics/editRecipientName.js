import * as ACTIONS from '../actions'
import QUERIES from '../queries'
import { recipientSelector } from '../selectors'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.editName)
    .switchMap(({ payload }) => {
      const state = store.getState()
      const name = payload
      const recipient = recipientSelector(state)

      const id = recipient.id

      return graphql(QUERIES.editPeerName, {
        peerId: id,
        name,
      })
    })
    .map(ACTIONS.editName.success)
