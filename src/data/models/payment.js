// @flow strict
import * as R from 'ramda'
import { type Category } from 'data/models/category'

type Peer = {|
  id: number | string,
  name: string,
|}

export type PaymentId = number | string

export type PaymentSource = {|
  bankDescription?: string,
  bankLogo?: string,
  bankName?: string,
|}

export type Payment = {|
  amount: number,
  source: ?PaymentSource,
  category: ?Category,
  description: ?string,
  id: PaymentId,
  peer: ?Peer,
  postedOn: string,
  similarCount?: number,
  verified: ?boolean,
|}

export const mapPaymentSource = x =>
  R.evolve({ source: R.assoc('bankDescription', x.bankDescription) }, x)

export const ignoreUnverifiedData = R.when(
  R.propEq('verified', false),
  R.evolve({
    category: R.always(null),
    description: R.always(null),
    peer: R.always(null),
  })
)

const mapIndexed = R.addIndex(R.map)

const parseSimilarBasedOnDescription = R.curry(
  (markedId, payment, index, array) => {
    if (markedId === payment.id) {
      return {
        ...payment,
        type: 'marked',
      }
    }
    if (index - 1 >= 0) {
      const prevPayment = array[index - 1]
      if (payment.description !== prevPayment.description) {
        return {
          ...payment,
          type: 'last',
        }
      }
    }
    return payment
  }
)

export const mapSimilarBasedOnDescription = (
  markedId: PaymentId,
  similar: Payment
) => mapIndexed(parseSimilarBasedOnDescription(markedId), similar)
