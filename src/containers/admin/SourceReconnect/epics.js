import * as ACTIONS from './actions'
import { SOURCE_STATUS } from './constants'
import QUERIES from './queries'
import * as SELECTORS from './selectors'

export const loadEpic = (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.load)
    .switchMap(({ payload: { accountId, sourceId } }) =>
      graphql(QUERIES.getSource, { accountId, sourceId })
    )
    .map(ACTIONS.load.success)

export const sendCredentialsEpic = (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.sendCredentials)
    .switchMap(() => {
      const state = store.getState()
      const credentials = SELECTORS.serializedFormValues(state)
      const sourceId = SELECTORS.sourceId(state)

      return graphql(QUERIES.updateSource, { sourceId, credentials })
    })
    .map(ACTIONS.updateSourceState)

export const sendMFAEpic = (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.sendMFA)
    .switchMap(() => {
      const state = store.getState()
      const challenges = SELECTORS.serializedFormValues(state)
      const sourceId = SELECTORS.sourceId(state)

      return graphql(QUERIES.updateSource, { sourceId, challenges })
    })
    .map(ACTIONS.updateSourceState)

export const pollCredentialsWhileStatusIsCheckingEpic = (
  action$,
  store,
  { graphql }
) =>
  action$
    .ofType(ACTIONS.updateSourceState)
    .filter(({ payload: { status } }) => status === SOURCE_STATUS.checking)
    .debounceTime(2000)
    .switchMap(() =>
      graphql(QUERIES.getSourceState, {
        sourceId: SELECTORS.sourceId(store.getState()),
      })
    )
    .map(ACTIONS.updateSourceState)
