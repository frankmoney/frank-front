import { mergeQuery } from '@frankmoney/webapp'
import * as ACTIONS from '../actions'

export default action$ =>
  action$
    .ofType(ACTIONS.changeSorting)
    .map(({ payload: sortBy }) => mergeQuery({ sortBy }, true))
