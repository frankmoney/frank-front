export default {
  getDirectoryRecipients: [
    `
    query(
      $accountId: ID!,
      $search: String,
      $first: Int!,
      $skip: Int,
    ) {
      recipients: directoryPeers(
        accountId: $accountId,
        first: $first,
        skip: $skip,
        search: $search,
        donors: true,
        recipients: true,
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
    }
    `,
    ({ recipients }) => ({
      recipients,
    }),
  ],
}
