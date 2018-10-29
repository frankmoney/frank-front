import createActions from 'utils/createActions'

export default createActions('storyEdit', {
  load: true,
  createOrUpdate: true,
  delete: true,
  publish: true,
  unpublish: true,
  modifyStoryPaymentsList: false,
  filterPayments: true,
  loadMorePayments: true,
  leave: false,
})
