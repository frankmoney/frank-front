import { currentAccountIdSelector } from 'redux/selectors/user'
import reconnect from 'utils/reconnect'
import ACTIONS from './actions'
import * as SELECTORS from './selectors'

export default reconnect(
  (_, initialProps) => ({
    accountId: currentAccountIdSelector,
    saving: SELECTORS.saving(initialProps.id),
    publishing: SELECTORS.publishing(initialProps.id),
    descriptionChanged: SELECTORS.descriptionChanged(initialProps.id),
    peerChanged: SELECTORS.peerChanged(initialProps.id),
    categoryChanged: SELECTORS.categoryChanged(initialProps.id),
  }),
  {
    onPaymentSave: ACTIONS.save,
    onPaymentPublish: ACTIONS.publish,
    onPaymentUnpublish: ACTIONS.unpublish,
  }
)
