// @flow strict
import * as R from 'ramda'
import { createPieDataMapper } from 'data/models/pieData'
import { ALL_CATEGORIES, UNCATEGORIZED_CATEGORY } from 'const'
// Reusing 'public' api code here because everything should be the same
import QUERIES from 'containers/public/Ledger/queries'
import { PAGE_SIZE } from 'containers/public/Ledger/constants'

export const between: (number, number) => number => boolean = (min, max) =>
  R.both(R.gte(R.__, min), R.lt(R.__, max))

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
