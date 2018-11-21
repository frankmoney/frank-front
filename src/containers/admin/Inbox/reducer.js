import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import ACTIONS from './actions'

export const REDUCER_KEY = 'adminInbox'

const defaultState = fromJS({
  loading: false,
  loaded: false,
})

export default handleActions(
  {
    // [ACTIONS.load]: state => state.merge({ loading: true }),
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
    [ACTIONS.leave]: () => defaultState,
  },
  defaultState
)
