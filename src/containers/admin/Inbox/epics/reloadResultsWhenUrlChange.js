import { LOCATION_CHANGE } from 'react-router-redux'
import ACTIONS from '../actions'
import * as SELECTORS from '../selectors'

export default (action$, store) =>
  action$
    .ofType(LOCATION_CHANGE)
    // TODO no hardcode. Epic should occurs only on INBOX page!
    .filter(() => SELECTORS.loaded(store.getState()))
    .mergeMap(() => [ACTIONS.load({ updateListOnly: true })])
