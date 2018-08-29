import { mergeQuery } from '@frankmoney/webapp'
import * as ACTIONS from '../actions'
import { includeRecipientsFilterSelector } from '../selectors'

export default (action$, store) =>
  action$.ofType(ACTIONS.toggleDonors).map(({ payload: donors }) => {
    const recipients = includeRecipientsFilterSelector(store.getState())
    return mergeQuery(
      { donors, recipients: !donors && !recipients ? true : recipients },
      true
    )
  })
