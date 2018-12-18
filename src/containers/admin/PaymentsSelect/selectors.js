// @flow strict
import * as R from 'ramda'
import { createSelector } from 'reselect'
import { createPlainObjectSelector } from '@frankmoney/utils'
import type { ReduxState } from 'flow/redux'
import { REDUCER_KEY } from './reducer'

const get = (...prop) => (state: ReduxState) =>
  state.getIn([REDUCER_KEY, ...prop])

export const filters = createPlainObjectSelector(get('filters'))
export const loaded = get('loaded')
export const loading = createSelector(get('loaded'), x => !x)
export const loadingMore = get('loadingMore')
export const paymentsUpdating = get('paymentsUpdating')
export const open = get('open')
export const payments = createPlainObjectSelector(get('payments'))
export const paymentsCount = createSelector(payments, R.length)
export const categories = createPlainObjectSelector(get('categories'))
export const filterLimits = createPlainObjectSelector(get('filterLimits'))

export const canLoadMore = createSelector(
  payments,
  get('totalCount'),
  (list, total) => list.length < total
)
