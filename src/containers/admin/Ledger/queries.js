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

const FIELD_UPDATER = `
  name
  lastName
  firstName
`

const PAYMENTS = `
  id: pid
  postedOn
  amount
  peer {
    ${PEER}
  }
  peerUpdater {
    ${FIELD_UPDATER}
  }
  description
  descriptionUpdater {
    ${FIELD_UPDATER}
  }
  category {
    ${CATEGORY}
  }
  categoryUpdater {
    ${FIELD_UPDATER}
  }
  verified
  pending
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
  getSuggestions: ({
    peers: searchPeers,
    descriptions: searchDescriptions,
  }) => [
    `
    query(
      $accountId: ID!
      $search: String
    ) {
      account(pid: $accountId) {
        ${(searchPeers &&
          `
          peers(
            sortBy: name_ASC
            search: $search
            donors: true
            recipients: true
          ) {
            id: pid
            name
            count: countPayments
          }
          `) ||
          ''}
        ${(searchDescriptions &&
          `
          paymentsDescriptions(
            search: $search
          ) {
            id: pid
            text
            count: countPayments
          }
          `) ||
          ''}
      }
    }
    `,
    ({ account: { peers, descriptions } }) => ({
      peers,
      descriptions,
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
    ) {
      paymentUpdate(
        accountPid: $accountId
        paymentPid: $paymentId
        peerPid: $peerId
        peerName: $peerName
        categoryPid: $categoryId
        description: $description
      ) {
        peer {
          ${PEER}
        }
        peerUpdater{
          ${FIELD_UPDATER}
        }
        category {
          ${CATEGORY}
        }
        categoryUpdater{
          ${FIELD_UPDATER}
        }
        description
        descriptionUpdater {
          ${FIELD_UPDATER}
        }
      }
    }
    `,
    R.path(['account', 'countPayments']),
  ],
}
