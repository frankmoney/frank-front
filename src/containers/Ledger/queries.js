import * as R from 'ramda'

export default {
  getPaymentsAndTotalCount: ({
    totalCount: includeTotal,
    payments: includePayments,
    pieChart: includePie,
    barChart: includeBars,
    categories: includeCategories,
  }) => [
    `
    query(
      $accountId: ID!,
      $first: Int!,
      $skip: Int,
      $search: String,
      $dateMin: DateTime,
      $dateMax: DateTime,
      $amountMin: Float,
      $amountMax: Float,
      $verified: Boolean,
      $categoryId: ID,
    ) {
      ${(includeCategories &&
        `categories: accountCategories(accountId: $accountId) {
          id
          name
        }`) ||
        ''}
      ${(includePayments &&
        `payments: ledgerPayments(
        accountId: $accountId,
        first: $first,
        skip: $skip,
        search: $search,
        dateMin: $dateMin,
        dateMax: $dateMax,
        amountMin: $amountMin,
        amountMax: $amountMax,
        verified: $verified,
        categoryId: $categoryId
      ) {
        id
        postedOn
        amount
        peerName
        description
        category {
          id
          name
          color
        }
      }`) ||
        ''}
      ${(includePie &&
        `pieChart: ledgerPieChart(accountId: $accountId) {
        items {
          category {
            id
            name
            color
          }
          income
          expenses
        }
      }`) ||
        ''}
      ${(includeBars &&
        `barChart: ledgerBarChart(
        accountId: $accountId,
        dateMin: $dateMin,
        dateMax: $dateMax,
        categoryId: $categoryId
      ) {
          items {
            date
            income
            expenses
          }
      }`) ||
        ''}
      ${(includeTotal &&
        `totalCountResult: ledgerPaymentsCount(
        accountId: $accountId,
        search: $search,
        dateMin: $dateMin,
        dateMax: $dateMax,
        amountMin: $amountMin,
        amountMax: $amountMax,
        verified: $verified,
        categoryId: $categoryId
      ) {
        count
      }`) ||
        ''}
    }
    `,
    ({ payments, categories, totalCountResult, pieChart, barChart }) => ({
      payments,
      categories,
      totalCount: totalCountResult && totalCountResult.count,
      pieChart: pieChart && pieChart.items,
      barChart: barChart && barChart.items,
    }),
  ],
  getOnlyTotalCount: [
    `
    query(
      $accountId: ID!,
      $search: String,
      $dateMin: DateTime,
      $dateMax: DateTime,
      $amountMin: Float,
      $amountMax: Float,
      $verified: Boolean,
    ) {
      result: ledgerPaymentsCount(
        accountId: $accountId,
        search: $search,
        dateMin: $dateMin,
        dateMax: $dateMax,
        amountMin: $amountMin,
        amountMax: $amountMax,
        verified: $verified,
      ) {
        count
      }
    }
    `,
    R.path(['result', 'count']),
  ],
}
