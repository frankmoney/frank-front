import { matchPath } from 'react-router'
import { LOCATION_CHANGE } from 'react-router-redux'
import { ROUTES } from 'const'
import * as ACTIONS from '../actions'
import { loadedSelector } from '../selectors'

export default (action$, store) =>
  action$
    .ofType(LOCATION_CHANGE)
    .filter(({ payload: { pathname } }) =>
      matchPath(pathname, { path: ROUTES.account.idRoot })
    )
    // TODO no hardcode. Epic should occurs only on Ledger page!
    .filter(() => loadedSelector(store.getState()))
    .mergeMap(() => [ACTIONS.load({ updateListOnly: true })])
