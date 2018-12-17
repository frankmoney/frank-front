const storyFields = `
  id: pid
  title
  publishedAt
`

const storyDraftFields = `
  id: pid
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
  getPayments: [
    `
    query(
      $accountId: ID!
      $postedOnMin: Date
      $postedOnMax: Date
      $take: Int
      $skip: Int
    ) {
      account(pid: $accountId) {
        payments(
          sortBy: postedOn_DESC
          postedOnMin: $postedOnMin
          postedOnMax: $postedOnMax
          take: $take
          skip: $skip
        ) {
          ${paymentFields}
        }
      }
    }
    `,
    ({ account: { payments } }) => payments,
  ],
  countPayments: [
    `
    query(
      $accountId: ID!
      $postedOnMin: Date
      $postedOnMax: Date
    ) {
      account(pid: $accountId) {
        countPayments(
          postedOnMin: $postedOnMin
          postedOnMax: $postedOnMax
        )
      }
    }
    `,
    ({ account: { countPayments } }) => countPayments,
  ],
  getStory: [
    `
    query(
      $accountId: ID!
      $storyId: ID!
    ) {
      account(pid: $accountId) {
        story(pid: $storyId) {
          ${storyFields}
          draft {
            ${storyDraftFields}
            payments(
              sortBy: postedOn_DESC
            ) {
              ${paymentFields}
            }
          }
        }
      }
    }
    `,
    ({ account: { story } }) => story,
  ],
  createStory: [
    `
    mutation(
      $accountId: ID!
      $title: String
      $cover: JSON
      $body: JSON
      $paymentIds: [ID!]
    ) {
      storyCreate(
        accountPid: $accountId
        title: $title
        cover: $cover
        body: $body
        paymentPids: $paymentIds
      ) {
        ${storyFields}
        draft {
          ${storyDraftFields}
          payments(
            sortBy: amount_DESC
          ) {
            ${paymentFields}
          }
        }
      }
    }
    `,
    ({ storyCreate }) => storyCreate,
  ],
  deleteStory: [
    `
    mutation(
      $storyId: ID!
    ) {
      storyDelete(pid: $storyId) {
        pid
      }
    }
    `,
    () => null,
  ],
  unpublishStory: [
    `
    mutation(
      $storyId: ID!
    ) {
      storyUnpublish(pid: $storyId) {
        ${storyFields}
        draft {
          ${storyDraftFields}
          payments(
            sortBy: amount_DESC
          ) {
            ${paymentFields}
          }
        }
      }
    }
    `,
    ({ storyUnpublish }) => storyUnpublish,
  ],
  updateStoryDraft: [
    `
    mutation(
      $id: ID!
      $title: String
      $cover: JSON
      $body: JSON
      $paymentIds: [ID!]
    ) {
      storyDraftUpdate(
        pid: $id
        title: $title
        cover: $cover
        body: $body
        paymentPids: $paymentIds
      ) {
        story {
          ${storyFields}
          draft {
            ${storyDraftFields}
            payments(
              sortBy: amount_DESC
            ) {
              ${paymentFields}
            }
          }
        }
      }
    }
    `,
    ({ storyDraftUpdate: { story } }) => story,
  ],
  publishStoryDraft: [
    `
    mutation(
      $draftId: ID!
    ) {
      storyDraftPublish(
        pid: $draftId
      ) {
        story {
          ${storyFields}
          draft {
            ${storyDraftFields}
            payments(
              sortBy: amount_DESC
            ) {
              ${paymentFields}
            }
          }
        }
      }
    }
    `,
    ({ storyDraftPublish: { story } }) => story,
  ],
}
