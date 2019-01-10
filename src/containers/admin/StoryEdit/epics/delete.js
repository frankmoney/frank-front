import storage from 'local-storage-fallback'
import { replace as replaceLocation } from 'react-router-redux'
import { createRouteUrl } from '@frankmoney/utils'
import { currentAccountIdSelector } from 'redux/selectors/user'
import { LS_FLAGS, ROUTES } from 'const'
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
    .mergeMap(() => {
      storage.setItem(LS_FLAGS.storyDeleted, 'true')

      return [
        ACTIONS.delete.success(),
        replaceLocation(
          createRouteUrl(ROUTES.account.stories.root, {
            accountId: currentAccountIdSelector(store.getState()),
          })
        ),
      ]
    })
    .catchAndRethrow(ACTIONS.delete.error)
