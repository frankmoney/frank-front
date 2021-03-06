import { currentAccountIdSelector } from 'redux/selectors/user'
import ACTIONS from '../actions'
import QUERIES from '../queries'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.load)
    .switchMap(async ({ payload: storyId }) => {
      const state = store.getState()
      const accountId = currentAccountIdSelector(state)

      return graphql(QUERIES.getStory, {
        accountId,
        storyId,
      })
    })
    .map(ACTIONS.load.success)
