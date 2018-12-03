import * as R from 'ramda'
import { serializeCategoryType } from 'data/models/category'
import { mapPayment } from 'data/models/payment'
import * as ACTIONS from '../actions'
import { PAGE_SIZE } from '../constants'
import QUERIES from '../queries'
import {
  accountIdSelector,
  categoriesSelector,
  categoryTypeSelector,
  chartsVisibleSelector,
  currentCategoryIdSelector,
  currentFiltersSelector,
  currentPageSelector,
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
      const categoryType = serializeCategoryType(categoryTypeSelector(state))
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
          categoryType,
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
