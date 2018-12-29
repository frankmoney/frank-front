// @flow strict
import * as R from 'ramda'
import { type Category } from 'data/models/category'

type Peer = {|
  id: number | string,
  name: string,
|}

export type PaymentId = number | string

export type Payment = {|
  amount: number,
  category: ?Category,
  description: ?string,
  id: PaymentId,
  peer: ?Peer,
  postedOn: string,
  similarCount?: number,
  verified: ?boolean,
|}

export const mapPayment = (payment: Payment) => ({
  createdAt: '2018-01-01 05:00',
  categoryAddedFromSimilar: true,
  ...payment,
})

export const verifyPayment = R.ifElse(
  R.propEq('verified', true),
  oldPayment => oldPayment,
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
