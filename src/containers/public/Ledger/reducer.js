import Immutable, { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import * as ACTIONS from './actions'

export const REDUCER_KEY = 'publicLedger'

const defaultState = Immutable.fromJS({
  typing: false,
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
  name: '',
  spending: 0,
  revenue: 0,
  total: 0,
})

const mergeFilters = (state, data) =>
  state.update('filtersEdit', x => x.merge(data))

export default handleActions(
  {
    [ACTIONS.searchTyping]: state => state.merge({ typing: true }),
    [ACTIONS.load]: (state, { payload: { accountId, updateListOnly } }) =>
      state.merge(
        updateListOnly
          ? { updatingList: true }
          : { loading: true, id: accountId }
      ),
    [ACTIONS.load.success]: (
      state,
      {
        payload: {
          name,
          spending,
          revenue,
          total,
          allPeers,
          payments,
          categories,
          totalCount,
          pieChart,
          barChart,
          stories,
        },
      }
    ) =>
      state.merge({
        loading: false,
        typing: false,
        loaded: true,
        updatingList: false,
        name,
        spending,
        revenue,
        total,
        categories: categories ? fromJS(categories) : state.get('categories'),
        allPeers: fromJS(allPeers),
        payments: fromJS(payments),
        barsData: fromJS(barChart || []),
        pieData: fromJS(pieChart || []),
        stories: fromJS(stories || []),
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
    [ACTIONS.leave]: () => defaultState,
    [ACTIONS.selectCategoryType]: (state, { payload: categoryType }) =>
      state.merge({ chartCategoryType: categoryType }),
  },
  defaultState
)
