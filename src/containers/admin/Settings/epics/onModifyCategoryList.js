import { currentAccountIdSelector } from 'redux/selectors/user'
import * as ACTIONS from '../actions'
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
        // DELETE QUERIE
      } else if (!id) {
        // ADD QUERIE
      } else {
        // EDIT QUERIE
      }

      return graphql(QUERIES.getAccountInfo, { accountId })
    })
    .map(ACTIONS.modifyCategoryList.success)
