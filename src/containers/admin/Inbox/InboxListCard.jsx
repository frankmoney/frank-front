// @flow
import PaymentCard from 'containers/admin/PaymentCard'
import reconnect from 'utils/reconnect'
import ACTIONS from './actions'
import * as SELECTORS from './selectors'

export default reconnect(
  (_, initialProps) => ({
    categories: SELECTORS.categories,
    isChecked: SELECTORS.isCheckedId(initialProps.id),
  }),
  props => ({
    onCheck: checked => ACTIONS.check({ id: props.id, checked }),
    onPaymentPaste: ACTIONS.pastePayment,
  })
)(PaymentCard)
