import ACTIONS from '../actions'
import QUERIES from '../queries'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.updateCategory)
    .switchMap(async ({ payload: { id, name, color, customColor } }) => {
      const { category } = await graphql(QUERIES.updateCategory, {
        pid: id,
        name,
        color: customColor || color,
      })

      return ACTIONS.updateCategory.success({ category })
    })
    .catchAndRethrow(ACTIONS.updateCategory.error)
