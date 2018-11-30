import { mergeQuery } from '@frankmoney/webapp'
import * as ACTIONS from '../actions'

export default action$ =>
  action$
    .ofType(ACTIONS.selectCategoryType)
    .map(({ payload: categoryType }) => mergeQuery({ categoryType }))
