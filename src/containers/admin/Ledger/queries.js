import * as R from 'ramda'
import { convertGraphqlPieData } from 'data/models/pieData'

const peer = `
  id: pid
  name
`

const category = `
  id: pid
  name
  color
`

const fieldUpdater = `
  name
  lastName
  firstName
`

const payments = `
  id: pid
  postedOn
  amount
  peer {
    ${peer}
  }
  peerUpdater {
    ${fieldUpdater}
  }
  description
  descriptionUpdater {
    ${fieldUpdater}
  }
  category {
    ${category}
  }
  categoryUpdater {
    ${fieldUpdater}
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
                 
        ${categoryScoped ? 'category(id: $categoryId) {' : ''}
        
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
            ${payments}
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
          ${peer}
        }
        peerUpdater{
          ${fieldUpdater}
        }
        category {
          ${category}
        }
        categoryUpdater{
          ${fieldUpdater}
        }
        description
        descriptionUpdater {
          ${fieldUpdater}
        }
      }
    }
    `,
    R.path(['account', 'countPayments']),
  ],
}
