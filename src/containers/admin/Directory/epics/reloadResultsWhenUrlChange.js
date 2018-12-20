import { LOCATION_CHANGE } from 'react-router-redux'
import { createRouteUrl } from '@frankmoney/utils'
import { ROUTES } from 'const'
import { currentAccountIdSelector } from 'redux/selectors/user'
import * as ACTIONS from '../actions'
import { loadedSelector } from '../selectors'

export default (action$, store) =>
  action$
    .ofType(LOCATION_CHANGE)
    // Epic should occurs only on Directory page!
    .filter(
      ({ payload: { pathname } }) =>
        pathname ===
        createRouteUrl(ROUTES.account.directory.root, {
          accountId: currentAccountIdSelector(store.getState()),
        })
    )
    .filter(() => loadedSelector(store.getState()))
    .debounceTime(777)
    .mergeMap(() => [ACTIONS.load({ update: true })])
