import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import CATEGORIES from './categories.json'
import CHART_DATA from './chartData.json'

export const name = 'ledgerCharts'

const initialState = fromJS({
  categories: CATEGORIES,
  chartData: CHART_DATA,
})

export default handleActions({}, initialState)
