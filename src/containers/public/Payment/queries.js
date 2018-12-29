import * as R from 'ramda'
import { mapPaymentSource } from 'data/models/payment'

const paymentFields = `
  id: pid
  postedOn
  amount
  description
  peer {
    id: pid
    name
  }
  category {
    id: pid
    name
    color
  }
  similarCount: countSimilar(includeSelf: true)
  bankDescription
  source {
    bankName
    bankLogo
  }
`

const similarPaymentFields = `
  id: pid
  postedOn
  amount
  description
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
  getSimilarPayments: [
    `
    query(
      $accountId: ID!
      $paymentId: ID!
      $first: Int
      $skip: Int
    ) {
      account(pid: $accountId) {
        accountId: pid,
        payment(pid: $paymentId) {
          payments: similar(take: $first, skip: $skip, sortBy: postedOn_DESC includeSelf: true) {
            ${similarPaymentFields}
          }
        }
      }
    }
    `,
    ({
      account: {
        accountId,
        payment: { payments },
      },
    }) =>
      R.map(
        R.pipe(
          R.assoc('accountId', accountId),
          mapPaymentSource
        ),
        payments
      ),
  ],
}
