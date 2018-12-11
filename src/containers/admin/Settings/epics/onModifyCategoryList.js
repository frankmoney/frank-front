import { currentAccountIdSelector } from 'redux/selectors/user'
import ACTIONS from '../actions'
import QUERIES from '../queries'
import { editingCategoryTypeSelector } from '../selectors'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.modifyCategoryList)
    .switchMap(({ payload: { id, type, color, name } }) => {
      const state = store.getState()
      const accountId = currentAccountIdSelector(state)
      const categoryType = type || editingCategoryTypeSelector(state)

      if (!color && !name) {
        // DELETE QUERY
        return graphql(QUERIES.getAccountInfo, { accountId })
      }
      if (!id) {
        // ADD QUERY
        return graphql(QUERIES.getAccountInfo, { accountId })
      }
      // EDIT QUERY
      return graphql(QUERIES.getAccountInfo, { accountId })
    })
    .map(ACTIONS.modifyCategoryList.success)
