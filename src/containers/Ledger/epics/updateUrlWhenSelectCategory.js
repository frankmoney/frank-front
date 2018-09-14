import { mergeQuery } from '@frankmoney/webapp'
import * as ACTIONS from '../actions'

export default action$ =>
  action$
    .ofType(ACTIONS.selectCategory)
    .map(({ payload: category }) =>
      mergeQuery({ category: category.id, page: null })
    )
