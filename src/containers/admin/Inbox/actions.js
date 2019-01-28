// @flow
import createActions from 'utils/createActions'

export default createActions('adminInbox', {
  check: false,
  filtersOpen: false,
  leave: false,
  load: true,
  resetSearch: false,
  selectPage: false,
})
