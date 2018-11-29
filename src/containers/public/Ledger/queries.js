import * as R from 'ramda'
import { convertGraphqlPieData } from 'data/models/pieData'
import { verifyPayment } from 'data/models/payment'

const PEER = `
  id: pid
  name
`

const CATEGORY = `
  id: pid
  name
  color
`

const PAYMENT = `
  id: pid
  postedOn
  amount
  peer {
    ${PEER}
  }
  description
  category {
    ${CATEGORY}
  }
  verified
`

export default {
  buildQuery: ({
    totalCount: includeTotal,
    payments: includePayments,
    pieChart: includePie,
    barChart: includeBars,
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
                 
        ${categoryScoped ? 'category(pid: $categoryId) {' : ''}
        
        ${(includePayments &&
          `payments(
            sortBy: postedOn_DESC
            take: $first
            skip: $skip
            search: $search
            postedOnMin: $dateMin
            postedOnMax: $dateMax
            amountMin: $amountMin
            amountMax: $amountMax
            verified: $verified
          ) {
            ${PAYMENT}
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
            barSize
            bars {
              endDate
              revenue
              showDate
              spending
              startDate
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
      payments: categoryScoped
        ? category.payments // R.map(verifyPayment, category.payments)
        : R.map(verifyPayment, payments) /* R.map(verifyPayment, payments) */,
      totalCount: categoryScoped ? category.countPayments : countPayments,
      barChart: includeBars
        ? (categoryScoped ? category.ledgerBarChart : ledgerBarChart).bars
        : null,
      barsUnit: includeBars
        ? (categoryScoped ? category.ledgerBarChart : ledgerBarChart).barSize
        : null,
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
