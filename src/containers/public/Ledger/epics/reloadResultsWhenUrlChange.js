import { LOCATION_CHANGE } from 'react-router-redux'
import { createRouteUrl } from '@frankmoney/utils'
import { ROUTES } from 'const'
import * as ACTIONS from '../actions'
import { loadedSelector, accountIdSelector } from '../selectors'

export default (action$, store) =>
  action$
    .ofType(LOCATION_CHANGE)
    // TODO no hardcode. Epic should occurs only on Ledger page!
    .filter(({ payload: { pathname } }) => {
      const accountId = accountIdSelector(store.getState())
      return (
        accountId &&
        pathname ===
          createRouteUrl(ROUTES.public.ledger.idRoot, {
            accountId,
          })
      )
    })
    .filter(() => loadedSelector(store.getState()))
    .mergeMap(() => [
      ACTIONS.filtersClose(),
      ACTIONS.load({ updateListOnly: true }),
    ])
