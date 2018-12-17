// @flow
// Reusing 'public' api code here because everything should be the same
import QUERIES from 'containers/public/Ledger/queries'
import { PAGE_SIZE } from 'containers/public/Ledger/constants'

export const buildQuery = (accountId: number, categoryId: ?number) => [
  QUERIES.buildQuery({
    barChart: true,
    categories: false, // !categoriesLoaded,
    categoryScoped: !!categoryId,
    payments: true,
    pieChart: true,
    stories: true,
    totalCount: true,
  }),
  {
    accountId,
    categoryId: categoryId || undefined,
    // dateMax,
    // dateMin,
    first: PAGE_SIZE,
    // search,
    // skip: (page - 1) * PAGE_SIZE,
    verified: null,
  },
]
