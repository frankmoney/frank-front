import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
// FIXME: static data
import BAR_CHART_DATA from 'demo/Widgets/barChartData.json'
import PIE_CHART_DATA from 'demo/Widgets/pieChartData.json'
import * as ACTIONS from './actions'

export const REDUCER_KEY = 'widget'

const initialState = fromJS({
  barsData: BAR_CHART_DATA,
  categoryType: 'income', // FIXME: placeholder
  currentCategory: null,
  period: 'All time', // FIXME: placeholder
  pieData: PIE_CHART_DATA,
})

export default handleActions(
  {
    [ACTIONS.selectCategory]: (state, { payload: category }) =>
      state.merge({ currentCategory: category }),
    [ACTIONS.cancelCategory]: state => state.merge({ currentCategory: null }),
  },
  initialState
)
