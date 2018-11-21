import * as R from 'ramda'

// TODO add pending filter
export default {
  getOnlyTotalCount: [
    `
    query(
      $accountId: ID!,
      $search: String,
      $dateMin: Date,
      $dateMax: Date,
      $amountMin: Float,
      $amountMax: Float,
      $verified: Boolean,
    ) {
      account(pid: $accountId) {
        countPayments(
          postedOnMin: $dateMin
          postedOnMax: $dateMax
          amountMin: $amountMin
          amountMax: $amountMax
          verified: $verified
          search: $search
        )
      }
    }
    `,
    R.path(['account', 'countPayments']),
  ],
}
