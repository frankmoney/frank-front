import * as R from 'ramda'
import { SORT_BY_DEFAULT } from './constants'

const mapCategory = ({ countPayments, ...category }) => ({
  ...category,
  value: countPayments,
})

const recipientDetails = `
    id: pid
    name
    categories {
      id: pid
      name
      color
      countPayments
    }
    countPayments
    countTotal
    countRevenue
    countSpending
    lastPaymentOn
  `

export default {
  getRecipientAndPayments: ({
    recipient: includeRecipientInfo,
    payments: includePayments,
    sortBy,
  }) => [
    `
    query(
      $accountId: ID!
      $peerId: ID!
      ${includePayments ? '$first: Int' : ''}
      ${includePayments ? '$skip: Int' : ''}
    ) {
      account(pid: $accountId) {
        categories {
          id: pid
          name
          color
        }
        
        peer(pid: $peerId) {
          ${includeRecipientInfo ? recipientDetails : ''}
          
          ${(includePayments &&
            `payments(
              take: $first
              skip: $skip
              sortBy: ${
                sortBy === SORT_BY_DEFAULT ? 'postedOn_DESC' : 'amount_DESC'
              }
            ) {
              id: pid
              postedOn
              amount
              verified
              pending
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
            }`) ||
            ''}
        }
      }
    }
    `,
    ({
      account: {
        categories,
        peer: {
          id,
          name,
          categories: peerCategories,
          payments,
          countPayments,
          countTotal,
          countRevenue,
          countSpending,
          lastPaymentOn,
        },
      },
    }) => ({
      categories,
      recipient: includeRecipientInfo
        ? {
            id,
            name,
            categories: R.map(mapCategory, peerCategories),
            total: countTotal,
            revenue: countRevenue,
            spending: -countSpending,
            lastPaymentDate: lastPaymentOn,
          }
        : null,
      payments,
      paymentCount: includeRecipientInfo ? countPayments : null,
    }),
  ],
  editPeerName: [
    `
      mutation($peerId: ID!, $name: String!) {
        recipient: peerUpdate(pid: $peerId, update: { name: $name }) {
          name
        }
      }
    `,
    R.identity,
  ],
}
