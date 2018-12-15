import { tableExpandRow } from '@frankmoney/components'
import CARD_ACTIONS from 'containers/admin/PaymentCard/actions'

export default action$ =>
  action$
    .ofType(CARD_ACTIONS.publish.success)
    .map(() => tableExpandRow({ name: 'ledger', rowId: null }))
