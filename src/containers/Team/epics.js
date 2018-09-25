import ACTIONS from './actions'
import QUERIES from './queries'

export const loadEpic = (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.load)
    .switchMap(() => graphql(QUERIES.team))
    .map(ACTIONS.load.success)

export const updateRoleEpic = (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.updateRole)
    .switchMap(({ payload: { id, role } }) =>
      graphql(QUERIES.updateRole, { id, role })
    )
    .map(ACTIONS.updateRole.success)
