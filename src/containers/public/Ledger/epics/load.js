import { formatDate } from 'utils/dates'
import { ALL_CATEGORIES, UNCATEGORIZED_CATEGORY } from 'const'
import * as ACTIONS from '../actions'
import { PAGE_SIZE } from '../constants'
import QUERIES from '../queries'
import {
  accountIdSelector,
  categoriesSelector,
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
      const {
        amountMin,
        amountMax,
        dateMin,
        dateMax,
        verified,
      } = currentFiltersSelector(state)
      const categoryId = currentCategoryIdSelector(state)
      const reqCategoryId =
        categoryId === ALL_CATEGORIES.id ||
        categoryId === UNCATEGORIZED_CATEGORY.id
          ? null
          : categoryId
      const reqVerified =
        verified === false ? false : reqCategoryId !== null ? true : null

      return graphql(
        QUERIES.buildQuery({
          barChart: true,
          categories: !categoriesLoaded,
          categoryScoped: !!reqCategoryId,
          payments: true,
          pieChart: true,
          stories: true,
          totalCount: true,
        }),
        {
          accountId,
          amountMax,
          amountMin,
          categoryId: reqCategoryId || undefined,
          dateMax: dateMax && formatDate(dateMax),
          dateMin: dateMin && formatDate(dateMin),
          first: PAGE_SIZE,
          search,
          skip: (page - 1) * PAGE_SIZE,
          verified: reqVerified,
        }
      )
    })
    .map(ACTIONS.load.success)
