import { mapStory } from 'data/models/story'

const paymentScheme = `
  {
    id
    postedOn
    amount
    peerName
    description
    category {
      id
      name
      color
    }
  }
  `

export default {
  getStory: [
    `
    query(
      $storyId: ID!
    ) {
      story(id: $storyId) {
        id
        data: draftData {
          title
          body
          coverImage
          payments ${paymentScheme}
          countPayments { value }
          paymentsDateRange
        }
      }
    }
    `,
    ({ story }) => ({ story: mapStory(story) }),
  ],
}
