import Immutable, { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import * as ACTIONS from './actions'

export const REDUCER_KEY = 'ledger'

const defaultState = Immutable.fromJS({
  loading: true,
  searchText: '',
  filtersEdit: {
    open: false,
    loaded: false,
    data: {},
  },
  transactionsCount: 0,
  transactions: [],
})

const mergeFilters = (state, data) =>
  state.update('filtersEdit', x => x.merge(data))

export default handleActions(
  {
    [ACTIONS.load]: state => state.merge({ loading: true }),
    [ACTIONS.load.success]: (
      state,
      { payload: { transactions, totalCount } }
    ) =>
      state.merge({
        loading: false,
        transactions: fromJS(transactions),
        transactionsCount: totalCount,
      }),
    [ACTIONS.load.error]: state => state.merge({ loading: false }),
    [ACTIONS.filtersOpen]: state => mergeFilters(state, { open: true }),
    [ACTIONS.filtersChange]: (state, { payload: newFilters }) =>
      mergeFilters(state, { data: newFilters }),
    [ACTIONS.filtersLoad]: state => mergeFilters(state, { loaded: false }),
    [ACTIONS.filtersLoad.success]: (
      state,
      { payload: { filters, totalCount } }
    ) =>
      mergeFilters(state, {
        loaded: true,
        data: filters,
        totalCount,
        initialData: filters,
      }),
    [ACTIONS.filtersReset]: state =>
      mergeFilters(state, {
        data: state.getIn(['filtersEdit', 'initialData']),
      }),
    [ACTIONS.filtersEstimateResultsCount]: state =>
      mergeFilters(state, {
        estimatingResults: true,
      }),
    [ACTIONS.filtersEstimateResultsCount.success]: (
      state,
      { payload: totalCount }
    ) =>
      mergeFilters(state, {
        estimatingResults: false,
        totalCount,
      }),
    [ACTIONS.filtersClose]: state => mergeFilters(state, { open: false }),
    [ACTIONS.leave]: () => defaultState,
    [ACTIONS.searchTyping]: (state, { payload: text }) =>
      state.set('searchText', text),
  },
  defaultState
)
