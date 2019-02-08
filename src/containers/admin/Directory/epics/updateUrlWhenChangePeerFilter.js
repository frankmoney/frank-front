import { mergeQuery } from '@frankmoney/webapp'
import * as ACTIONS from '../actions'

export default action$ =>
  action$.ofType(ACTIONS.changePeerFilter).map(({ payload: peer }) =>
    mergeQuery(
      {
        peer,
      },
      false
    )
  )
