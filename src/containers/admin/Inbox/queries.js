const PEER = `
  id: pid
  name
`

const CATEGORY = `
  id: pid
  name
  color
`

const FIELD_UPDATER = `
  name
  lastName
  firstName
`

const PAYMENTS = `
  id: pid
  postedOn
  amount
  peer {
    ${PEER}
  }
  peerUpdater {
    ${FIELD_UPDATER}
  }
  description
  descriptionUpdater {
    ${FIELD_UPDATER}
  }
  category {
    ${CATEGORY}
  }
  categoryUpdater {
    ${FIELD_UPDATER}
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
