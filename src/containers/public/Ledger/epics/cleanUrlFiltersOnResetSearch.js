import { changeQuery } from '@frankmoney/webapp'
import * as ACTIONS from '../actions'

export default action$ =>
  action$.ofType(ACTIONS.resetSearch).map(() => changeQuery({}))
