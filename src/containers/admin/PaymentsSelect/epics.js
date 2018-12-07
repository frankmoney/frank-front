import * as R from 'ramda'
import { currentAccountIdSelector } from 'redux/selectors/user'
import { formatDate } from 'utils/dates'
import ACTIONS from './actions'
import QUERIES from './queries'
import * as SELECTORS from './selectors'
import { PAGE_SIZE } from './constants'

export const startLoadAfterOpen = action$ =>
  action$.ofType(ACTIONS.open).map(({ payload }) => ACTIONS.load(payload))

export const changeFiltersTriggersReloadList = action$ =>
  action$
    .ofType(ACTIONS.change)
    .debounceTime(400)
    .map(() => ACTIONS.reloadList())

export const resetFiltersTriggersReloadList = action$ =>
  action$.ofType(ACTIONS.reset).map(() => ACTIONS.reloadList())

const formatDateIfNotNil = R.when(R.complement(R.isNil), formatDate)

const serializeFilters = R.evolve({
  dateMin: formatDateIfNotNil,
  dateMax: formatDateIfNotNil,
})

export const loadRequest = (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.load)
    .switchMap(async ({ payload: initialFilters = {} }) => {
      const accountId = currentAccountIdSelector(store.getState())
      const [
        { limits, categories },
        { payments, totalCount },
      ] = await Promise.all([
        graphql(QUERIES.loadInitialFilters, {
          accountId,
          ...serializeFilters(initialFilters),
        }),
        graphql(
          QUERIES.getPayments({ categoryScoped: !!initialFilters.categoryId }),
          {
            accountId,
            take: PAGE_SIZE,
            ...serializeFilters(initialFilters),
          }
        ),
      ])

      const defaultFilters = R.evolve(
        {
          sumMin: R.defaultTo(limits.amountMin),
          sumMax: R.defaultTo(limits.amountMax),
        },
        initialFilters
      )

      return ACTIONS.load.success({
        initialFilters: defaultFilters,
        limits: {
          sumMin: limits.amountMin,
          sumMax: limits.amountMax,
        },
        categories,
        payments,
        totalCount,
      })
    })

export const reloadRequest = (action$, store, { graphql }) =>
  action$.ofType(ACTIONS.reloadList).switchMap(async () => {
    const accountId = currentAccountIdSelector(store.getState())
    const filters = SELECTORS.filters(store.getState())

    const { payments, totalCount } = await graphql(
      QUERIES.getPayments({ categoryScoped: !!filters.categoryId }),
      {
        accountId,
        skip: 0,
        take: PAGE_SIZE,
        ...serializeFilters(filters),
      }
    )

    return ACTIONS.reloadList.success({
      payments,
      totalCount,
    })
  })

export const loadMore = (action$, store, { graphql }) =>
  action$.ofType(ACTIONS.loadMore).switchMap(async () => {
    const state = store.getState()
    const accountId = currentAccountIdSelector(state)
    const filters = SELECTORS.filters(state)
    const paymentsCount = SELECTORS.paymentsCount(state)

    const { payments } = await graphql(
      QUERIES.getPayments({ categoryScoped: !!filters.categoryId }),
      {
        accountId,
        skip: paymentsCount,
        take: PAGE_SIZE,
        ...serializeFilters(filters),
      }
    )

    return ACTIONS.loadMore.success(payments)
  })
