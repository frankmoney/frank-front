import { currentAccountIdSelector } from 'redux/selectors/user'
import reconnect from 'utils/reconnect'
import ACTIONS from './actions'
import * as SELECTORS from './selectors'

export default reconnect(
  (_, initialProps) => ({
    accountId: currentAccountIdSelector,
    canPaste: SELECTORS.canPaste,
    categoryChanged: SELECTORS.categoryChanged(initialProps.id),
    descriptionChanged: SELECTORS.descriptionChanged(initialProps.id),
    peerChanged: SELECTORS.peerChanged(initialProps.id),
    publishing: SELECTORS.publishing(initialProps.id),
    saving: SELECTORS.saving(initialProps.id),
  }),
  {
    onPaymentCopy: ACTIONS.copy,
    onPaymentPaste: ACTIONS.paste,
    onPaymentPublish: ACTIONS.publish,
    onPaymentSave: ACTIONS.save,
    onPaymentUnpublish: ACTIONS.unpublish,
  }
)
