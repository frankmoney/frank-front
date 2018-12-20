import { LOCATION_CHANGE } from 'react-router-redux'
import { createRouteUrl } from '@frankmoney/utils'
import { ROUTES } from 'const'
import { currentAccountIdSelector } from 'redux/selectors/user'
import * as ACTIONS from '../actions'
import { loadedSelector, recipientSelector } from '../selectors'

export default (action$, store) =>
  action$
    .ofType(LOCATION_CHANGE)
    // Epic occurs only on Recipient page!
    .filter(({ payload: { pathname } }) => {
      const recipient = recipientSelector(store.getState())
      return (
        recipient &&
        pathname ===
          createRouteUrl(ROUTES.account.directory.recipient, {
            id: recipient.id,
            accountId: currentAccountIdSelector(store.getState()),
          })
      )
    })
    .filter(() => loadedSelector(store.getState()))
    .debounceTime(777)
    .mergeMap(() => [ACTIONS.load({ updateListOnly: true })])
