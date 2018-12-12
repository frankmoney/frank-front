// @flow
import createActions from 'utils/createActions'

export default createActions('adminStoryEdit', {
  load: true,
  createOrUpdate: true,
  delete: true,
  publish: true,
  unpublish: true,
  updatePublished: true,
  modifyStoryPaymentsList: false,
  leave: false,
})
