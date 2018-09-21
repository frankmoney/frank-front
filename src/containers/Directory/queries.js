export default {
  getDirectoryRecipients: [
    `
    query(
      $accountId: ID!
      $search: String
      $first: Int
      $skip: Int
      $donors: Boolean
      $recipients: Boolean
      $sortBy: PeersOrder!
    ) {
      account(id: $accountId) {
        peers(
          first: $first
          skip: $skip
          search: $search
          donors: $donors
          recipients: $recipients
          sortBy: $sortBy
        ) {
          id
          name
          revenue {
            value
          }
          spending {
            value
          }
          total {
            value
          }
          categories {
            id
            name
            color
          }
          countPayments {
            value
          }
          lastPaymentOn {
            value
          }
        }
        countPeers(
          search: $search
          donors: $donors
          recipients: $recipients
        ) {
          value
        }
      }
    }
    `,
    ({ account: { peers, countPeers } }) => ({
      recipients: peers.map(
        ({
          id,
          name,
          revenue: { value: revenue },
          spending: { value: spending },
          total: { value: total },
          categories,
          countPayments,
          lastPaymentOn,
        }) => ({
          id,
          name,
          revenue,
          spending: -spending,
          total,
          categories,
          paymentCount: countPayments.value,
          lastPaymentDate: lastPaymentOn.value,
        })
      ),
      totalCount: countPeers.value,
    }),
  ],
}
