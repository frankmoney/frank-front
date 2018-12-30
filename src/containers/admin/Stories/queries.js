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
          title
          cover
          body
          publishedAt
          aggregatePayments {
            count
            postedOnMin
            postedOnMax
          }
        }
      }
    }
    `,
    ({ account: { stories } }) => ({
      stories: stories.map(({ publishedAt, aggregatePayments, ...other }) => ({
        ...other,
        published: !!publishedAt,
        paymentCount: aggregatePayments.count,
        paymentsDateRange: aggregatePayments.count
          ? [aggregatePayments.postedOnMin, aggregatePayments.postedOnMax]
          : null,
      })),
    }),
  ],
}
