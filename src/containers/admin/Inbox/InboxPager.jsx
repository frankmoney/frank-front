import reconnect from 'utils/reconnect'
import Pager from 'components/Pager'
import ACTIONS from './actions'
import * as SELECTORS from './selectors'

export default reconnect(
  {
    current: SELECTORS.currentPage,
    total: SELECTORS.totalPages,
  },
  {
    onPageSelect: ACTIONS.selectPage,
  }
)(Pager)
