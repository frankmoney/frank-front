const storyFields = `
  pid
  publishedAt
`

const storyDraftFields = `
  pid
  title
  cover
  body
  published
  publishedAt
`

const paymentFields = `
  id: pid
  postedOn
  amount
  description
  peerName
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
      $accountPid: ID!
      $storyPid: ID!
    ) {
      account(pid: $accountPid) {
        story(pid: $storyPid) {
          ${storyFields}
          draft {
            ${storyDraftFields}
            payments(
              sortBy: amount_DESC
            ) {
              ${paymentFields}
            }
            countPayments
            paymentsDateRange
          }
        }
      }
    }
    `,
    ({
      account: {
        story: {
          draft: { countPayments, ...draft },
          ...story
        },
      },
    }) => ({
      ...story,
      draft: {
        ...draft,
        paymentsCount: countPayments,
      },
    }),
  ],
}
