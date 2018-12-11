import { compose, withProps } from 'recompose'
import reconnect from 'utils/reconnect'
import PaymentsSelectorDrawer from 'components/drawers/PaymentsSelectorDrawer'
import ACTIONS from './actions'
import * as SELECTORS from './selectors'
import { PAGE_SIZE } from './constants'

export default compose(
  reconnect(
    {
      isLoading: SELECTORS.loading,
      isLoadingMore: SELECTORS.loadingMore,
      isListUpdating: SELECTORS.paymentsUpdating,
      open: SELECTORS.open,
      filter: SELECTORS.filters,
      filterLimits: SELECTORS.filterLimits,
      categories: SELECTORS.categories,
      canLoadMore: SELECTORS.canLoadMore,
      payments: SELECTORS.payments,
    },
    {
      onClose: ACTIONS.close,
      onFilter: ACTIONS.change,
      onReset: ACTIONS.reset,
      onLoadMore: ACTIONS.loadMore,
    }
  ),
  withProps({ pageSize: PAGE_SIZE })
)(PaymentsSelectorDrawer)
