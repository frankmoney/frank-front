import ACTIONS from '../actions'
import QUERIES from '../queries'
import { storySelector } from '../selectors'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.unpublish)
    .switchMapFromPromise(() => {
      const state = store.getState()
      const storyPid = storySelector(state).pid

      return graphql(QUERIES.unpublishStory, { storyPid })
    })
    .map(story => ACTIONS.unpublish.success({ story }))
