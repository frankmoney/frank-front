import ACTIONS from '../actions'
import QUERIES from '../queries'
import { storySelector } from '../selectors'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.unpublish)
    .switchMapFromPromise(() => {
      const state = store.getState()
      const storyId = storySelector(state).id

      return graphql(QUERIES.unpublishStory, { storyId })
    })
    .map(story => ACTIONS.unpublish.success({ story }))
