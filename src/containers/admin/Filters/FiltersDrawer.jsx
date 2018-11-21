import { compose, mapProps } from 'recompose'
import reconnect from 'utils/reconnect'
import LedgerFilterDrawer from 'components/drawers/LedgerFilterDrawer'
import ACTIONS from './actions'
import * as SELECTORS from './selectors'

export default compose(
  reconnect(
    {
      loaded: SELECTORS.loaded,
      open: SELECTORS.open,
      estimating: SELECTORS.estimating,
      totalCount: SELECTORS.totalCount,
      filtersData: SELECTORS.data,
    },
    {
      onClose: ACTIONS.close,
      onApply: ACTIONS.apply,
      onChange: ACTIONS.change,
      onReset: ACTIONS.reset,
    }
  ),
  mapProps(({ filtersData, ...props }) => ({ ...filtersData, ...props }))
)(LedgerFilterDrawer)
