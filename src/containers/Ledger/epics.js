import * as R from 'ramda'
import { mapPayment } from 'data/models/payment'
import * as ACTIONS from './actions'
import DATA from './data.json'
import { transactionsTotalCountSelector } from './selectors'

export const loadEpic = action$ =>
  action$
    .ofType(ACTIONS.load)
    .debounceTime(800)
    .switchMap(() =>
      Promise.resolve(
        R.evolve(
          { transactions: R.map(mapPayment) },
          { ...DATA, totalCount: 97 }
        )
      )
    )
    .map(ACTIONS.load.success)

export const loadInitialFiltersAfterDrawerOpen = action$ =>
  action$.ofType(ACTIONS.filtersOpen).map(ACTIONS.filtersLoad)

export const loadInitialFilters = (action$, store) =>
  action$.ofType(ACTIONS.filtersLoad).switchMapFromPromise(() =>
    Promise.resolve({
      // TODO get from url params
      filters: {
        sumLimit: {
          min: -85000,
          max: 40000,
        },
        dateLimit: 'all',
        verified: null,
      },
      totalCount: transactionsTotalCountSelector(store.getState()),
      // startDate: '2017-06-05',
    }).then(ACTIONS.filtersLoad.success)
  )

export const estimateResultsCountAfterFilterChange = action$ =>
  action$.ofType(ACTIONS.filtersChange).map(ACTIONS.filtersEstimateResultsCount)

export const estimateResultsCount = action$ =>
  action$
    .ofType(ACTIONS.filtersEstimateResultsCount)
    .debounceTime(300)
    .switchMapFromPromise(() =>
      Promise.resolve(Math.ceil(Math.random() * 1000))
    )
    .debounceTime(200)
    .map(ACTIONS.filtersEstimateResultsCount.success)

export const reloadPageAfterApplyFilters = action$ =>
  action$
    .ofType(ACTIONS.filtersApply)
    .mergeMap(() => [ACTIONS.filtersClose(), ACTIONS.load()])
