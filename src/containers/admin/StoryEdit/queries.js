const storyFields = `
  pid
  title
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
  getPayments: [
    `
    query(
      $accountPid: ID!
      $postedOnMin: Date
      $postedOnMax: Date
      $take: Int
      $skip: Int
    ) {
      account(pid: $accountPid) {
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
      $accountPid: ID!
      $postedOnMin: Date
      $postedOnMax: Date
    ) {
      account(pid: $accountPid) {
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
      $accountPid: ID!
      $storyPid: ID!
    ) {
      account(pid: $accountPid) {
        story(pid: $storyPid) {
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
      $accountPid: ID!
      $title: String
      $cover: JSON
      $body: JSON
      $paymentPids: [ID!]
    ) {
      storyCreate(
        accountPid: $accountPid
        title: $title
        cover: $cover
        body: $body
        paymentPids: $paymentPids
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
      $storyPid: ID!
    ) {
      storyDelete(pid: $storyPid) {
        pid
      }
    }
    `,
    () => null,
  ],
  unpublishStory: [
    `
    mutation(
      $storyPid: ID!
    ) {
      storyUnpublish(pid: $storyPid) {
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
      $pid: ID!
      $title: String
      $cover: JSON
      $body: JSON
      $paymentPids: [ID!]
    ) {
      storyDraftUpdate(
        pid: $pid
        title: $title
        cover: $cover
        body: $body
        paymentPids: $paymentPids
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
      $draftPid: ID!
    ) {
      storyDraftPublish(
        pid: $draftPid
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
