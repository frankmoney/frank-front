export default {
  getDirectoryRecipients: [
    `
    query(
      $accountId: ID!
      $search: String
      $first: Int!
      $skip: Int
      $donors: Boolean
      $recipients: Boolean
      $sortBy: DirectoryPeersInputSortBy
    ) {
      recipients: directoryPeers(
        accountId: $accountId
        first: $first
        skip: $skip
        search: $search
        donors: $donors
        recipients: $recipients
        sortBy: $sortBy
      ) {
        id
        name
        total
        revenue
        spendings
        categories {
          id
          name
          color
        }
        paymentCount
        lastPaymentDate
      }
      totalCount: directoryPeersCount(
        accountId: $accountId
        search: $search
        donors: true
        recipients: true
      ) {
        count
      }
    }
    `,
    ({ recipients, totalCount }) => ({
      recipients,
      totalCount: totalCount && totalCount.count,
    }),
  ],
}
