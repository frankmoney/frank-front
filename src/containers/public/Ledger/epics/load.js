import * as R from 'ramda'
import { mapPayment } from 'data/models/payment'
import * as ACTIONS from '../actions'
import { PAGE_SIZE } from '../constants'
import QUERIES from '../queries'
import {
  accountIdSelector,
  categoriesSelector,
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
      const accountId = accountIdSelector(state)
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

      return graphql(
        QUERIES.buildQuery({
          barChart: needLoadCharts,
          categories: !categoriesLoaded,
          categoryScoped: !!categoryId,
          payments: true,
          pieChart: needLoadCharts,
          stories: true,
          totalCount: true,
        }),
        {
          accountId,
          amountMax,
          amountMin,
          categoryId: categoryId || undefined,
          dateMax,
          dateMin,
          first: PAGE_SIZE,
          search,
          skip: (page - 1) * PAGE_SIZE,
          verified,
        }
      )
    })
    .map(R.evolve({ payments: R.map(mapPayment) }))
    .map(ACTIONS.load.success)
