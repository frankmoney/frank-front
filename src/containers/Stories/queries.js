import * as R from 'ramda'
import { mapStory } from 'data/models/story'

export default {
  getStories: [
    `
    query(
      $accountId: ID!
    ) {
      account(id: $accountId) {
        stories {
          id
          isPublished
          data: draftData {
            title
            body
            coverImage
            paymentsDateRange
            countPayments { value }
          }  
        }
      }
    }
    `,
    ({ account: { stories } }) => ({
      stories: R.map(mapStory, stories),
    }),
  ],
}
