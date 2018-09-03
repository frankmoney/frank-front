import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
// FIXME: static data
import BAR_CHART_DATA from 'demo/Widgets/barChartData.json'
import PIE_CHART_DATA from 'demo/Widgets/pieChartData.json'

export const REDUCER_KEY = 'widgetData'

const initialState = fromJS({
  barsData: BAR_CHART_DATA,
  pieData: PIE_CHART_DATA,
  currentCategory: null,
})

export default handleActions({}, initialState)
