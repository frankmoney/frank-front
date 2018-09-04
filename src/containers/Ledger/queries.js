import * as R from 'ramda'

export default {
  getPaymentsAndTotalCount: ({
    totalCount: includeTotal,
    payments: includePayments,
    pieChart: includePie,
    barChart: includeBars,
    categories: includeCategories,
    categoryScoped,
  }) => [
    `
    query(
      $accountId: ID!
      $first: Int!
      $skip: Int
      $search: String
      $dateMin: Date
      $dateMax: Date
      $amountMin: Float
      $amountMax: Float
      $verified: Boolean
      ${categoryScoped ? '$categoryId: ID!,' : ''}
    ) {
      account(id: $accountId) {
        ${(includeCategories &&
          `categories {
            id
            name
          }`) ||
          ''}
          
        ${categoryScoped ? 'category(id: $categoryId) {' : ''}
        
        ${(includePayments &&
          `payments(
            first: $first
            skip: $skip
            search: $search
            postedOnMin: $dateMin
            postedOnMax: $dateMax
            amountMin: $amountMin
            amountMax: $amountMax
            verified: $verified
          ) {
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
          }`) ||
          ''}
          
        ${(includeTotal &&
          `countPayments(
            search: $search
            postedOnMin: $dateMin
            postedOnMax: $dateMax
            amountMin: $amountMin
            amountMax: $amountMax
            verified: $verified
          ) {
            value
          }`) ||
          ''}
          
        ${(includeBars &&
          `ledgerBarChart(
            postedOnMin: $dateMin
            postedOnMax: $dateMax
          ) {
            items {
              date
              revenue
              spending
            }
          }`) ||
          ''}
          
        ${categoryScoped ? '}' : ''}
        
        ${(includePie &&
          `ledgerPieChart {
            items {
              category {
                id
                name
                color
              }
              revenue
              spending
            }
          }`) ||
          ''}
      }
    }
    `,
    ({
      account: {
        categories,
        category,
        payments,
        countPayments,
        ledgerBarChart,
        ledgerPieChart,
      },
    }) => ({
      categories: includeCategories ? categories : null,
      payments: categoryScoped ? category.payments : payments,
      totalCount: (categoryScoped ? category.countPayments : countPayments)
        .value,
      barChart: includeBars
        ? (categoryScoped ? category.ledgerBarChart : ledgerBarChart).items.map(
            ({ date, revenue, spending }) => ({
              date,
              income: revenue,
              expenses: spending,
            })
          )
        : null,
      pieChart: includePie
        ? ledgerPieChart.items.map(
            // eslint-disable-next-line
            ({ category, revenue, spending }) => ({
              category,
              income: revenue,
              expenses: spending,
            })
          )
        : null,
    }),
  ],
  getOnlyTotalCount: [
    `
    query(
      $accountId: ID!,
      $search: String,
      $dateMin: Date,
      $dateMax: Date,
      $amountMin: Float,
      $amountMax: Float,
      $verified: Boolean,
    ) {
      account(id: $accountId) {
        countPayments(
          postedOnMin: $dateMin
          postedOnMax: $dateMax
          amountMin: $amountMin
          amountMax: $amountMax
          verified: $verified
          search: $search
        ) {
          value
        }
      }
    }
    `,
    R.path(['account', 'countPayments', 'value']),
  ],
}
