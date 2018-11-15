import { currentAccountIdSelector } from 'redux/selectors/user'
import ACTIONS from '../actions'
import QUERIES from '../queries'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.load)
    .switchMap(async ({ payload: storyPid }) => {
      const state = store.getState()
      const accountPid = currentAccountIdSelector(state)

      const story = await graphql(QUERIES.getStory, {
        accountPid,
        storyPid,
      })

      return { story }
    })
    .map(ACTIONS.load.success)
