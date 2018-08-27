import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import PIE_CHART_DATA from './Demo/pieChartData.json' // FIXME: static data

export const REDUCER_KEY = 'widgetData'

const initialState = fromJS({
  barsData: [], // TODO: bars placeholder data
  pieData: PIE_CHART_DATA,
})

export default handleActions({}, initialState)
