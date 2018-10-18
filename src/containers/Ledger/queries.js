import * as R from 'ramda'
import { convertGraphqlPieData } from 'data/models/pieData'

export default {
  buildQuery: ({
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
            color
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
            peer {
              id
              name
            }
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
      pieChart: includePie ? convertGraphqlPieData(ledgerPieChart.items) : null,
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

  getSuggestions: ({ peers: searchPeers, description: searchDescription }) => [
    `
    query(
      $accountId: ID!
      $search: String
    ) {
      account(id: $accountId) {
        ${(searchPeers &&
          `
          peers(
            sortBy: name_ASC
            search: $search
            donors: true
            recipients: true
          ) {
            id
            name
            countPayments {
              value
            }
          }
          `) ||
          ''}
        ${(searchDescription &&
          `
          descriptions(
            search: $search
          ) {
            id
            text
            countPayments {
              value
            }
          }
          `) ||
          ''}
      }
    }
    `,
    ({ account: { peers, descriptions } }) => ({
      peers: peers.map(({ countPayments: { value: count }, ...other }) => ({
        ...other,
        count,
      })),
      descriptions,
    }),
  ],
}
