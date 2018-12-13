import { mergeQuery } from '@frankmoney/webapp'
import { UNCATEGORIZED_CATEGORY } from 'const'
import * as ACTIONS from '../actions'

export default action$ =>
  action$
    .ofType(ACTIONS.selectCategory)
    .map(({ payload: category }) =>
      mergeQuery(
        category.id === UNCATEGORIZED_CATEGORY.id
          ? { verified: false, page: null }
          : { category: category.id, page: null }
      )
    )
