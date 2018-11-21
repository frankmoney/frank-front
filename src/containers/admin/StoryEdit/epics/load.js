import { currentAccountIdSelector } from 'redux/selectors/user'
import ACTIONS from '../actions'
import QUERIES from '../queries'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.load)
    .switchMap(async ({ payload: storyPid }) => {
      const state = store.getState()
      const accountPid = currentAccountIdSelector(state)

      const result = await Promise.all([
        storyPid
          ? graphql(QUERIES.getStory, { accountPid, storyPid })
          : Promise.resolve({}),
      ])

      const [story] = result

      return { story }
    })
    .map(ACTIONS.load.success)
