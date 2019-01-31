import * as R from 'ramda'
import { SORT_BY_DEFAULT } from './constants'

const recipientDetails = `
    id: pid
    name
    
    peerAggregate: aggregatePayments(
      verified: true
    ) {
      count
      postedOnMax
      totalSum
    }
    
    peerRevenueAggregate: aggregatePayments(
      verified: true
      categoryType: revenue
    ) {
      totalSum
    }
    
    peerSpendingAggregate: aggregatePayments(
      verified: true
      categoryType: spending
    ) {
      totalSum
    }
    
    categories {
      id: pid
      name
      color
      categoryAggregate: aggregatePayments(
        verified: true
      ) {
        count
        totalSum
      }
    }
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
        currency {
          code
        }
      
        categories {
          id: pid
          name
          color
        }
        
        peer(pid: $peerId) {
          ${includeRecipientInfo ? recipientDetails : ''}
          
          ${(includePayments &&
            `payments(
              verified: true
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
        currency,
        categories,
        peer: {
          id,
          name,
          peerAggregate: {
            count: peerCount,
            postedOnMax: peerPostedOnMax,
            totalSum: peerTotalSum,
          },
          peerRevenueAggregate: { totalSum: peerRevenueTotalSum },
          peerSpendingAggregate: { totalSum: peerSpendingTotalSum },
          categories: peerCategories,
          payments,
        },
      },
    }) => ({
      currencyCode: currency && currency.code,
      categories,
      recipient: includeRecipientInfo
        ? {
            id,
            name,
            lastPaymentDate: peerPostedOnMax,
            total: peerTotalSum || 0,
            revenue: peerRevenueTotalSum || 0,
            spending: peerSpendingTotalSum || 0,
            categories: peerCategories
              .filter(x => x.categoryAggregate.count > 0)
              .map(({ categoryAggregate, ...category }) => ({
                ...category,
                sum: categoryAggregate.totalSum,
              })),
          }
        : null,
      payments,
      paymentCount: includeRecipientInfo ? peerCount : null,
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
