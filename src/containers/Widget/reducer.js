import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import { convertGraphqlPieData } from 'data/models/pieData'
// FIXME: static data
import BAR_CHART_DATA from 'demo/Widgets/barChartData.json'
import PAYMENTS_DATA from 'demo/Widgets/paymentsData.json'
import PIE_CHART_DATA from 'demo/Widgets/pieChartData.json'
import * as ACTIONS from './actions'

export const REDUCER_KEY = 'widget'
const PAYMENTS_TAB = 'payments'

const initialState = fromJS({
  barsData: BAR_CHART_DATA,
  categoryType: 'spending', // TODO: should it be hardcoded?
  currentCategory: null,
  payments: PAYMENTS_DATA,
  period: 'All time', // FIXME: placeholder
  periods: ['All time', '2018', 'TBD'], // FIXME: placeholder
  pieData: convertGraphqlPieData(PIE_CHART_DATA),
  selectedAll: false,
  tab: 'overview',
})

export default handleActions(
  {
    [ACTIONS.selectCategoryType]: (state, { payload: categoryType }) =>
      state.merge({ categoryType }),
    [ACTIONS.selectCategory]: (state, { payload: category }) =>
      state.merge({ currentCategory: category, tab: PAYMENTS_TAB }),
    [ACTIONS.cancelCategory]: state =>
      state.merge({
        currentCategory: null,
        selectedAll: false,
        tab: 'overview',
      }),
    [ACTIONS.selectPeriod]: (state, { payload: period }) =>
      state.merge({ period }),
    [ACTIONS.selectAllCategories]: state =>
      state.merge({ selectedAll: true, tab: PAYMENTS_TAB }),
    [ACTIONS.switchTab]: (state, { payload: tab }) => state.merge({ tab }),
  },
  initialState
)
