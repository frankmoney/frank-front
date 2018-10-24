export default {
  getDirectoryRecipients: [
    `
    query(
      $accountId: ID!
      $search: String
      $first: Int
      $skip: Int
      $donors: Boolean!
      $recipients: Boolean!
      $sortBy: PeersOrder!
    ) {
      account(pid: $accountId) {
        peers(
          take: $first
          skip: $skip
          search: $search
          donors: $donors
          recipients: $recipients
          sortBy: $sortBy
        ) {
          id: pid
          name
          countRevenue
          countSpending
          countTotal
          categories {
            id: pid
            name
            color
          }
          countPayments
          lastPaymentOn
        }
        countPeers(
          search: $search
          donors: $donors
          recipients: $recipients
        )
      }
    }
    `,
    ({ account: { peers, countPeers } }) => ({
      recipients: peers.map(
        ({
          id,
          name,
          countRevenue,
          countSpending,
          countTotal,
          categories,
          countPayments,
          lastPaymentOn,
        }) => ({
          id,
          name,
          revenue: countRevenue,
          spending: -countSpending,
          total: countTotal,
          categories,
          paymentCount: countPayments,
          lastPaymentDate: lastPaymentOn,
        })
      ),
      totalCount: countPeers,
    }),
  ],
}
