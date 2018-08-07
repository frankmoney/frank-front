import * as R from 'ramda'
import { createSelector } from 'reselect'
import { createPlainObjectSelector } from '@frankmoney/utils'
import { REDUCER_KEY } from './reducer'

const getIn = prop => store => store.getIn([REDUCER_KEY, prop])
const getters = {
  transactions: getIn('transactions'),
}

export const searchTextSelector = getters.searchText
export const transactionsSelector = createPlainObjectSelector(
  getters.transactions
)

export const transactionsIdsSelector = createSelector(
  transactionsSelector,
  R.map(R.prop('id'))
)

export const dataSourceSelector = createSelector(
  transactionsIdsSelector,
  ids => [{ title: 'April', rows: ids }]
)

export const rowDataSelector = id =>
  createSelector(
    transactionsSelector,
    R.find(x => x.id.toString() === id.toString())
  )
