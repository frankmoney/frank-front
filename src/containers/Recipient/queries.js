import * as R from 'ramda'
import { SORT_BY_DEFAULT } from './constants'

const mapCategory = ({ countPayments: { value }, ...category }) => ({
  ...category,
  value,
})

const recipientDetails = `
    id
    name
    categories {
      id
      name
      color
      countPayments {
        value
      }
    }
    countPayments {
      value
    }
    total {
      value
    }
    revenue {
      value
    }
    spending {
      value
    }
    lastPaymentOn {
      value
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
      account(id: $accountId) {
        peer(id: $peerId) {
          ${includeRecipientInfo ? recipientDetails : ''}
          
          ${(includePayments &&
            `payments(
              first: $first
              skip: $skip
              sortBy: ${
                sortBy === SORT_BY_DEFAULT ? 'postedOn_DESC' : 'amount_DESC'
              }
            ) {
              id
              postedOn
              amount
              description
              category {
                id
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
          total,
          revenue: { value: revenue },
          spending: { value: spending },
          lastPaymentOn,
        },
      },
    }) => ({
      recipient: includeRecipientInfo
        ? {
            id,
            name,
            categories: R.map(mapCategory, categories),
            total: total.value,
            revenue,
            spending: -spending,
            lastPaymentDate: lastPaymentOn.value,
          }
        : null,
      payments,
      paymentCount: includeRecipientInfo ? countPayments.value : null,
    }),
  ],
  editPeerName: [
    `
      mutation($peerId: ID!, $name: String!) {
        recipient: peerUpdate(peerId: $peerId, update: { name: $name }) {
          ${recipientDetails}
        }
      }
    `,
    ({
      recipient: { payments, categories, paymentCount, spendings, ...other },
    }) => ({
      recipient: {
        ...other,
        spendings: -spendings,
        categories: R.map(mapCategory, categories),
      },
      paymentCount,
    }),
  ],
}
