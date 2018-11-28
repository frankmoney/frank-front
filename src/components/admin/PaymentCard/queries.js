const formatCount = (count, word) =>
  `${count} ${word}${(count === 0 || count > 1) && 's'}`

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
      secondaryText: formatCount(count, 'payment'),
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
      secondaryText: formatCount(count, 'payment'),
    })),
]

export default {
  suggestDescriptions,
  suggestPeers,
}
