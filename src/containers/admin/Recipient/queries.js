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
              description
              category {
                id: pid
                name
                color
              }
            }`) ||
            ''}
        }
      }
    }
    `,
    ({
      account: {
        peer: {
          id,
          name,
          categories,
          payments,
          countPayments,
          countTotal,
          countRevenue,
          countSpending,
          lastPaymentOn,
        },
      },
    }) => ({
      recipient: includeRecipientInfo
        ? {
            id,
            name,
            categories: R.map(mapCategory, categories),
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
