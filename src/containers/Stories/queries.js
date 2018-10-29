export default {
  getStories: [
    `
    query(
      $accountId: ID!
    ) {
      account(pid: $accountId) {
        stories(
          sortBy: publishedAt_DESC
        ) {
          pid
          draft {
            title
            cover
            body
            published
            paymentsCount: countPayments
            paymentsDateRange
          }
        }
      }
    }
    `,
    ({ account: { stories } }) => ({ stories }),
  ],
}
