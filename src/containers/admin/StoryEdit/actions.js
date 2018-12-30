// @flow
import createActions from 'utils/createActions'

export default createActions('adminStoryEdit', {
  load: true,
  showPublishOrUnpublishConfirmDialog: false,
  showDeleteConfirmDialog: false,
  createOrUpdate: true,
  delete: true,
  modifyStoryPaymentsList: false,
  leave: false,
})
