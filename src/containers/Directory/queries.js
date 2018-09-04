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
          
          total {
            value
          }
          
          revenue {
            value
          }
          
          spending {
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
          total,
          revenue,
          spending,
          categories,
          countPayments,
          lastPaymentOn,
        }) => ({
          id,
          name,
          total,
          revenue,
          spendings: spending,
          categories,
          paymentCount: countPayments.value,
          lastPaymentDate: lastPaymentOn.value,
        })
      ),
      totalCount: countPeers.value,
    }),
  ],
}
