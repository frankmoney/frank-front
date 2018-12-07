import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import ACTIONS from './actions'

export const REDUCER_KEY = 'paymentsSelect'

const defaultState = fromJS({
  open: false,
  loaded: false,
  loadingMore: false,
  paymentsUpdating: false,
  filterLimits: {},
  filters: {},
  initialFilters: {},
  categories: [],
  payments: [],
  totalCount: null,
})

export default handleActions(
  {
    [ACTIONS.open]: state => state.merge({ open: true }),
    [ACTIONS.change]: (state, { payload: newFilters }) =>
      state.update('filters', x => x.merge(newFilters)),
    [ACTIONS.load]: state => state.merge({ loaded: false }),
    [ACTIONS.loadMore]: state => state.merge({ loadingMore: true }),
    [ACTIONS.loadMore.success]: (state, { payload: payments }) =>
      state.merge({
        loadingMore: false,
        payments: state.get('payments').concat(payments),
      }),
    [ACTIONS.reloadList]: state => state.merge({ paymentsUpdating: true }),
    [ACTIONS.reloadList.success]: (
      state,
      { payload: { payments, totalCount } }
    ) =>
      state.merge({
        paymentsUpdating: false,
        totalCount,
        payments,
      }),
    [ACTIONS.load.success]: (
      state,
      { payload: { initialFilters, payments, limits, categories, totalCount } }
    ) =>
      state.merge({
        loaded: true,
        filters: initialFilters,
        initialFilters,
        totalCount,
        payments,
        filterLimits: limits,
        categories,
      }),
    [ACTIONS.reset]: state =>
      state.update('filters', x =>
        x.merge({
          dateMin: null,
          dateMax: null,
          sumMin: null,
          sumMax: null,
          categoryId: null,
        })
      ),
    [ACTIONS.close]: state => state.merge({ open: false }),
  },
  defaultState
)
