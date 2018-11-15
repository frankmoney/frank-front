import * as ACTIONS from '../actions'

export default action$ =>
  action$.ofType(ACTIONS.filtersOpen).map(ACTIONS.filtersLoad)
