import createActions from 'utils/createActions'

export default createActions('adminStoryEdit', {
  load: true,
  createOrUpdate: true,
  delete: true,
  publish: true,
  modifyStoryPaymentsList: false,
  filterPayments: true,
  loadMorePayments: true,
  leave: false,
})
