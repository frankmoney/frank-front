import { compose } from 'recompose'
import reconnect from 'utils/reconnect'
import PaymentsFilterDrawer from 'components/drawers/PaymentsFilterDrawer'
import ACTIONS from './actions'
import * as SELECTORS from './selectors'

export default compose(
  reconnect(
    {
      loaded: SELECTORS.loaded,
      open: SELECTORS.open,
      estimating: SELECTORS.estimating,
      totalCount: SELECTORS.totalCount,
      value: SELECTORS.data,
      aggregateStartDate: SELECTORS.aggregateDateMin,
      aggregateSumMin: SELECTORS.aggregateSumMin,
      aggregateSumMax: SELECTORS.aggregateSumMax,
    },
    {
      onClose: () => ACTIONS.close(),
      onApply: ACTIONS.apply,
      onChange: ACTIONS.change,
      onReset: () => ACTIONS.reset(),
    }
  )
)(PaymentsFilterDrawer)
