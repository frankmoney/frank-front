import * as R from 'ramda'
import { ignoreUnverifiedData, mapPaymentSource } from 'data/models/payment'

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
  bankDescription
  category {
    ${CATEGORY}
  }
  verified
  source {
    bankName
    bankLogo
  }
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
      $amountMax: Float
      $amountMin: Float
      $dateMax: Date
      $dateMin: Date
      $first: Int!
      $search: String
      $skip: Int
      $verified: Boolean
      ${categoryScoped ? '$categoryId: ID!,' : ''}
    ) {
      account(pid: $accountId) {
        id: pid
        name
        description
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
            amountMin: $amountMin
            amountMax: $amountMax
            verified: $verified
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
          `ledgerPieChart(
            amountMax: $amountMax
            amountMin: $amountMin
            postedOnMax: $dateMax
            postedOnMin: $dateMin
            verified: $verified
          ) {
            items {
              category {
                id: pid
                name
                color
              }
              spending
            }
            totalRevenue
            totalSpending
          }`) ||
          ''}

        ${(includeStories &&
          `stories (sortBy: publishedAt_DESC) {
            id: pid
            title
            body
            cover
            aggregatePayments {
              count
              postedOnMin
              postedOnMax
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
        countPayments,
        description,
        id,
        ledgerBarChart,
        ledgerPieChart,
        name,
        payments,
        revenue,
        spending,
        stories,
        total,
      },
    }) => ({
      categories: includeCategories ? categories : null,
      description,
      id,
      name,
      revenue,
      spending,
      total,
      payments: R.map(
        R.pipe(
          ignoreUnverifiedData,
          mapPaymentSource
        ),
        categoryScoped ? category.payments : payments
      ),
      totalCount: categoryScoped ? category.countPayments : countPayments,
      barChart: includeBars
        ? (categoryScoped ? category.ledgerBarChart : ledgerBarChart).bars
        : null,
      barsUnit: includeBars
        ? (categoryScoped ? category.ledgerBarChart : ledgerBarChart).barSize
        : null,
      pieChart: includePie ? ledgerPieChart : null,
      stories:
        stories &&
        stories.map(
          ({
            aggregatePayments: { count, postedOnMin, postedOnMax },
            ...story
          }) => ({
            ...story,
            paymentsCount: count,
            paymentsDateRange: postedOnMin ? [postedOnMin, postedOnMax] : null,
          })
        ),
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
