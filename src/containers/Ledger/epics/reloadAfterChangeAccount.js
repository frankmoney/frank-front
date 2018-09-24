import * as USER_ACTIONS from 'redux/actions/user'
import * as ACTIONS from '../actions'
import { loadedSelector } from '../selectors'

export default (action$, store) =>
  action$
    .ofType(USER_ACTIONS.selectAccount)
    .filter(() => loadedSelector(store.getState()))
    .map(ACTIONS.load)
