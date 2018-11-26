import { currentAccountIdSelector } from 'redux/selectors/user'
import { formatDate } from 'utils/dates'
import * as SELECTORS from './selectors'
import ACTIONS from './actions'
import QUERIES from './queries'

// HELPERS

const requestTotalCount = (
  graphql,
  { sumLimit, dateLimit, verified, search, accountId }
) =>
  graphql(QUERIES.getOnlyTotalCount, {
    accountId,
    search,
    amountMin: sumLimit && sumLimit.min,
    amountMax: sumLimit && sumLimit.max,
    dateMin: dateLimit && dateLimit.from && formatDate(dateLimit.from),
    dateMax: dateLimit && dateLimit.to && formatDate(dateLimit.to),
    verified,
  })

// EPICS

export const startLoadAfterOpen = action$ =>
  action$.ofType(ACTIONS.open).map(({ payload }) => ACTIONS.load(payload))

export const estimateResultsRequest = (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.estimateResults)
    .debounceTime(300)
    .switchMap(() =>
      requestTotalCount(graphql, {
        ...SELECTORS.data(store.getState()),
        accountId: currentAccountIdSelector(store.getState()),
      })
    )
    .map(ACTIONS.estimateResults.success)

export const changeFiltersTriggersEstimateResults = action$ =>
  action$.ofType(ACTIONS.change).map(() => ACTIONS.estimateResults())

export const loadRequest = (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.load)
    .switchMap(
      async ({
        payload: { amountMin, amountMax, dateMin, dateMax, verified },
      }) => {
        const filters = {
          sumLimit: {
            // TODO async getting amount min/max from a server
            min: amountMin || -80000,
            max: amountMax || 40000,
          },
          dateLimit: { from: dateMin, to: dateMax },
          verified,
        }

        const accountId = currentAccountIdSelector(store.getState())
        const totalCount = await requestTotalCount(graphql, {
          ...filters,
          accountId,
        })

        return ACTIONS.load.success({
          filters,
          totalCount,
        })
      }
    )

export const closeOnApply = action$ =>
  action$.ofType(ACTIONS.apply).map(ACTIONS.close)
