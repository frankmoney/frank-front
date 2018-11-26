// @flow
import createActions from 'utils/createActions'

export default createActions('adminInbox', {
  load: true,
  leave: false,
  filtersOpen: false,
  selectPage: false,
  resetSearch: false,
})
