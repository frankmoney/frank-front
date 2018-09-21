import { push } from 'react-router-redux'
import { ROUTES } from 'const'
import ACTIONS from './actions'
import QUERIES from './queries'

export const loadEpic = (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.load)
    .switchMap(() => graphql(QUERIES.accounts))
    .map(ACTIONS.load.success)

export const cancelEpic = action$ =>
  action$.ofType(ACTIONS.cancel).map(() => push(ROUTES.team.root))

export const submitEpic = action$ =>
  action$.ofType(ACTIONS.submit).map(() => push(ROUTES.team.root))
