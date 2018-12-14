const PAYMENTS = `
id: pid
postedOn
amount
peer {
  id: pid
  name
}
published: verified
pending
description
category {
  id: pid
  name
  color
}
`

export default {
  // TODO add pending and search params
  listNewPayments: [
    `
      query(
      $accountId: ID!
      $take: Int!
      $skip: Int
      $dateMin: Date
      $dateMax: Date
      $amountMin: Float
      $amountMax: Float
    ) {
      account(pid: $accountId) {
        categories {
          id: pid
          name
          color
        }
        payments(
          sortBy: postedOn_ASC
          take: $take
          skip: $skip
          postedOnMin: $dateMin
          postedOnMax: $dateMax
          amountMin: $amountMin
          amountMax: $amountMax
          verified: false
        ) {
          ${PAYMENTS}
        }
        countPayments(
          postedOnMin: $dateMin
          postedOnMax: $dateMax
          amountMin: $amountMin
          amountMax: $amountMax
          verified: false
        )
      }
    }
  `,
    ({ account: { categories, payments, countPayments: totalCount } }) => ({
      categories,
      payments,
      totalCount,
    }),
  ],
  paymentUpdate: [
    `
    mutation(
      $accountId: ID!
      $paymentId: ID!
      $description: String
      $peerName: String
      $categoryId: ID
      $verified: Boolean
    ) {
      result: paymentUpdate(
        accountPid: $accountId
        paymentPid: $paymentId
        peerName: $peerName
        categoryPid: $categoryId
        description: $description
        verified: $verified
      ) {
        payment {
          ${PAYMENTS}
        }
      }
    }
    `,
    ({ result: { payment } }) => payment,
  ],
}
