import FILTERS_ACTIONS from 'containers/admin/Filters/actions'
import * as ACTIONS from '../actions'
import { currentFiltersSelector } from '../selectors'

export default (action$, store) =>
  action$
    .ofType(ACTIONS.barZoomIn)
    .map(({ payload: { dateFrom, dateTo } }) => {
      const filters = currentFiltersSelector(store.getState())
      return {
        sumLimit: {
          min: filters.amountMin,
          max: filters.amountMax,
        },
        verified: filters.verified,
        dateLimit: {
          from: dateFrom,
          to: dateTo,
        },
      }
    })
    .map(FILTERS_ACTIONS.apply)
