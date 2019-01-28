import * as CARD_SELECTORS from 'containers/admin/PaymentCard/selectors'
import * as ACTIONS from '../actions'

export default (action$, store) =>
  action$.ofType(ACTIONS.pastePayment).map(({ payload: paymentId }) => {
    const state = store.getState()
    const clipboard = CARD_SELECTORS.clipboard(state)
    return ACTIONS.pastePayment.success({
      paymentId,
      clipboard,
    })
  })
