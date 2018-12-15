import CARD_ACTIONS from 'containers/admin/PaymentCard/actions'
import ACTIONS from '../actions'

export default action$ =>
  action$
    .ofType(CARD_ACTIONS.publish.success)
    .map(() => ACTIONS.load({ updateListOnly: true }))
