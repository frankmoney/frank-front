export default {
  getStory: [
    `
    query(
      $accountId: ID!
      $storyId: ID!
    ) {
      account(pid: $accountId) {
        id: pid
        name
        currency {
          code
        }
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
        id,
        name,
        currency: { code: currencyCode },
        story: { aggregatePayments, ...other },
      },
    }) => ({
      account: { id, name, currencyCode },
      story: {
        ...other,
        paymentsCount: aggregatePayments.count,
        paymentsDateRange: aggregatePayments.count
          ? [aggregatePayments.postedOnMin, aggregatePayments.postedOnMax]
          : null,
      },
    }),
  ],
}
