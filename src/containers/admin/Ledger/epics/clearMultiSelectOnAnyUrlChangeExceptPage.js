import { matchPath } from 'react-router'
import { LOCATION_CHANGE } from 'react-router-redux'
import { querySelector, prevQuerySelector } from '@frankmoney/webapp'
import * as R from 'ramda'
import MULTI_ACTIONS from 'containers/admin/MultiEditSnack/actions'
import { ROUTES } from 'const'

export default (action$, store) =>
  action$
    .ofType(LOCATION_CHANGE)
    .filter(({ payload: { pathname } }) => {
      if (!matchPath(pathname, { path: ROUTES.account.idRoot, exact: true })) {
        return false
      }

      const state = store.getState()
      const omitPage = R.omit(['page'])
      const query = querySelector(state)
      const prevQuery = prevQuerySelector(state)

      return !R.equals(omitPage(query), omitPage(prevQuery))
    })
    .map(MULTI_ACTIONS.clear)
