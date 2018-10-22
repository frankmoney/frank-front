import { mapStory } from 'data/models/story'

const paymentScheme = `
  {
    id: pid
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
        id: pid
        data: draftData {
          title
          body
          coverImage
          payments ${paymentScheme}
          countPayments
          paymentsDateRange
        }
      }
    }
    `,
    ({ story }) => ({ story: mapStory(story) }),
  ],
}
