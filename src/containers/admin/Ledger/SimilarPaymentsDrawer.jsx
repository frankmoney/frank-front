// @flow strict-local
import { compose, lifecycle } from 'recompose'
import reconnect from 'utils/reconnect'
import PaymentsSimilarDrawer from 'components/drawers/PaymentsSimilarDrawer'
import { SIMILAR } from './selectors'
import * as ACTIONS from './actions'

export default compose(
  reconnect(
    (_, initialProps) => ({
      open: SIMILAR.drawerOpenedSelector,
      loading: SIMILAR.listLoadingSelector,
      loadingMore: SIMILAR.listMoreLoadingSelector,
      loadedPagesCounter: SIMILAR.loadedPagesCounterSelector,
      totalPagesCounter: SIMILAR.totalPagesCounterSelector,
      payments: SIMILAR.similarPaymentsSelector,
      paymentsCount: () => initialProps.similarCount,
    }),
    {
      onLoad: ACTIONS.loadSimilarPayments,
      onLoadMore: ACTIONS.loadMoreSimilarPayments,
      onClose: () => ACTIONS.closeSimilarPaymentsDrawer(),
    }
  ),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      if (!this.props.open && nextProps.open) {
        this.props.onLoad({
          paymentsCount: nextProps.paymentsCount,
          paymentId: nextProps.paymentId,
        })
      }
    },
  })
)(PaymentsSimilarDrawer)
