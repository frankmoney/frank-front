import ACTIONS from '../actions'
import QUERIES from '../queries'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.load)
    .switchMap(({ payload: storyId }) =>
      graphql(QUERIES.getStory, {
        storyId,
      })
    )
    .map(ACTIONS.load.success)
