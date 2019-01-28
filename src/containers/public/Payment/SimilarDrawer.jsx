import { compose, lifecycle } from 'recompose'
import reconnect from 'utils/reconnect'
import PaymentsSimilarDrawer from 'components/drawers/PaymentsSimilarDrawer'
import {
  drawerOpenedSelector,
  listLoadingSelector,
  listMoreLoadingSelector,
  similarPaymentsSelector,
  similarCountSelector,
  loadedPagesCounterSelector,
  totalPagesCounterSelector,
} from './selectors'
import ACTIONS from './actions'

export default compose(
  reconnect(
    {
      open: drawerOpenedSelector,
      loading: listLoadingSelector,
      loadingMore: listMoreLoadingSelector,
      loadedPagesCounter: loadedPagesCounterSelector,
      totalPagesCounter: totalPagesCounterSelector,
      payments: similarPaymentsSelector,
      paymentsCount: similarCountSelector,
    },
    {
      onLoad: ACTIONS.loadSimilarPayments,
      onLoadMore: ACTIONS.loadMoreSimilarPayments,
      onClose: () => ACTIONS.closeDrawer(),
    }
  ),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      if (
        this.props.open !== nextProps.open &&
        nextProps.payments.length === 0
      ) {
        this.props.onLoad(nextProps.paymentsCount)
      }
    },
  })
)(PaymentsSimilarDrawer)
