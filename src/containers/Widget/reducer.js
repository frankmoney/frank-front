import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
// FIXME: static data
import CATEGORIES from './Demo/categories.json'
import CHART_DATA from './Demo/chartData.json'

export const name = 'widgetData'

const initialState = fromJS({
  categories: CATEGORIES,
  chartData: CHART_DATA,
})

export default handleActions({}, initialState)
