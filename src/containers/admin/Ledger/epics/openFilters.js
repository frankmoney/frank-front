import FILTERS_ACTIONS from 'containers/admin/Filters/actions'
import * as ACTIONS from '../actions'
import { currentFiltersSelector } from '../selectors'

export default (action$, store) =>
  action$
    .ofType(ACTIONS.filtersOpen)
    .map(() => currentFiltersSelector(store.getState()))
    .map(FILTERS_ACTIONS.open)
