const storyFields = `
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
`

const paymentFields = `
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
`

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
          ${storyFields}
          payments(
            sortBy: amount_DESC
          ) {
              ${paymentFields}
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
        story: {
          aggregatePayments: { count, postedOnMin, postedOnMax },
          ...story
        },
      },
    }) => ({
      account: { id, name, currencyCode },
      story: {
        ...story,
        paymentsCount: count,
        paymentsDateRange: postedOnMin ? [postedOnMin, postedOnMax] : null,
      },
    }),
  ],
}
