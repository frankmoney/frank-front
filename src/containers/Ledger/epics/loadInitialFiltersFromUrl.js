import * as ACTIONS from '../actions'
import {
  paymentsTotalCountSelector,
  currentFiltersSelector,
} from '../selectors'

export default (action$, store) =>
  action$.ofType(ACTIONS.filtersLoad).map(() => {
    // TODO async getting amount min/max from a server
    const state = store.getState()
    const filters = currentFiltersSelector(state)
    const totalCount = paymentsTotalCountSelector(state)
    const { amountMin, amountMax, dateMin, dateMax, verified } = filters
    return ACTIONS.filtersLoad.success({
      filters: {
        sumLimit: {
          min: amountMin || -80000,
          max: amountMax || 40000,
        },
        dateLimit: 'all',
        verified,
      },
      totalCount,
    })
  })
