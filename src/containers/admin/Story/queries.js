export default {
  getStory: [
    `
    query(
      $accountId: ID!
      $storyId: ID!
    ) {
      account(pid: $accountId) {
        story(pid: $storyId) {
          pid
          title
          cover
          body
          publishedAt
          payments(
            sortBy: postedOn_DESC
          ) {
            id: pid
            postedOn
            amount
            description
            peer {
              id: pid
              name
            }
            category {
              id: pid
              name
              color
            }
          }
          aggregatePayments {
            count
            postedOnMin
            postedOnMax
          }
        }
      }
    }
    `,
    ({
      account: {
        story: { aggregatePayments, ...other },
      },
    }) => ({
      ...other,
      paymentsCount: aggregatePayments.count,
      paymentsDateRange: aggregatePayments.count
        ? [aggregatePayments.postedOnMin, aggregatePayments.postedOnMax]
        : null,
    }),
  ],
}
