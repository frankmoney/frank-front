import { maxLength, required } from '@frankmoney/forms'
import * as R from 'ramda'

export const validation = {
  categoryId: [required],
  description: [required, maxLength(120)],
  peerName: [required, maxLength(60)],
}

export const validationWithoutRequired = R.pipe(
  R.toPairs,
  R.map(R.adjust(R.filter(x => x !== required), 1)),
  R.fromPairs
)(validation)

export const counters = {
  peerName: { unit: 'character', max: 60 },
  description: { unit: 'character', max: 120 },
}

export const getFormName = id => `payment-${id}`
