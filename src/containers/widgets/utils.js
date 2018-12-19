// @flow strict
import { createPieDataMapper } from 'data/models/pieData'
import { UNCATEGORIZED_CATEGORY } from 'const'
// Reusing 'public' api code here because everything should be the same
import QUERIES from 'containers/public/Ledger/queries'
import { PAGE_SIZE } from 'containers/public/Ledger/constants'

export const ALL_CATEGORIES = {
  name: 'Payments',
  id: 'all',
}

export const remapPieData = createPieDataMapper({
  nameEmptyCategoryAs: 'Uncategorized',
})

export const buildQuery = (
  accountId: number,
  categoryId: ?string,
  loadCategories: boolean
) => {
  const reqCategoryId =
    categoryId === ALL_CATEGORIES.id || categoryId === UNCATEGORIZED_CATEGORY.id
      ? null
      : categoryId
  const verified =
    categoryId === ALL_CATEGORIES.id
      ? null
      : categoryId !== UNCATEGORIZED_CATEGORY.id
  return [
    QUERIES.buildQuery({
      barChart: true, // TODO: optimize
      categories: loadCategories,
      categoryScoped: !!reqCategoryId,
      payments: true,
      pieChart: true, // TODO: optimize
      stories: true,
      totalCount: true,
    }),
    {
      accountId,
      categoryId: reqCategoryId || undefined,
      // dateMax,
      // dateMin,
      first: PAGE_SIZE, // FIXME: what is the real limit?
      // skip: (page - 1) * PAGE_SIZE,
      verified,
    },
  ]
}
