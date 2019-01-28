// @flow
import createActions from 'utils/createActions'

export default createActions('adminInbox', {
  check: false,
  filtersOpen: false,
  leave: false,
  load: true,
  pastePayment: true,
  resetSearch: false,
  selectPage: false,
})
