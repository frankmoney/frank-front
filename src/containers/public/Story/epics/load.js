import * as R from 'ramda'
import { isNotFoundError } from 'utils/graphql'
import ACTIONS from '../actions'
import QUERIES from '../queries'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.load)
    .switchMap(async ({ payload: { accountId, storyId } }) => {
      const { account, story } = await graphql(QUERIES.getStory, {
        accountId,
        storyId,
      })

      return { account, story }
    })
    .map(ACTIONS.load.success)
    .catchAndRethrow(
      R.pipe(
        isNotFoundError,
        ACTIONS.load.error
      )
    )
