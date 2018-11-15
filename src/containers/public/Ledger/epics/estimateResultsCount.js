import { currentAccountIdSelector } from 'redux/selectors/user'
import * as ACTIONS from '../actions'
import QUERIES from '../queries'
import { filtersDataSelector, searchTextSelector } from '../selectors'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.filtersEstimateResultsCount)
    .debounceTime(300)
    .switchMap(
      () => {
        const state = store.getState()
        const search = searchTextSelector(state)
        const { sumLimit, dateLimit, verified } = filtersDataSelector(state)

        return graphql(QUERIES.getOnlyTotalCount, {
          accountId: currentAccountIdSelector(store.getState()),
          search,
          amountMin: sumLimit && sumLimit.min,
          amountMax: sumLimit && sumLimit.max,
          dateMin: dateLimit && dateLimit.from,
          dateMax: dateLimit && dateLimit.to,
          verified,
        })
      }
      // Promise.resolve(Math.floor(Math.random() * 1000))
    )
    .map(ACTIONS.filtersEstimateResultsCount.success)
