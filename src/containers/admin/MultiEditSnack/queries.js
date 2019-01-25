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

const updatePayments = [
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
      }
    }
    `,
  ({ result: { payments } }) => ({
    payments,
  }),
]

export default {
  updatePayments,
}
