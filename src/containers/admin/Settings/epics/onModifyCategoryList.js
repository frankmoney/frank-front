import { currentAccountIdSelector } from 'redux/selectors/user'
import ACTIONS from '../actions'
import QUERIES from '../queries'
import { editingCategoryTypeSelector } from '../selectors'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.modifyCategoryList)
    .switchMap(async ({ payload: { id, type, color, name } }) => {
      const state = store.getState()
      const accountId = currentAccountIdSelector(state)

      if (!color && !name) {
        // DELETE QUERY
        await graphql(QUERIES.deleteCategory, { pid: id })
      } else if (!id) {
        // ADD QUERY
        await graphql(QUERIES.createCategory, {
          accountPid: accountId,
          type: type || editingCategoryTypeSelector(state),
          name,
          color,
        })
      } else {
        // EDIT QUERY
        await graphql(QUERIES.updateCategory, { pid: id, name, color })
      }

      const result = await graphql(QUERIES.getAccountInfo, { accountId })
      return result
    })
    .map(ACTIONS.modifyCategoryList.success)
