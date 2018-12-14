import pluralize from 'utils/pluralize'

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
        donors: true
        recipients: true
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

export default {
  suggestDescriptions,
  suggestPeers,
}
