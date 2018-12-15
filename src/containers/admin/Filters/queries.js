import * as R from 'ramda'
import { parseDate } from 'utils/dates'

const parseDateIfNotNil = R.when(R.complement(R.isNil), parseDate)

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
  getAccountAggregatedPayments: [
    `
    query(
      $accountId: ID!
    ) {
      account(pid: $accountId) {
        aggregatePayments {
          dateMin: postedOnMin
          dateMax: postedOnMax
          sumMin: amountMin
          sumMax: amountMax
        }
      }
    }`,
    R.pipe(
      R.path(['account', 'aggregatePayments']),
      R.evolve({
        dateMin: parseDateIfNotNil,
        dateMax: parseDateIfNotNil,
      })
    ),
  ],
}
