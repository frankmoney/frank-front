import * as R from 'ramda'
import { currentAccountIdSelector } from 'redux/selectors/user'
import QUERIES from './queries'
import ACTIONS from './actions'
import * as SELECTORS from './selectors'

const omitNulls = R.pipe(
  R.toPairs,
  R.filter(kv => !R.isNil(kv[1])),
  R.fromPairs
)

export const publish = (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.confirmChangePublish)
    .switchMap(() => {
      const state = store.getState()
      return graphql(QUERIES.updatePayments, {
        accountId: currentAccountIdSelector(state),
        paymentIds: SELECTORS.paymentIds(state),
        verified: SELECTORS.publishValue(state),
      })
    })
    .map(ACTIONS.updateSuccess)
    .catch(() => ACTIONS.updateFail())

export const edit = (action$, store, { graphql }) =>
  action$
    .filter(({ type }) =>
      [ACTIONS.save.toString(), ACTIONS.saveAndPublish.toString()].includes(
        type
      )
    )
    .switchMap(({ type }) => {
      const state = store.getState()
      const verified = type === ACTIONS.saveAndPublish.toString() ? true : null
      const { peerName, categoryId, description } = SELECTORS.formValues(state)

      return graphql(
        QUERIES.updatePayments,
        omitNulls({
          accountId: currentAccountIdSelector(state),
          paymentIds: SELECTORS.paymentIds(state),
          peerName,
          categoryId,
          description,
          verified,
        })
      )
    })
    .map(ACTIONS.updateSuccess)
    .catch(() => ACTIONS.updateFail())
