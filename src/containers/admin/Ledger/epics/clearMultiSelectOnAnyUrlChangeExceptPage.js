import { LOCATION_CHANGE } from 'react-router-redux'
import {
  querySelector,
  prevQuerySelector,
  prevPathnameSelector,
} from '@frankmoney/webapp'
import * as R from 'ramda'
import MULTI_ACTIONS from 'containers/admin/MultiEditSnack/actions'
import { loadedSelector } from '../../Recipient/selectors'

export default (action$, store) =>
  action$
    .ofType(LOCATION_CHANGE)
    // TODO refactor after impl auto mount epics
    .filter(() => loadedSelector(store.getState()))
    .filter(({ payload: { pathname } }) => {
      const state = store.getState()
      const prevPathname = prevPathnameSelector(state)

      // switching between /account/4 and /account/5
      if (!prevPathname && prevPathname !== pathname) {
        return true
      }
      const omitPage = R.omit(['page'])
      const query = querySelector(state)
      const prevQuery = prevQuerySelector(state)

      return !R.equals(omitPage(query), omitPage(prevQuery))
    })
    .map(MULTI_ACTIONS.clear)
