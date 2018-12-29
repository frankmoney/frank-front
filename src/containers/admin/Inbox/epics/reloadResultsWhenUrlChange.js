import { LOCATION_CHANGE } from 'react-router-redux'
import { matchPath } from 'react-router'
import { ROUTES } from '../../../../const'
import ACTIONS from '../actions'
import * as SELECTORS from '../selectors'

export default (action$, store) =>
  action$
    .ofType(LOCATION_CHANGE)
    .filter(({ payload: { pathname } }) =>
      matchPath(pathname, { path: ROUTES.account.inbox.root })
    )
    // TODO no hardcode. Epic should occurs only on INBOX page!
    .filter(() => SELECTORS.loaded(store.getState()))
    .mergeMap(() => [ACTIONS.load({ updateListOnly: true })])
