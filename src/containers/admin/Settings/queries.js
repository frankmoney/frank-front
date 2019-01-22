import { identity } from 'ramda'

const convertCategory = category => ({
  id: category.pid,
  type: category.type,
  name: category.name,
  color: category.color,
  paymentCount: category.aggregatePayments.count,
})

export default {
  getAccountInfo: [
    `
    query(
      $accountId: ID!
    ) {
      account(pid: $accountId) {
        pid
        name
        description
        isPublic: public
        isDemo: demo
        sources {
          pid
          data
          name
          status
          bankLogo
          bankName
          balance
        }
        categories {
          pid
          type
          name
          color
          aggregatePayments {
            count
          }
        }
      }
    }
    `,
    ({ account: { categories, ...accountProps } }) => ({
      ...accountProps,
      categories: categories.map(convertCategory),
    }),
  ],

  updateAccount: [
    `
    mutation(
      $pid: ID!
      $name: String!
      $description: String
      $isPublic: Boolean!
    ) {
      account: accountUpdate(
        pid: $pid
        update: {
          name: $name
          description: $description
          public: $isPublic
        }
      ) {
        pid
        name
        description
        isPublic: public
      }
    }
    `,
    identity,
  ],
  createCategory: [
    `
    mutation(
      $accountPid: ID!
      $type: CategoryType!
      $name: String!
      $color: String!
    ) {
      category: categoryCreate(
        accountPid: $accountPid
        type: $type
        name: $name
        color: $color
      ) {
        pid
        type
        name
        color
        aggregatePayments {
          count
        }
      }
    }
    `,
    ({ category }) => ({
      category: convertCategory(category),
    }),
  ],
  deleteCategory: [
    `
    mutation(
      $pid: ID!
    ) {
      result: categoryDelete(
        pid: $pid
      ) {
        result
      }
    }
    `,
    ({ result }) => result,
  ],
  updateCategory: [
    `
    mutation(
      $pid: ID!
      $name: String!
      $color: String!
    ) {
      category: categoryUpdate(
        pid: $pid
        update: {
          name: $name
          color: $color
        }
      ) {
        pid
        type
        name
        color
        aggregatePayments {
          count
        }
      }
    }
    `,
    ({ category }) => ({ category: convertCategory(category) }),
  ],
}
