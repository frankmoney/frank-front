import { LOCATION_CHANGE } from 'react-router-redux'
import * as ACTIONS from '../actions'

export default action$ =>
  action$
    .ofType(LOCATION_CHANGE)
    // TODO no hardcode. Epic should occurs only on Ledger page!
    .filter(({ payload: { pathname } }) => pathname === '/ledger')
    .debounceTime(777)
    .mergeMap(() => [
      ACTIONS.filtersClose(),
      ACTIONS.load({ updateListOnly: true }),
    ])
