import * as R from 'ramda'
import { handleError } from 'utils/epics'
import { formatDate } from 'utils/dates'
import { currentAccountIdSelector } from 'redux/selectors/user'
import * as ACTIONS from '../actions'
import { PAGE_SIZE } from '../constants'
import QUERIES from '../queries'
import {
  categoriesSelector,
  currentCategoryIdSelector,
  currentFiltersSelector,
  currentPageSelector,
  noTextSearchSelector,
  searchTextSelector,
  unfilteredCountSelector,
} from '../selectors'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.load)
    .switchMap(({ payload: { sourcePids } }) => {
      const state = store.getState()
      const currentAccountId = currentAccountIdSelector(state)
      const search = searchTextSelector(state)
      const page = currentPageSelector(state)
      const categories = categoriesSelector(state)
      const categoriesLoaded = categories.length > 0
      const {
        amountMin,
        amountMax,
        dateMin,
        dateMax,
        verified,
      } = currentFiltersSelector(state)
      const categoryId = currentCategoryIdSelector(state)
      const needLoadCharts = noTextSearchSelector(state)
      const reqVerified =
        verified === false ? false : categoryId !== null ? true : null
      const includeUnfiltered = R.isNil(unfilteredCountSelector(state))

      return graphql(
        QUERIES.buildQuery({
          barChart: needLoadCharts,
          barChartBarSize: needLoadCharts,
          categories: !categoriesLoaded,
          categoryScoped: !!categoryId,
          payments: true,
          pieChart: needLoadCharts,
          includeUnfiltered,
          totalCount: true,
        }),
        {
          accountId: currentAccountId,
          sourcePids,
          amountMax,
          amountMin,
          categoryId: categoryId || null,
          dateMax: dateMax && formatDate(dateMax),
          dateMin: dateMin && formatDate(dateMin),
          first: PAGE_SIZE,
          search: search || null,
          skip: (page - 1) * PAGE_SIZE,
          verified: reqVerified,
        }
      )
    })
    .map(ACTIONS.load.success)
    .catch(handleError(ACTIONS.load.error))
