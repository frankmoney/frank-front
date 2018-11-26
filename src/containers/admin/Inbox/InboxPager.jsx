import { compose, branch, renderNothing } from 'recompose'
import reconnect from 'utils/reconnect'
import Pager from 'components/Pager'
import ACTIONS from './actions'
import * as SELECTORS from './selectors'

export default compose(
  reconnect(
    {
      current: SELECTORS.currentPage,
      total: SELECTORS.totalPages,
    },
    {
      onPageSelect: ACTIONS.selectPage,
    }
  ),
  branch(props => props.total <= 1, renderNothing)
)(Pager)
