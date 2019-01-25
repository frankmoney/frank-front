import pluralize from 'utils/pluralize'

export const accountSuggestDescriptions = [
  `
    query(
      $accountId: ID!
      $search: String
    ) {
      account(pid: $accountId) {
        paymentsDescriptions(search: $search) {
          text: description
          count
        }
      }
    }
    `,
  ({ account: { paymentsDescriptions } }) =>
    paymentsDescriptions.map(({ text, count }) => ({
      text,
      data: text,
      secondaryText: pluralize('payment', count),
    })),
]

export const paymentSuggestDescriptions = [
  `
    query(
      $accountId: ID!
      $paymentId: ID!
      $search: String
    ) {
      account(pid: $accountId) {
        payment(pid: $paymentId) {
          suggestedDescriptions(search: $search) {
            text: description
            count
          }
        }
      }
    }
    `,
  ({
    account: {
      payment: { suggestedDescriptions },
    },
  }) =>
    suggestedDescriptions.map(({ text, count }) => ({
      text,
      data: text,
      secondaryText: pluralize('payment', count),
    })),
]
