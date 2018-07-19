import { push } from 'react-router-redux'
import { ROUTES } from 'const'
import ACTIONS from './actions'

export const cancelEpic = action$ =>
  action$.ofType(ACTIONS.cancel).map(() => push(ROUTES.team.root))

export const submitEpic = action$ =>
  action$.ofType(ACTIONS.submit).map(() => push(ROUTES.team.root))
