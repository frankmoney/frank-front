import * as R from 'ramda'
import { convertGraphqlPieData } from 'data/models/pieData'

export default {
  buildQuery: ({
    allPeers: includeAllPeers,
    totalCount: includeTotal,
    payments: includePayments,
    pieChart: includePie,
    barChartBROKEN: includeBars,
    categories: includeCategories,
    stories: includeStories,
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
      account(pid: $accountId) {
        id: pid
        name
        total: countTotal
        revenue: countRevenue
        spending: countSpending
        ${(includeCategories &&
          `categories {
            id: pid
            name
            color
          }`) ||
          ''}
        
        ${(includeAllPeers &&
          `peers(sortBy: name_ASC, donors: true, recipients: true) {
            id: pid
            name
          }`) ||
          ''}
          
        ${categoryScoped ? 'category(pid: $categoryId) {' : ''}
        
        ${(includePayments &&
          `payments(
            take: $first
            skip: $skip
            search: $search
            postedOnMin: $dateMin
            postedOnMax: $dateMax
            amountMin: $amountMin
            amountMax: $amountMax
            verified: $verified
            sortBy: postedOn_DESC
          ) {
            id: pid
            postedOn
            amount
            peerName
            peer {
              id: pid
              name
            }
            description
            category {
              id: pid
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
          )`) ||
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
                id: pid
                name
                color
              }
              revenue
              spending
            }
          }`) ||
          ''}

        ${(includeStories &&
          `stories (sortBy: publishedAt_DESC) {
            id: pid
            title
            body
            cover
            paymentsDateRange
            paymentsCount: countPayments
          }`) ||
          ''}          
          
      }
    }
    `,
    ({
      account: {
        id,
        name,
        spending,
        revenue,
        total,
        categories,
        category,
        peers,
        payments,
        stories,
        countPayments,
        ledgerBarChart,
        ledgerPieChart,
      },
    }) => ({
      id,
      name,
      spending,
      revenue,
      total,
      categories: includeCategories ? categories : null,
      allPeers: peers,
      payments: categoryScoped ? category.payments : payments,
      totalCount: categoryScoped ? category.countPayments : countPayments,
      // barChart: includeBars
      //   ? (categoryScoped ? category.ledgerBarChart : ledgerBarChart).items.map(
      //       ({ date, revenue, spending }) => ({
      //         date,
      //         income: revenue,
      //         expenses: spending,
      //       })
      //     )
      //   : null,
      pieChart: includePie ? convertGraphqlPieData(ledgerPieChart.items) : null,
      stories,
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
      account(pid: $accountId) {
        countPayments(
          postedOnMin: $dateMin
          postedOnMax: $dateMax
          amountMin: $amountMin
          amountMax: $amountMax
          verified: $verified
          search: $search
        )
      }
    }
    `,
    R.path(['account', 'countPayments']),
  ],
}
