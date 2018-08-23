import { LOCATION_CHANGE } from 'react-router-redux'
import * as ACTIONS from '../actions'
import { loadedSelector } from '../selectors'

export default (action$, store) =>
  action$
    .ofType(LOCATION_CHANGE)
    .filter(() => loadedSelector(store.getState()))
    .debounceTime(777)
    .mergeMap(() => [ACTIONS.load({ updateListOnly: true })])
