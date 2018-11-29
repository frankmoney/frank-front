import { currentAccountIdSelector } from 'redux/selectors/user'
import ACTIONS from '../actions'
import QUERIES from '../queries'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.paymentPublish)
    .switchMap(
      ({ payload: { paymentId, peerName, categoryId, description } }) => {
        const state = store.getState()
        const currentAccountId = currentAccountIdSelector(state)

        return graphql(QUERIES.paymentUpdate, {
          accountId: currentAccountId,
          paymentId,
          peerName,
          peerId: null, // пока что обновляем пира всегда текстом
          categoryId,
          description,
          verified: true,
        })
      }
    )
    .mergeMap(payment => [
      ACTIONS.paymentPublish.success(payment),
      ACTIONS.load({ updateListOnly: true }),
    ])
