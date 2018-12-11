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
      const storyId = storySelector(state).id

      return graphql(QUERIES.deleteStory, { storyId })
    })
    .mergeMap(() => [
      ACTIONS.delete.success(),
      replaceLocation(createRouteUrl(ROUTES.manage.stories.root)),
    ])
