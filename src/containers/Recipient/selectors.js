import * as R from 'ramda'
import { createSelector } from 'reselect'
import { createPlainObjectSelector } from '@frankmoney/utils'
import { REDUCER_KEY } from './reducer'

const getIn = prop => store => store.getIn([REDUCER_KEY, prop])
const getters = {
  payments: getIn('payments'),
}

export const searchTextSelector = getters.searchText
export const paymentsSelector = createPlainObjectSelector(
  getters.payments
)

export const paymentsIdsSelector = createSelector(
  paymentsSelector,
  R.map(R.prop('id'))
)

export const dataSourceSelector = createSelector(
  paymentsIdsSelector,
  ids => [{ title: 'April', rows: ids }]
)

export const rowDataSelector = id =>
  createSelector(
    paymentsSelector,
    R.find(x => x.id.toString() === id.toString())
  )
