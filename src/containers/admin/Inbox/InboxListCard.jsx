// @flow
import { compose, withHandlers } from 'recompose'
import PaymentCard from 'components/admin/PaymentCard'
import { currentAccountIdSelector } from 'redux/selectors/user'
import reconnect from 'utils/reconnect'
import ACTIONS from './actions'
import * as SELECTORS from './selectors'

export default compose(
  reconnect(
    (_, initialProps) => ({
      categories: SELECTORS.categories,
      accountId: currentAccountIdSelector,
      saving: SELECTORS.isPaymentSaving(initialProps.id),
      publishing: SELECTORS.isPaymentPublishing(initialProps.id),
    }),
    {
      paymentSave: ACTIONS.paymentSave,
      paymentPublish: ACTIONS.paymentPublish,
    }
  ),
  withHandlers({
    onPaymentSave: ({ paymentSave }) => changes => {
      paymentSave(changes)
    },
    onPaymentPublish: ({ paymentPublish }) => changes => {
      paymentPublish(changes)
    },
  })
)(PaymentCard)
