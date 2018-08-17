import * as R from 'ramda'

export default {
  getPaymentsAndTotalCount: [
    `
    query(
      $accountId: ID!,
      $first: Int!
      $search: String,
      $dateMin: DateTime,
      $dateMax: DateTime,
      $amountMin: Float,
      $amountMax: Float,
      $verified: Boolean,
    ) {
      payments: ledgerPayments(
        accountId: $accountId,
        first: $first,
        search: $search,
        dateMin: $dateMin,
        dateMax: $dateMax,
        amountMin: $amountMin,
        amountMax: $amountMax,
        verified: $verified,
      ) {
        id
        postedDate
        amount
        peerName
        description
        category {
          id
          name
          color
        }
      }
      totalCountResult: ledgerPaymentsCount(
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
    ({ payments, totalCountResult: { count: totalCount } }) => ({
      payments,
      totalCount,
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
