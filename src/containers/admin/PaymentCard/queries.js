import pluralize from 'utils/pluralize'

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

const suggestDescriptions = [
  `
    query(
      $accountId: ID!
      $paymentId: ID!
      $search: String
    ) {
      account(pid: $accountId) {
        payment(pid: $paymentId) {
          suggestedDescriptions(search: $search) {
            text: description
            count
          }
        }
      }
    }
    `,
  ({
    account: {
      payment: { suggestedDescriptions },
    },
  }) =>
    suggestedDescriptions.map(({ text, count }) => ({
      text,
      data: text,
      secondaryText: pluralize('payment', count),
    })),
]

const suggestPeers = [
  `
  query(
    $accountId: ID!
    $search: String
  ) {
    account(pid: $accountId) {
      peers(
        sortBy: name_ASC
        search: $search
      ) {
        id: pid
        name
        count: countPayments
      }
    }
  }
    `,
  ({ account: { peers } }) =>
    peers.map(({ id, name, count }) => ({
      text: name,
      data: { id, name },
      secondaryText: pluralize('payment', count),
    })),
]

const updatePayment = [
  `
    mutation(
      $accountId: ID!
      $paymentId: ID!
      $peerName: String
      $categoryId: ID
      $description: String
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
        suggestedPayments {
          ${PAYMENTS}
        }
      }
    }
    `,
  ({ result: { payment, suggestedPayments: cascade } }) => ({
    payment,
    cascade,
  }),
]

export default {
  suggestDescriptions,
  suggestPeers,
  updatePayment,
}
