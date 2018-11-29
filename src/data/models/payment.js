// @flow strict-local
import * as R from 'ramda'

export const isNegative: (?number) => boolean = value =>
  // $FlowFixMe: value is not undefined at the point of toString
  !R.isNil(value) && value.toString()[0] === '-'

export const mapPayment = ({ ...payment }) => ({
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

/*

*/

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

export const mapSimilarBasedOnDescription = (markedId, similar) =>
  mapIndexed(parseSimilarBasedOnDescription(markedId), similar)
