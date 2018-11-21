import FILTERS_ACTIONS from 'containers/admin/Filters/actions'
import ACTIONS from '../actions'
import { currentFiltersSelector } from '../selectors'

export default (action$, store) =>
  action$
    .ofType(ACTIONS.filtersOpen)
    .map(() => ({
      ...currentFiltersSelector(store.getState()),
      verified: false,
    }))
    .map(FILTERS_ACTIONS.open)
