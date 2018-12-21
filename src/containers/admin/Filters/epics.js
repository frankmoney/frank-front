import { mergeQuery } from '@frankmoney/webapp'
import { currentAccountIdSelector } from 'redux/selectors/user'
import { formatDate } from 'utils/dates'
import * as SELECTORS from './selectors'
import ACTIONS from './actions'
import QUERIES from './queries'

// HELPERS

const parseNumber = value => {
  if (typeof value !== 'number' && typeof value !== 'string' && !value) {
    return null
  }

  const number = parseInt(value, 10)
  return isNaN(number) ? null : number
}

const requestTotalCount = (
  graphql,
  { sum, date, verified, search, accountId }
) =>
  graphql(QUERIES.getOnlyTotalCount, {
    accountId,
    search,
    amountMin: sum && parseNumber(sum.min),
    amountMax: sum && parseNumber(sum.max),
    dateMin: date && date.from && formatDate(date.from),
    dateMax: date && date.to && formatDate(date.to),
    verified,
  })

// EPICS

export const startLoadAfterOpen = action$ =>
  action$.ofType(ACTIONS.open).map(({ payload }) => ACTIONS.load(payload))

export const estimateResultsRequest = (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.estimateResults)
    .debounceTime(500)
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
          sum: {
            min: amountMin,
            max: amountMax,
          },
          date: { from: dateMin, to: dateMax },
          verified,
        }

        const accountId = currentAccountIdSelector(store.getState())
        const [totalCount, aggregated] = await Promise.all([
          requestTotalCount(graphql, {
            ...filters,
            accountId,
          }),
          graphql(QUERIES.getAccountAggregatedPayments, { accountId }),
        ])

        return ACTIONS.load.success({
          filters,
          totalCount,
          aggregated,
        })
      }
    )

export const closeOnApply = action$ =>
  action$.ofType(ACTIONS.apply).map(ACTIONS.close)

export const clearUrlParamsOnReset = action$ =>
  action$.ofType(ACTIONS.reset).mergeMap(() => [
    mergeQuery({
      amountMin: null,
      amountMax: null,
      dateMin: null,
      dateMax: null,
      verified: null,
      pending: null,
      page: null,
    }),
    ACTIONS.close(),
  ])
