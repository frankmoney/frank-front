const paymentFields = `
  id: pid
  postedOn
  amount
  description
  peerName
  peer {
    id: pid
    name
  }
  category {
    id: pid
    name
    color
  }
  similarCount: countSimilar
`

export default {
  getPayment: [
    `
    query(
      $accountId: ID!
      $paymentId: ID!
    ) {
      account(pid: $accountId) {
        id: pid
        name
        currency {
          code
        }
        payment(pid: $paymentId) {
          ${paymentFields}
        }
      }
    }
    `,
    ({
      account: {
        id,
        name,
        currency: { code: currencyCode },
        payment,
      },
    }) => ({ account: { id, name, currencyCode }, payment }),
  ],
}
