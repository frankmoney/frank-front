export default {
  loadInitialFilters: [
    `
    query(
      $accountId: ID!
      $pending: Boolean
      $verified: Boolean
    ) {
      account(pid: $accountId) {
        categories {
          id:pid
          name
          color
          type
        }
        aggregatePayments(
          pending: $pending
          verified: $verified
        ) {
          amountMin
          amountMax
        }
      }
    }
    `,
    ({
      account: {
        categories,
        aggregatePayments: { amountMin, amountMax },
      },
    }) => ({ categories, limits: { amountMin, amountMax } }),
  ],
  getPayments: ({ categoryScoped }) => [
    `
    query(
      $accountId: ID!
      $dateMin: Date
      $dateMax: Date
      $sumMin: Float
      $sumMax: Float
      $search: String
      $pending: Boolean
      $verified: Boolean
      ${categoryScoped ? '$categoryId: ID!' : ''}
      $take: Int
      $skip: Int
    ) {
      account(pid: $accountId) {
       ${categoryScoped ? 'category(pid: $categoryId) {' : ''}
        payments(
          sortBy: postedOn_DESC
          postedOnMin: $dateMin
          postedOnMax: $dateMax
          amountMin: $sumMin
          amountMax: $sumMax
          search: $search
          pending: $pending
          verified: $verified
          take: $take
          skip: $skip
        ) {
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
        }
        totalCount: countPayments(
          postedOnMin: $dateMin
          postedOnMax: $dateMax
          amountMin: $sumMin
          amountMax: $sumMax
          search: $search
          pending: $pending
          verified: $verified
        )  
        ${categoryScoped ? '}' : ''}
      }
    }
    `,
    ({ account: { payments, totalCount, category } }) => ({
      payments: categoryScoped ? category.payments : payments,
      totalCount: categoryScoped ? category.totalCount : totalCount,
    }),
  ],
}
