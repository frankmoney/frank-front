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
const updatePayment = [
  `
    mutation(
      $accountId: ID!
      $paymentIds: [ID!]!
      $peerName: String
      $categoryId: ID
      $description: String
      $verified: Boolean
    ) {
      result: paymentsUpdate(
        accountPid: $accountId
        paymentsPids: $paymentIds
        peerName: $peerName
        categoryPid: $categoryId
        description: $description
        verified: $verified
      ) {
        payments {
          ${PAYMENTS}
        }
        suggestedPayments {
          ${PAYMENTS}
        }
      }
    }
    `,
  ({
    result: {
      payments: [payment],
      suggestedPayments: cascade,
    },
  }) => ({
    payment,
    cascade,
  }),
]

export default {
  updatePayment,
}
