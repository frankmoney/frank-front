import FILTERS_ACTIONS from 'containers/admin/Filters/actions'
import ACTIONS from '../actions'
import * as SELECTORS from '../selectors'

export default (action$, store) =>
  action$
    .ofType(ACTIONS.filtersOpen)
    .map(() => ({
      ...SELECTORS.currentFilters(store.getState()),
      verified: false,
    }))
    .map(FILTERS_ACTIONS.open)
