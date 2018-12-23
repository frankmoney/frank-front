import { identity } from 'ramda'

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
        sources {
          pid
          data
          name
          status
          bankLogo
          bankName
        }
        incomeCategories: categories(type: revenue) {
          id: pid
          name
          color
        }
        spendingCategories: categories(type: spending) {
          id: pid
          name
          color
        }
      }
    }
    `,
    ({
      account: {
        pid,
        name,
        description,
        isPublic,
        sources,
        incomeCategories,
        spendingCategories,
      },
    }) => ({
      pid,
      name,
      description,
      isPublic,
      sources,
      incomeCategories,
      spendingCategories,
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
      }
    }
    `,
    identity,
  ],
  deleteCategory: [
    `
    mutation(
      $pid: ID!
    ) {
      result: categoryDelete(
        pid: $pid
      ) {
        account {
          pid
        }
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
      }
    }
    `,
    identity,
  ],
}
