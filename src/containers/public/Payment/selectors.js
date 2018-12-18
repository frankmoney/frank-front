// @flow strict
import { createPlainObjectSelector } from '@frankmoney/utils'
import type { ReduxState } from 'flow/redux'
import { REDUCER_KEY } from './reducer'

const getter = (...path) => (state: ReduxState) =>
  state.getIn([REDUCER_KEY, ...path])

const getters = {
  payment: getter('payment'),
  similarCount: getter('payment', 'similarCount'),
  isLoaded: getter('isLoaded'),
  account: getter('account'),
  drawerOpen: getter('drawerOpen'),
  listLoading: getter('listLoading'),
  listMoreLoading: getter('listMoreLoading'),
  similarPayments: getter('similarPayments'),
  totalPagesCount: getter('totalPagesCount'),
  loadedPagesCount: getter('loadedPagesCount'),
}

export const isLoadedSelector = getters.isLoaded

export const paymentSelector = createPlainObjectSelector(getters.payment)
export const similarCountSelector = getters.similarCount

export const accountSelector = createPlainObjectSelector(getters.account)

// similar payments drawer selectors
export const drawerOpenedSelector = getter('drawerOpen')
export const listLoadingSelector = getters.listLoading
export const listMoreLoadingSelector = getters.listMoreLoading
export const similarPaymentsSelector = createPlainObjectSelector(
  getters.similarPayments
)

export const loadedPagesCounterSelector = getters.loadedPagesCount
export const totalPagesCounterSelector = getters.totalPagesCount
