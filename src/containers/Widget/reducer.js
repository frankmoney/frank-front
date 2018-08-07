import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
// FIXME: static data
import CATEGORIES from 'components/Charts/categories.json'
import CHART_DATA from 'components/Charts/chartData.json'

export const name = 'widgetData'

const initialState = fromJS({
  categories: CATEGORIES,
  chartData: CHART_DATA,
})

export default handleActions({}, initialState)
