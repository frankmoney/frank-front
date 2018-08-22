import * as R from 'ramda'

export default {
  getPaymentsAndTotalCount: ({
    totalCount: includeTotal,
    payments: includePayments,
    pieChart: includePie,
    barChart: includeBars,
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
    ) {
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
        dateMax: $dateMax
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
      ) {
        count
      }`) ||
        ''}
    }
    `,
    ({ payments, totalCountResult, pieChart, barChart }) => ({
      payments,
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
