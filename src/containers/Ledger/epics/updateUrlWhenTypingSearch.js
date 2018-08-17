import { mergeQuery } from '@frankmoney/webapp'
import * as ACTIONS from '../actions'

export default action$ =>
  action$
    .ofType(ACTIONS.searchTyping)
    .map(({ payload: search }) => mergeQuery({ search }))
