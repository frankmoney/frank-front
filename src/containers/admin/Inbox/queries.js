const mapPayment = ({ peer, category, ...other }) => ({
  ...other,
  peerName: peer && peer.name,
  peerId: peer && peer.id,
  categoryId: category && category.id,
})

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
      payments: payments.map(mapPayment),
      totalCount,
    }),
  ],
  paymentUpdate: [
    `
    mutation(
      $accountId: ID!
      $paymentId: ID!
      $peerId: ID
      $peerName: String
      $categoryId: ID
      $description: String
      $verified: Boolean
    ) {
      payment: paymentUpdate(
        accountPid: $accountId
        paymentPid: $paymentId
        peerPid: $peerId
        peerName: $peerName
        categoryPid: $categoryId
        description: $description
        verified: $verified
      ) {
        ${PAYMENTS}
      }
    }
    `,
    ({ payment }) => mapPayment(payment),
  ],
}
