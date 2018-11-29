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
  barsUnit: null,
  pieData: [],
  paymentsCount: 0,
  payments: [],
  name: '',
  spending: 0,
  revenue: 0,
  total: 0,
})

export default handleActions(
  {
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
          barsUnit,
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
        barsUnit,
        pieData: fromJS(pieChart || []),
        stories: fromJS(stories || []),
        paymentsCount: totalCount,
      }),
    [ACTIONS.load.error]: state =>
      state.merge({
        loading: false,
        typing: false,
      }),
    [ACTIONS.leave]: () => defaultState,
    [ACTIONS.selectCategoryType]: (state, { payload: categoryType }) =>
      state.merge({ chartCategoryType: categoryType }),
  },
  defaultState
)
