import Immutable, { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import * as ACTIONS from './actions'

export const REDUCER_KEY = 'adminLedger'

const defaultState = Immutable.fromJS({
  loading: true,
  loaded: false,
  filtersEdit: {
    open: false,
    loaded: false,
    data: {},
  },
  chartCategoryType: 'spending',
  categories: [],
  barsData: [],
  pieData: [],
  paymentsCount: 0,
  payments: [],
  searchingSuggestions: null,
  suggestedPeers: [],
  suggestedDescriptions: [],
})

const mergeFilters = (state, data) =>
  state.update('filtersEdit', x => x.merge(data))

export default handleActions(
  {
    [ACTIONS.load]: (state, { payload: { updateListOnly } }) =>
      state.merge(updateListOnly ? { updatingList: true } : { loading: true }),
    [ACTIONS.load.success]: (
      state,
      { payload: { payments, categories, totalCount, pieChart, barChart } }
    ) =>
      state.merge({
        loading: false,
        typing: false,
        loaded: true,
        updatingList: false,
        categories: categories ? fromJS(categories) : state.get('categories'),
        payments: fromJS(payments),
        barsData: fromJS(barChart || []),
        pieData: fromJS(pieChart || []),
        paymentsCount: totalCount,
      }),
    [ACTIONS.load.error]: state =>
      state.merge({
        loading: false,
        typing: false,
      }),
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
    [ACTIONS.searchSuggestions]: (
      state,
      { payload: { peers, descriptions } }
    ) =>
      state.merge({
        searchingSuggestions:
          (peers && 'peers') || (descriptions && 'descriptions'),
      }),
    [ACTIONS.searchSuggestions.success]: (
      state,
      { payload: { peers, descriptions } }
    ) =>
      state.merge({
        searchingSuggestions: null,
        suggestedPeers: fromJS(peers || []),
        suggestedDescriptions: fromJS(descriptions || []),
      }),
    [ACTIONS.searchSuggestions.error]: state =>
      state.merge({
        searchingSuggestions: null,
      }),
    [ACTIONS.leave]: () => defaultState,
    [ACTIONS.selectCategoryType]: (state, { payload: categoryType }) =>
      state.merge({ chartCategoryType: categoryType }),
  },
  defaultState
)
