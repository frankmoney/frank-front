import { currentAccountIdSelector } from 'redux/selectors/user'
import ACTIONS from '../actions'
import { PAGE_SIZE } from '../constants'
import QUERIES from '../queries'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.load)
    .switchMap(async ({ payload: storyPid }) => {
      const state = store.getState()
      const accountPid = currentAccountIdSelector(state)

      const result = await Promise.all([
        graphql(QUERIES.getPayments, {
          accountPid,
          take: PAGE_SIZE,
        }),
        graphql(QUERIES.countPayments, { accountPid }),
        storyPid
          ? graphql(QUERIES.getStory, { accountPid, storyPid })
          : Promise.resolve({}),
      ])

      const [payments, totalCount, story] = result

      return { payments, totalCount, story }
    })
    .map(ACTIONS.load.success)
