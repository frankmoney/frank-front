import { mergeQuery } from '@frankmoney/webapp'
import * as ACTIONS from '../actions'

export default action$ =>
  action$
    .ofType(ACTIONS.cancelCategory)
    .map(() => mergeQuery({ category: null, page: null }))
