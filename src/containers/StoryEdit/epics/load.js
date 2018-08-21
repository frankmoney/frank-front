import * as R from 'ramda'
import { mapPayment } from 'data/models/payment'
import { currentAccountIdSelector } from 'redux/selectors/user'
import ACTIONS from '../actions'
import { PAGE_SIZE } from '../constants'
import QUERIES from '../queries'
import { paymentsLoadedPagesCounterSelector } from '../selectors'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.load)
    .switchMap(() => {
      const state = store.getState()
      const page = paymentsLoadedPagesCounterSelector(state)

      return graphql(
        QUERIES.getPaymentsAndTotalCount({
          payments: true,
          totalCount: true,
        }),
        {
          accountId: currentAccountIdSelector(store.getState()),
          first: PAGE_SIZE,
          skip: page * PAGE_SIZE,
          verified: true,
        }
      )
    })
    .map(R.evolve({ payments: R.map(mapPayment) }))
    .map(ACTIONS.load.success)

/*

import { Observable } from 'rxjs'
import ACTIONS from './actions'
import data from './data.json'

export const loadEpic = (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.load.toString())
    .switchMap(({ payload }) =>
      Observable.of(payload ? data.stories[payload] : {}).map(
        ACTIONS.load.success
      )
    )

 */
