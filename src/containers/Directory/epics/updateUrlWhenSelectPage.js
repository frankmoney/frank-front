import { mergeQuery } from '@frankmoney/webapp'
import * as ACTIONS from '../actions'

export default action$ =>
  action$
    .ofType(ACTIONS.selectPage)
    .map(({ payload: page }) => mergeQuery({ page }))
