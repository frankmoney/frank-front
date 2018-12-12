import { currentAccountIdSelector } from 'redux/selectors/user'
import ACTIONS from '../actions'
import QUERIES from '../queries'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.load)
    .switchMap(async ({ payload: storyId }) => {
      const state = store.getState()
      const accountId = currentAccountIdSelector(state)

      const result = await Promise.all([
        storyId
          ? graphql(QUERIES.getStory, { accountId, storyId })
          : Promise.resolve({}),
      ])

      const [story] = result

      return { story }
    })
    .map(ACTIONS.load.success)
