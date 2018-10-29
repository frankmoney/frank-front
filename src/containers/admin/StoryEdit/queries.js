import { mapStory } from 'data/models/story'

const paymentScheme = `
  {
    id: pid
    postedOn
    amount
    peerName
    description
    category {
      id: pid
      name
      color
    }
  }
  `

const storyDataScheme = (type = 'draft') => `
  id
  isPublished,
  hasUnpublishedDraft,
  data: ${type === 'draft' ? 'draftData' : 'publicData'} {
    title
    body
    coverImage
    payments ${paymentScheme}
  }
`

const storyQuery = (type = 'draft') => `
  story(pid: $storyId) { 
    ${storyDataScheme(type)}
  }
`

const paymentsQuery = `
      payments(
        take: $first
        skip: $skip
        postedOnMin: $dateMin
        postedOnMax: $dateMax
      ) ${paymentScheme}
`

const totalCountQuery = `
    countPayments(
      postedOnMin: $dateMin
      postedOnMax: $dateMax
    )
`

export default {
  getStoryAndPaymentsAndTotalCount: ({
    storyId,
    totalCount: includeTotal,
    payments: includePayments,
  }) => [
    `
    query(
      $accountId: ID!
      ${(storyId && `$storyId: ID!`) || ''}
      $first: Int!
      $skip: Int
      $dateMin: Date
      $dateMax: Date
    ) {
      account(pid: $accountId) {
        ${(includePayments && paymentsQuery) || ''}
        ${(includeTotal && totalCountQuery) || ''}
      }
      ${(storyId && storyQuery()) || ''}
    }
    `,
    ({ account: { payments, countPayments }, story }) => ({
      story: story && mapStory(story),
      payments,
      totalCount: countPayments,
    }),
  ],
  storyСreateOrUpdate: ({ isNew }) => [
    `
    mutation(
      $accountId: ID!
      ${(!isNew && '$storyId: ID!') || ''}
      $title: String!
      $body: JSON!
      $coverImage: JSON
      $paymentsIds: [ID!]
    ) {
      story: ${isNew ? `storyCreate` : `storyUpdate`}(
        accountId: $accountId
        ${(!isNew && 'storyId: $storyId') || ''}
        title: $title
        body: $body
        coverImage: $coverImage
        paymentsIds: $paymentsIds
      ) {
        ${storyDataScheme()}
      }
    }
    `,
    ({ story }) => ({ story: story && mapStory(story) }),
  ],
  storyDelete: [
    `
    mutation($accountId: ID!, $storyId: ID!) {
      story: storyDelete(accountId: $accountId, storyId: $storyId) {
        id: pid
      }
    }
    `,
    ({ story }) => ({ story }),
  ],
  storyPublish: [
    `
    mutation($accountId: ID!, $storyId: ID!, $isPublished: Boolean!) {
      story: storyPublish(
        accountId: $accountId,
        storyId: $storyId,
        isPublished: $isPublished
      ) {
        id: pid
        isPublished
        hasUnpublishedDraft
      }
    }
    `,
    ({ story }) => ({ story }),
  ],
}
