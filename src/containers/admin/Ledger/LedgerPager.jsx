import reconnect from 'utils/reconnect'
import Pager from 'components/Pager'
import * as ACTIONS from './actions'
import { currentPageSelector, totalPagesSelector } from './selectors'

export default reconnect(
  {
    current: currentPageSelector,
    total: totalPagesSelector,
  },
  {
    onPageSelect: ACTIONS.selectPage,
  }
)(Pager)
