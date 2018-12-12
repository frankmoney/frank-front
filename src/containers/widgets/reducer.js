import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import { DEFAULT_PIE_TOTAL } from 'data/models/pieData'
// FIXME: static data
import PAYMENTS_DATA from 'demo/Widgets/paymentsData.json'
import PIE_CHART_DATA from 'demo/Widgets/pieChartData.json'

export const REDUCER_KEY = 'widget'

const initialState = fromJS({
  payments: PAYMENTS_DATA,
  pieData: PIE_CHART_DATA,
  pieTotal: DEFAULT_PIE_TOTAL,
})

export default handleActions({}, initialState)
