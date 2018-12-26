import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import * as ACTIONS from './actions'

export const REDUCER_KEY = 'publicLedger'

const defaultState = fromJS({
  barsData: [],
  barsUnit: null,
  categories: [],
  description: null,
  filtersEdit: {
    data: {},
    loaded: false,
    open: false,
  },
  loaded: false,
  loading: true,
  name: '',
  payments: [],
  paymentsCount: 0,
  pieData: {},
  revenue: 0,
  spending: 0,
  total: 0,
  typing: false,
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
          allPeers,
          barChart,
          barsUnit,
          categories,
          description,
          name,
          payments,
          pieChart,
          revenue,
          spending,
          stories,
          total,
          totalCount,
        },
      }
    ) =>
      state.merge({
        allPeers: fromJS(allPeers),
        barsData: fromJS(barChart || []),
        barsUnit,
        categories: categories ? fromJS(categories) : state.get('categories'),
        description,
        loaded: true,
        loading: false,
        name,
        payments: fromJS(payments),
        paymentsCount: totalCount,
        pieData: fromJS(pieChart),
        revenue,
        spending,
        stories: fromJS(stories || []),
        total,
        typing: false,
        updatingList: false,
      }),
    [ACTIONS.load.error]: state =>
      state.merge({
        loading: false,
        typing: false,
        updatingList: false,
      }),
    [ACTIONS.leave]: () => defaultState,
  },
  defaultState
)
