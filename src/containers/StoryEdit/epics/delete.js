import { replace as replaceLocation } from 'react-router-redux'
import { createRouteUrl } from '@frankmoney/utils'
import { ROUTES } from 'const'
import ACTIONS from '../actions'
import QUERIES from '../queries'
import { storySelector } from '../selectors'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.delete)
    .switchMap(() => {
      const state = store.getState()
      const storyPid = storySelector(state).pid

      return graphql(QUERIES.deleteStory, { storyPid })
    })
    .mergeMap(() => [
      ACTIONS.delete.success(),
      replaceLocation(createRouteUrl(ROUTES.stories.root)),
    ])
