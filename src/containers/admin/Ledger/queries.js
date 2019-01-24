import * as R from 'ramda'
import { mapPaymentSource } from 'data/models/payment'

const PEER = `
  id: pid
  name
`

const CATEGORY = `
  id: pid
  name
  color
`

const PAYMENTS = `
  id: pid
  postedOn
  amount
  verified
  pending
  peer {
    ${PEER}
  }
  description
  category {
    ${CATEGORY}
  }
  descriptionUpdater {
    isSystem
  }
  peerUpdater {
    isSystem
  }
  categoryUpdater {
    isSystem
  }
  similarCount: countSimilar(includeSelf: true)
  bankDescription
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
        name
        ${(includeCategories &&
          `categories {
            id: pid
            name
            color
            type
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
            ${PAYMENTS}
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
          )
          
          unfilteredCount: countPayments`) ||
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
        unfilteredCount,
      },
    }) => ({
      categories: includeCategories ? categories : null,
      payments: R.map(
        mapPaymentSource,
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
      unfilteredCount,
    }),
  ],
}
