import { tableExpandRow } from '@frankmoney/components'
import { currentAccountIdSelector } from 'redux/selectors/user'
import * as ACTIONS from '../actions'
import QUERIES from '../queries'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.paymentUpdate)
    .switchMap(
      ({
        payload: {
          paymentId,
          peerName,
          categoryId,
          description,
          publish,
          unpublish,
        },
      }) => {
        const state = store.getState()
        const currentAccountId = currentAccountIdSelector(state)

        const verified = publish ? true : unpublish ? false : undefined

        return graphql(QUERIES.paymentUpdate, {
          accountId: currentAccountId,
          paymentId,
          peerName,
          peerId: null, // пока что обновляем пира всегда текстом
          categoryId,
          description,
          verified,
        }).then(payment => ({
          payment,
          published: publish,
          unpublished: unpublish,
        }))
      }
    )
    .mergeMap(({ payment, published, unpublished }) => [
      ACTIONS.paymentUpdate.success(payment),
      // если это обычный сейв то карточку закрывать не нужно
      ...(published || unpublished
        ? [tableExpandRow({ name: 'ledger', rowId: null })]
        : []),
    ])
