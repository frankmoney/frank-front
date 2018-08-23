import * as R from 'ramda'

const mapCategory = ({ category, count }) => ({ ...category, value: count })

export default {
  getRecipientAndPayments: ({
    recipient: includeRecipientInfo,
    payments: includePayments,
  }) => [
    `
    query($peerId: ID!${(includePayments && `, $first: Int!, $skip: Int`) ||
      ''}) {
      recipient: directoryPeer(peerId: $peerId) {
        ${(includeRecipientInfo &&
          `
          id
          name
          total
          revenue
          spendings
          categories(orderBy: count_DESC) {
            category {
              id
              name
              color
            }
            count
          }
          paymentCount
          lastPaymentDate
        `) ||
          ''}
        ${(includePayments &&
          `
          payments(first: $first, skip: $skip) {
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
}
