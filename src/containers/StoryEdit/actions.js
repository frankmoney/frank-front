import createActions from 'utils/createActions'

export default createActions('storyEdit', {
  load: true,
  createOrUpdate: true,
  delete: true,
  publish: true,
  modifyStoryPaymentsList: false,
  loadMorePayments: true,
  leave: false,
})
