import { createPlainObjectSelector } from '@frankmoney/utils'
import { REDUCER_KEY } from './reducer'

const getter = (...path) => store => store.getIn([REDUCER_KEY, ...path])

const getters = {
  payment: getter('payment'),
  isLoaded: getter('isLoaded'),
  account: getter('account'),
}

export const isLoadedSelector = getters.isLoaded

export const paymentSelector = createPlainObjectSelector(getters.payment)

export const accountSelector = createPlainObjectSelector(getters.account)
