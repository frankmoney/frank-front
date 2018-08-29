import { mergeQuery } from '@frankmoney/webapp'
import * as ACTIONS from '../actions'
import { includeDonorsFilterSelector } from '../selectors'

export default (action$, store) =>
  action$.ofType(ACTIONS.toggleRecipients).map(({ payload: recipients }) => {
    const donors = includeDonorsFilterSelector(store.getState())
    return mergeQuery(
      { recipients, donors: !recipients && !donors ? true : donors },
      true
    )
  })
