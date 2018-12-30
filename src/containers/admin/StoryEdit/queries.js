const storyFields = `
  pid
  title
  cover
  body
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
          payments(
            sortBy: postedOn_DESC
          ) {
            ${paymentFields}
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
      $published: Boolean
      $paymentIds: [ID!]
    ) {
      story: storyCreate(
        accountPid: $accountId
        title: $title
        cover: $cover
        body: $body
        published: $published
        paymentPids: $paymentIds
      ) {
        ${storyFields}
        payments(
          sortBy: amount_DESC
        ) {
          ${paymentFields}
        }
      }
    }
    `,
    ({ story }) => story,
  ],
  deleteStory: [
    `
    mutation(
      $storyId: ID!
    ) {
      storyDelete(pid: $storyId) {
        account {
          pid
        }
      }
    }
    `,
    () => null,
  ],
  updateStory: [
    `
    mutation(
      $pid: ID!
      $title: String
      $cover: JSON
      $body: JSON
      $published: Boolean
      $paymentIds: [ID!]
    ) {
      story: storyUpdate(
        pid: $pid
        update: {
          title: $title
          cover: $cover
          body: $body
          published: $published
          paymentPids: $paymentIds
        }
      ) {
        ${storyFields}
        payments(
          sortBy: amount_DESC
        ) {
          ${paymentFields}
        }
      }
    }
    `,
    ({ story }) => story,
  ],
}
