import * as ACTIONS from '../actions'

export default action$ =>
  action$.ofType(ACTIONS.filtersChange).map(ACTIONS.filtersEstimateResultsCount)
