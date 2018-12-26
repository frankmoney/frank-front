import { currentAccountIdSelector } from 'redux/selectors/user'
import ACTIONS from '../actions'
import QUERIES from '../queries'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.createCategory)
    .switchMap(async ({ payload: { type, name, color, customColor } }) => {
      const state = store.getState()
      const accountPid = currentAccountIdSelector(state)

      const { category } = await graphql(QUERIES.createCategory, {
        accountPid,
        type,
        name,
        color: customColor || color,
      })

      return ACTIONS.createCategory.success({ category })
    })
    .catchAndRethrow(ACTIONS.createCategory.error)
