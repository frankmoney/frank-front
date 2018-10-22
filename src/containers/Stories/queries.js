import * as R from 'ramda'
import { mapStory } from 'data/models/story'

export default {
  getStories: [
    `
    query(
      $accountId: ID!
    ) {
      account(pid: $accountId) {
        stories {
          id: pid
          isPublished
          data: draftData {
            title
            body
            coverImage
            paymentsDateRange
            countPayments
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
