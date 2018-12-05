import * as R from 'ramda'
import { serializeCategoryType } from 'data/models/category'
import { mapPayment } from 'data/models/payment'
import { formatDate } from 'utils/dates'
import { currentAccountIdSelector } from 'redux/selectors/user'
import * as ACTIONS from '../actions'
import { PAGE_SIZE } from '../constants'
import QUERIES from '../queries'
import {
  categoriesSelector,
  categoryTypeSelector,
  currentCategoryIdSelector,
  currentFiltersSelector,
  currentPageSelector,
  noTextSearchSelector,
  searchTextSelector,
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
      const categoryType = serializeCategoryType(categoryTypeSelector(state))
      const {
        amountMin,
        amountMax,
        dateMin,
        dateMax,
        verified,
      } = currentFiltersSelector(state)
      const categoryId = currentCategoryIdSelector(state)
      const needLoadCharts = noTextSearchSelector(state)

      return graphql(
        QUERIES.buildQuery({
          barChart: needLoadCharts,
          barChartBarSize: needLoadCharts,
          categories: !categoriesLoaded,
          categoryScoped: !!categoryId,
          payments: true,
          pieChart: needLoadCharts,
          totalCount: true,
        }),
        {
          accountId: currentAccountId,
          amountMax,
          amountMin,
          categoryId: categoryId || null,
          categoryType,
          dateMax: dateMax && formatDate(dateMax),
          dateMin: dateMin && formatDate(dateMin),
          first: PAGE_SIZE,
          search: search || null,
          skip: (page - 1) * PAGE_SIZE,
          verified,
        }
      )
    })
    .map(R.evolve({ payments: R.map(mapPayment) }))
    .map(ACTIONS.load.success)
