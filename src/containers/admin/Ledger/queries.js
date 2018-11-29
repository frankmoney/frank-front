import * as R from 'ramda'
import { convertGraphqlPieData } from 'data/models/pieData'

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
  published: verified
  pending
  peer {
    ${PEER}
  }
  description
  category {
    ${CATEGORY}
  }
`

const mapPayment = ({ peer, category, ...other }) => ({
  ...other,
  peerName: peer && peer.name,
  peerId: peer && peer.id,
  categoryId: category && category.id,
})

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
      account(pid: $accountId) {
        name
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
            postedOnMin: $dateMin
            postedOnMax: $dateMax
            amountMin: $amountMin
            amountMax: $amountMax
            verified: $verified
          ) {
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
      payments: (categoryScoped ? category.payments : payments).map(mapPayment),
      totalCount: categoryScoped ? category.countPayments : countPayments,
      barChart: includeBars
        ? (categoryScoped ? category.ledgerBarChart : ledgerBarChart).bars
        : null,
      barsUnit: includeBars
        ? (categoryScoped ? category.ledgerBarChart : ledgerBarChart).barSize
        : null,
      pieChart: includePie ? convertGraphqlPieData(ledgerPieChart.items) : null,
    }),
  ],
  paymentUpdate: [
    `
    mutation(
      $accountId: ID!
      $paymentId: ID!
      $peerId: ID
      $peerName: String
      $categoryId: ID
      $description: String
      $verified: Boolean
    ) {
      payment: paymentUpdate(
        accountPid: $accountId
        paymentPid: $paymentId
        peerPid: $peerId
        peerName: $peerName
        categoryPid: $categoryId
        description: $description
        verified: $verified
      ) {
        ${PAYMENTS}
      }
    }
    `,
    ({ payment }) => mapPayment(payment),
  ],
}
