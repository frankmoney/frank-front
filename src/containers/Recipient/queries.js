import * as R from 'ramda'

const mapCategory = ({ category, count }) => ({ ...category, value: count })

const recipientDetails = `
    id
    name
    total
    revenue
    spendings
    categories {
      category {
        id
        name
        color
      }
      count
    }
    paymentCount
    lastPaymentDate
  `

export default {
  getRecipientAndPayments: ({
    recipient: includeRecipientInfo,
    payments: includePayments,
  }) => [
    `
    query($peerId: ID!${(includePayments && `, $first: Int!, $skip: Int`) ||
      ''}) {
      recipient: directoryPeer(peerId: $peerId) {
        ${(includeRecipientInfo && recipientDetails) || ''}
        ${(includePayments &&
          `
            payments(orderBy: postedOn_DESC, first: $first, skip: $skip) {
              id
              postedOn
              amount
              peerName
              description
              category {
                id
                name
                color
              }
            }
          `) ||
          ''}
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
      payments,
      paymentCount,
    }),
  ],
  editPeerName: [
    `
      mutation($peerId: ID!, $name: String!) {
        recipient: updatePeer(peerId: $peerId, update: { name: $name }) {
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
