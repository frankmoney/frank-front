const PAYMENTS = `
id: pid
postedOn
amount
peer {
  id: pid
  name
}
verified
pending
description
category {
  id: pid
  name
  color
}
descriptionUpdater {
  isSystem
}
peerUpdater {
  isSystem
}
categoryUpdater {
  isSystem
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
}
