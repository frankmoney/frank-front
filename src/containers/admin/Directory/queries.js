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
        currency {
          code
        }
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
          
          peerAggregate: aggregatePayments(
            verified: true
          ) {
            count
            totalSum
          }
          
          peerRevenueAggregate: aggregatePayments(
            verified: true
            categoryType: revenue
          ) {
            totalSum
          }
          
          peerSpendingAggregate: aggregatePayments(
            verified: true
            categoryType: spending
          ) {
            totalSum
          }
          
          categories {
            id: pid
            name
            color
            
            categoryAggregate: aggregatePayments(
              verified: true
            ) {
              count
              totalSum
            }
          }
        }
        countPeers(
          search: $search
          donors: $donors
          recipients: $recipients
        )
      }
    }
    `,
    ({ account: { currency, peers, countPeers } }) => ({
      currencyCode: currency && currency.code,
      recipients: peers.map(
        ({
          id,
          name,
          peerAggregate: { count: peerCount, totalSum: peerTotalSum },
          peerRevenueAggregate: { totalSum: peerRevenueTotalSum },
          peerSpendingAggregate: { totalSum: peerSpendingTotalSum },
          categories,
        }) => ({
          id,
          name,
          paymentCount: peerCount,
          total: peerTotalSum || 0,
          revenue: peerRevenueTotalSum || 0,
          spending: peerSpendingTotalSum || 0,
          categories: categories
            .filter(x => x.categoryAggregate.count > 0)
            .map(({ categoryAggregate, ...category }) => ({
              ...category,
              sum: categoryAggregate.totalSum,
            })),
        })
      ),
      totalCount: countPeers,
    }),
  ],
}
