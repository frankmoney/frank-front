import { replace as replaceLocation } from 'react-router-redux'
import { createRouteUrl } from '@frankmoney/utils'
import { currentAccountIdSelector } from 'redux/selectors/user'
import { ROUTES } from 'const'
import ACTIONS from '../actions'
import QUERIES from '../queries'
import { storySelector } from '../selectors'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.delete)
    .switchMap(() => {
      const state = store.getState()
      const accountId = currentAccountIdSelector(state)
      const storyId = storySelector(state).id

      return graphql(QUERIES.storyDelete, {
        accountId,
        storyId,
      })
    })
    .mergeMap(() => [
      ACTIONS.delete.success(),
      replaceLocation(createRouteUrl(ROUTES.manage.stories.root)),
    ])
