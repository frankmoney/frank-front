import Immutable, { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import * as ACTIONS from './actions'

export const REDUCER_KEY = 'adminLedger'

const defaultState = Immutable.fromJS({
  typing: false,
  loading: true,
  loaded: false,
  chartCategoryType: 'spending',
  categories: [],
  barsData: [],
  barsSize: null,
  pieData: [],
  paymentsCount: 0,
  payments: [],
  searchingSuggestions: null,
  suggestedPeers: [],
  suggestedDescriptions: [],
})

export default handleActions(
  {
    [ACTIONS.searchTyping]: state => state.merge({ typing: true }),
    [ACTIONS.load]: (state, { payload: { updateListOnly } }) =>
      state.merge(updateListOnly ? { updatingList: true } : { loading: true }),
    [ACTIONS.load.success]: (
      state,
      {
        payload: {
          barChart,
          barChartBarSize,
          categories,
          payments,
          pieChart,
          totalCount,
        },
      }
    ) =>
      state.merge({
        loading: false,
        typing: false,
        loaded: true,
        updatingList: false,
        categories: categories ? fromJS(categories) : state.get('categories'),
        payments: fromJS(payments),
        barsData: fromJS(barChart || []),
        barsSize: barChartBarSize,
        pieData: fromJS(pieChart || []),
        paymentsCount: totalCount,
      }),
    [ACTIONS.load.error]: state =>
      state.merge({
        loading: false,
        typing: false,
      }),
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
