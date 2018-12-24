import * as R from 'ramda'
import ACTIONS from '../actions'
import QUERIES from '../queries'
import { categoriesSelector } from '../selectors'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.deleteCategory)
    .switchMap(async ({ payload: { pid } }) => {
      const state = store.getState()
      const categories = categoriesSelector(state)

      const category = categories && R.find(x => x.id === pid, categories)
      if (category && category.paymentCount) {
        return ACTIONS.deleteCategory.error({
          pid,
          code: 'hasPayments',
        })
      }

      const { result } = await graphql(QUERIES.deleteCategory, { pid })

      if (result === 'hasPayments') {
        return ACTIONS.deleteCategory.error({
          pid,
          code: 'hasPayments',
        })
      }

      return ACTIONS.deleteCategory.success({ pid })
    })
    .catchAndRethrow(ACTIONS.deleteCategory.error)
