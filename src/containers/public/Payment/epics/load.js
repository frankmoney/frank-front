import ACTIONS from '../actions'
import QUERIES from '../queries'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.load)
    .switchMap(async ({ payload: { accountId, paymentId } }) => {
      const { account, payment } = await graphql(QUERIES.getPayment, {
        accountId,
        paymentId,
      })

      return { account, payment }
    })
    .map(ACTIONS.load.success)
