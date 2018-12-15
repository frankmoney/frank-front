import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import ACTIONS from './actions'

export const REDUCER_KEY = 'filters'

const defaultState = fromJS({
  open: false,
  loaded: false,
  initialData: {},
  data: {},
})

export default handleActions(
  {
    [ACTIONS.open]: state => state.merge({ open: true }),
    [ACTIONS.change]: (state, { payload: newFilters }) =>
      state.merge({ data: newFilters }),
    [ACTIONS.load]: state => state.merge({ loaded: false }),
    [ACTIONS.load.success]: (
      state,
      { payload: { filters, totalCount, aggregated } }
    ) =>
      state.merge({
        loaded: true,
        data: filters,
        totalCount,
        initialData: filters,
        aggregated,
      }),
    [ACTIONS.reset]: state =>
      state.merge({
        data: state.get('initialData'),
      }),
    [ACTIONS.estimateResults]: state =>
      state.merge({
        estimatingResults: true,
      }),
    [ACTIONS.estimateResults.success]: (state, { payload: totalCount }) =>
      state.merge({
        estimatingResults: false,
        totalCount,
      }),
    [ACTIONS.close]: state => state.merge({ open: false }),
  },
  defaultState
)
