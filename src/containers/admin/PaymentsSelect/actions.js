// @flow
import createActions from 'utils/createActions'

export default createActions('paymentsSelect', {
  open: false,
  load: true,
  reloadList: true,
  loadMore: true,
  change: false,
  apply: false,
  reset: false,
  close: false,
})
