import * as ACTIONS from '../actions'
import { PAGE_SIZE } from '../constants'
import QUERIES from '../queries'
import { currentPageSelector, recipientSelector } from '../selectors'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.load)
    .switchMap(({ payload: { peerId } }) => {
      const state = store.getState()
      const page = currentPageSelector(state)
      const recipient = recipientSelector(state)

      const id = peerId || recipient.id

      return graphql(
        QUERIES.getRecipientAndPayments({
          recipient: true,
          payments: true,
        }),
        {
          peerId: id,
          first: PAGE_SIZE,
          skip: (page - 1) * PAGE_SIZE,
        }
      )
    })
    // .map(R.evolve({ payments: R.map(mapPayment) }))
    .map(ACTIONS.load.success)
