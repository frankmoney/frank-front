import { LOCATION_CHANGE } from 'react-router-redux'
import {
  querySelector,
  prevQuerySelector,
  prevPathnameSelector,
} from '@frankmoney/webapp'
import * as R from 'ramda'
import MULTI_ACTIONS from 'containers/admin/MultiEditSnack/actions'
import * as SELECTORS from '../selectors'

export default (action$, store) =>
  action$
    .ofType(LOCATION_CHANGE)
    // TODO refactor after impl auto mount epics
    .filter(() => SELECTORS.loaded(store.getState()))
    .filter(({ payload: { pathname } }) => {
      const state = store.getState()
      const prevPathname = prevPathnameSelector(state)
      if (!prevPathname && prevPathname !== pathname) {
        return true
      }

      const omitPage = R.omit(['page'])
      const query = querySelector(state)
      const prevQuery = prevQuerySelector(state)

      return !R.equals(omitPage(query), omitPage(prevQuery))
    })
    .map(MULTI_ACTIONS.clear)
