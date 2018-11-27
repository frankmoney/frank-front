import { changeQuery } from '@frankmoney/webapp'
import ACTIONS from '../actions'

export default action$ =>
  action$.ofType(ACTIONS.resetSearch).map(() => changeQuery({}))
