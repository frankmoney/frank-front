import createActions from 'utils/createActions'

export default createActions('publicPayment', {
  load: true,
  loadSimilarPayments: true,
  loadMoreSimilarPayments: true,
  openDrawer: false,
  closeDrawer: false,
  leave: false,
})
