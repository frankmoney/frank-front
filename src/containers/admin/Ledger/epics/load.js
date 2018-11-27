import * as R from 'ramda'
import { mapPayment } from 'data/models/payment'
import { formatDate } from 'utils/dates'
import { currentAccountIdSelector } from 'redux/selectors/user'
import * as ACTIONS from '../actions'
import { PAGE_SIZE } from '../constants'
import QUERIES from '../queries'
import {
  currentFiltersSelector,
  searchTextSelector,
  chartsVisibleSelector,
  currentPageSelector,
  categoriesSelector,
  currentCategoryIdSelector,
} from '../selectors'

export default (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.load)
    .switchMap(() => {
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
      const needLoadCharts = chartsVisibleSelector(state)

      return graphql(
        QUERIES.buildQuery({
          categoryScoped: !!categoryId,
          payments: true,
          totalCount: true,
          barChart: needLoadCharts,
          barChartBarSize: needLoadCharts,
          pieChart: needLoadCharts,
          categories: !categoriesLoaded,
        }),
        {
          accountId: currentAccountId,
          categoryId: categoryId || null,
          first: PAGE_SIZE,
          skip: (page - 1) * PAGE_SIZE,
          search: search || null,
          amountMin,
          amountMax,
          dateMin: dateMin && formatDate(dateMin),
          dateMax: dateMax && formatDate(dateMax),
          verified,
        }
      )
    })
    .map(R.evolve({ payments: R.map(mapPayment) }))
    .map(ACTIONS.load.success)
